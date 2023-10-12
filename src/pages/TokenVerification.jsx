import React, { useCallback, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthLayout from "../components/AuthLayout";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { StyledLink, styledLinkProp } from "../styled";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http";
import { useCtx } from "../context";
import useForm, { isNumber } from "../hooks/useForm";
import CountdownTimer from "../components/CountdownTimer";
import { signinUser, signoutUser } from "../context/reducers/userReducer";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { VERIFIC_TOKEN_TIMER } from "../config/constants";

const TokenVerification = ({}) => {
  let { reason = "" } = useParams();

  reason = reason.toLowerCase();

  const isPwd = reason === "password";

  let {
    setSnackBar,
    locState: {
      user = {
        hidePwd: isPwd
      }
    }
  } = useCtx();

  const { accVerified, currentUser } = useAuth();

  const [timeUp, setTimeUp] = useState(!!user.resend);

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm(
    useMemo(
      () => ({
        placeholders: user,
        required: {
          token: !timeUp,
          email: isPwd && user.email ? false : true,
          password: !isPwd
        }
      }),
      [user, timeUp, isPwd]
    )
  );

  const navigate = useNavigate();

  const onTimeUp = useCallback(() => {
    if (isPwd) resetForm({});

    localStorage.removeItem(VERIFIC_TOKEN_TIMER);

    setTimeUp(true);
  }, [isPwd, resetForm]);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();

      let { formData, withErr } = handleSubmit(e);

      formData = {
        ...user,
        ...formData
      };

      if (withErr) return;

      const resendToken = async (
        type = "verification",
        withCredentials = false
      ) => {
        const { message } = await http.post(
          `/auth/generate-new-token/${reason}-${type}`,
          formData,
          {
            withCredentials
          }
        );

        setTimeUp(false);

        setSnackBar({
          message,
          severity: "success"
        });
      };

      switch (reason) {
        case "account":
          try {
            if (timeUp) await resendToken();
            else {
              await http.post(
                "/auth/verify-token/account",
                {
                  email: formData.email || user.email,
                  password: formData.password || user.password,
                  token: formData.token
                },
                { withCredentials: false }
              );

              dispatch(signinUser({ accountExpires: null }));

              navigate("/auth/account-success");
            }
          } catch ({ message }) {
            setSnackBar(message);
          } finally {
            resetForm(true);
          }
          break;
        case "password":
          try {
            if (timeUp) await resendToken("reset", true);
            else {
              formData = {
                ...user,
                ...formData
              };

              navigate("/auth/reset-password", { state: { user: formData } });
            }
          } catch ({ message }) {
            setSnackBar(message);
          } finally {
            resetForm(true);
          }

          break;
        default:
          break;
      }
    },
    [
      reason,
      handleSubmit,
      navigate,
      setSnackBar,
      user,
      resetForm,
      timeUp,
      dispatch
    ]
  );

  const authProps = { account: true, password: true }[reason]
    ? {
        onSubmit,
        title: `${reason} Verification`,
        btnTitle: timeUp ? "Resend code" : "Proceed",
        preInputsEl: (
          <Typography>
            {user.email
              ? "Enter the confirmation code sent to your registered email address"
              : "We couldn't identify your account. To proceed, all fields are required."}
          </Typography>
        ),
        postFormEl: (
          <Stack sx={{ mt: 2 }}>
            {timeUp ? (
              <Typography sx={{ opacity: 0 }}>Time up</Typography>
            ) : (
              <Typography>
                Get a new code in <CountdownTimer onTimeUp={onTimeUp} />{" "}
              </Typography>
            )}
            <StyledLink to="/auth/login">Log into account!</StyledLink>
          </Stack>
        ),
        forms: [
          ...(user.email
            ? []
            : [
                {
                  label: "Email",
                  type: "email",
                  name: "email"
                },
                {
                  label: "Password",
                  type: "password",
                  name: "password",
                  nullify: isPwd
                }
              ]),
          {
            readOnly: timeUp,
            label: "6-digit verification code",
            name: "token",
            type: "password",
            maxLength: "6",
            withBorderErr: true,
            value: isPwd && timeUp ? "123456" : undefined,
            validator: ({ value }) =>
              isNumber(value) ? false : "Invalid token. Whole numbers only!"
          }
        ]
      }
    : {
        title: "Verification page not found",
        preInputsEl: (
          <Typography sx={{ mb: 2 }}>Verification page not found!</Typography>
        ),
        btnTitle: { account: "Create account" }[reason],
        onBtnClick: () => navigate("/auth/signup")
      };

  return (
    <AuthLayout
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      isSubmitting={isSubmitting}
      {...authProps}
    />
  );
};

TokenVerification.propTypes = {};

export default TokenVerification;
