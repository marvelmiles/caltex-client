import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useCtx } from "../../context";
import useAuth from "../../hooks/useAuth";
import http from "../../api/http";
import { StyledOverlay, StyledAntSwitch } from "../../styled";
import CustomInput from "../CustomInput";
import Stack from "@mui/material/Stack";

import masterCard from "../../images/mastercard.png";
import visA from "../../images/Group 23.png";
import caltexLogo from "../../images/logo (3).png";
import caltexTrader from "../../images/CALTEX TRADER (4).png";
import Button from "@mui/material/Button";
import useForm from "../../hooks/useForm";
import Typography from "@mui/material/Typography";
import Redirect from "../Redirect";
import Loading from "../Loading";

const StripeForm = props => {
  const {
    locState: { payment = {} },
    setSnackBar
  } = useCtx();

  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);

  let {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm({
    placeholders: {
      ...currentUser,
      saveCard: true,
      amount: payment.amount,
      currency: payment.currency
    }
  });

  isSubmitting = loading || isSubmitting;

  const stripe = useStripe();

  const elements = useElements();

  const types = useMemo(() => ["cardNumber", "cardExpiry", "cardCvc"], []);

  useEffect(() => {
    if (elements && types.every(type => !!elements.getElement(type)))
      setLoading(false);
  }, [elements, types]);

  const createErrMsg = (type, errors = {}, required) => {
    const msg = {
      cardNumber: "card number",
      cardExpiry: "card expiry date",
      cardCvc: "card security number"
    }[type];

    errors[type] = required ? `Your ${msg} is required` : `Invalid ${msg}`;

    return errors[type];
  };

  useEffect(() => {
    if (!loading) {
      const handleStripeElementChange = event => {
        if (event.empty) {
          resetForm(true, {
            errors: errors => {
              createErrMsg(event.elementType, errors, true);
              return {
                ...errors
              };
            }
          });
        } else if (event.error) {
          resetForm(true, {
            errors: errors => {
              createErrMsg(event.elementType, errors);
              return {
                ...errors
              };
            }
          });
        } else
          resetForm(true, {
            errors: errors => {
              delete errors[event.elementType];
              return { ...errors };
            }
          });
      };

      types.forEach(type => {
        const element = elements.getElement(type);
        element.on("change", handleStripeElementChange);
      });

      return () => {
        types.forEach(type => {
          const element = elements.getElement(type);
          if (element) element.off("change", handleStripeElementChange);
        });
      };
    }
  }, [loading, elements, types, resetForm]);

  const onSubmit = async e => {
    try {
      let { formData, errors, withErr, setIsSubmitting } = handleSubmit(e);

      if (withErr) return setSnackBar("Something went wrong!");

      let cardNumber;

      for (const type of types) {
        const elem = await elements.getElement(type);

        if (type === "cardNumber") cardNumber = elem;

        if (elem._empty) {
          withErr = true;
          createErrMsg(type, errors, true);
        } else if (elem._invalid) {
          withErr = true;
          createErrMsg(type, errors);
        } else delete errors[type];
      }

      resetForm(true, {
        errors: errs => (withErr ? { ...errs, ...errors } : { ...errors })
      });

      console.log("will create pay", !withErr);

      if (withErr) return;

      setIsSubmitting(true);
      setLoading(true);

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: {
          email: formData.email,
          name: `${formData.firstname} ${formData.lastname}`
        }
      });

      if (error) {
        resetForm(true);

        return setSnackBar(
          `Encountered an error while processing billing details!`
        );
      }

      console.log("created payment mwthod!");

      formData.paymentMethodId = paymentMethod.id;

      const res = await http.post(
        "/transactions/process-fiat-payment",
        formData
      );

      if (!res.success) throw res;

      setSnackBar({
        message: res.message,
        severity: "success"
      });
      resetForm();
    } catch (err) {
      console.log(err);
      setSnackBar(err.message);
      resetForm(true);
    } finally {
      setLoading(false);
    }
  };

  if (!payment.amount)
    return (
      <Redirect
        to="/Deposit/DepositPage"
        message="Access denied! Select a deposit method to proceed."
      />
    );

  const inputSpec =
    ".custom-input .custom-input-container .custom-input-wrapper";

  return (
    <>
      {loading ? (
        <StyledOverlay
          sx={{
            position: "fixed",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loading
            sx={{
              backgroundColor: "common.white",
              minHeight: 0,
              height: "auto",
              width: "0px",
              minWidth: "50px",
              p: 2,
              borderRadius: 1,
              boxShadow: 6
            }}
          />
        </StyledOverlay>
      ) : null}
      <Box>
        <Box
          sx={{
            backgroundColor: "secondary.main",
            p: 2
          }}
        >
          <Stack justifyContent="normal">
            <img src={caltexLogo} />
            <img src={caltexTrader} />
          </Stack>
        </Box>
        <Stack
          justifyContent="center"
          sx={{
            position: "relative",
            width: "100%",
            backgroundColor: "grey.main",
            py: {
              xs: 3,
              md: 8
            },
            form: {
              width: {
                xs: "95%",
                sm: "570px",
                md: "576px"
              },
              mx: "auto",
              [`${inputSpec} input, ${inputSpec} .StripeElement`]: {
                backgroundColor: "common.white"
              }
            }
          }}
        >
          <form onSubmit={onSubmit}>
            <Typography
              variant="h2"
              sx={{ textAlign: "center", fontWeight: "600", mb: 6 }}
            >
              {payment.amount}.00 {payment.currency}
            </Typography>
            <CustomInput
              loading={loading}
              error={errors.cardNumber}
              inputEl={
                <CardNumberElement
                  name="cardNumber"
                  id="cardNumber-input"
                  readOnly={isSubmitting}
                />
              }
              label="Card Number"
            />
            <Stack>
              <CustomInput
                loading={loading}
                error={errors.cardExpiry}
                inputEl={<CardExpiryElement readOnly={isSubmitting} />}
                label="Expiry Date"
              />

              <CustomInput
                loading={loading}
                error={errors.cardCvc}
                inputEl={<CardCvcElement readOnly={isSubmitting} />}
                label="CVV"
              />
            </Stack>

            <Stack>
              <CustomInput
                label="Firstname"
                name="firstname"
                error={errors.firstname}
                value={formData.firstname}
                handleChange={handleChange}
                readOnly
              />

              <CustomInput
                label="Lastname"
                name="lastname"
                error={errors.lastname}
                value={formData.lastname}
                handleChange={handleChange}
                readOnly
              />
            </Stack>

            <CustomInput
              label="Email address"
              type="email"
              name="email"
              error={errors.email}
              value={formData.email}
              handleChange={handleChange}
              readOnly
            />

            <Stack direction="row" justifyContent="normal">
              <StyledAntSwitch
                id="checked-stripe-form"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "secondary.main"
                  }
                }}
                checked={!!formData.saveCard}
                onChange={(_, bool) =>
                  resetForm({ ...formData, saveCard: bool }, { errors: null })
                }
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography
                htmlFor="checked-stripe-form"
                component="label"
                sx={{ cursor: "pointer" }}
              >
                Save details for subsequent deposit
              </Typography>
            </Stack>

            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "secondary.main",
                width: "100%",
                mt: 2,
                py: 2,
                fontWeight: "700",
                borderRadius: "5px",
                width: "100%",
                "&:hover": {
                  backgroundColor: "secondary.dark"
                }
              }}
            >
              Pay
            </Button>

            <Stack
              sx={{
                width: "100%",
                maxWidth: "120px",
                mx: "auto",
                mt: 3,
                "img:nth-of-type(2)": {
                  marginLeft: "-10px"
                }
              }}
            >
              <img src={masterCard} />
              <img src={visA} />
            </Stack>
          </form>
        </Stack>
      </Box>
    </>
  );
};

StripeForm.propTypes = {};

export default StripeForm;
