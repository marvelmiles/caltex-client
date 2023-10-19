import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import AuthLayout from "../components/AuthLayout";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { StyledLink } from "../styled";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import http from "../api/http";
import { useCtx } from "../context";
import useForm, { isNumber } from "../hooks/useForm";
import CountdownTimer from "../components/CountdownTimer";
import { signinUser } from "../context/reducers/userReducer";
import { useDispatch } from "react-redux";
import { VERIFIC_TOKEN_TIMER } from "../config/constants";

const TokenVerification = ({}) => {
  // temp fix;

  const [searchParams] = useSearchParams();

  let _user = localStorage.getItem("user");

  _user = _user ? JSON.parse(_user) : {};

  const [user] = useState({
    token: searchParams.get("token") || _user.token,
    email: searchParams.get("email") || _user.email
  });

  let { reason = "" } = useParams();

  reason = reason.toLowerCase();

  const isPwd = reason === "password";

  let { setSnackBar } = useCtx();

  const [timeUp, setTimeUp] = useState(false);

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
          token: "Verification token is required",
          email: isPwd && user.email ? false : true
          // password: !isPwd
        }
      }),
      [user, isPwd]
    )
  );

  console.log(user);

  const navigate = useNavigate();

  const onTimeUp = useCallback(() => {
    if (isPwd) resetForm({});

    localStorage.removeItem(VERIFIC_TOKEN_TIMER);

    setTimeUp(true);
  }, [isPwd, resetForm]);

  const dispatch = useDispatch();

  const resendToken = async () => {
    try {
      const { formData, withErr } = handleSubmit(undefined, {
        blacklist: ["token"]
      });

      if (withErr) return;

      const type = reason === "password" ? "reset" : "";

      const { message } = await http.post(
        `/auth/generate-new-token/${type ? `${reason}-${type}` : reason}`,
        formData
      );

      localStorage.removeItem(VERIFIC_TOKEN_TIMER);

      setTimeUp(false);

      resetForm(true);

      setSnackBar({
        message,
        severity: "success"
      });
    } catch (err) {
      resetForm(true);
      setSnackBar(err.message);
    }
  };

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();

      let { formData, withErr } = handleSubmit(e);

      formData = {
        ...user,
        ...formData
      };

      if (withErr) return;

      switch (reason) {
        case "account":
          try {
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

            localStorage.removeItem("user");

            navigate("/auth/account-success");
          } catch ({ message }) {
            setSnackBar(message);
          } finally {
            resetForm(true);
          }
          break;
        case "password":
          try {
            formData = {
              ...user,
              ...formData
            };

            navigate("/auth/reset-password", { state: { user: formData } });
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
    [reason, handleSubmit, navigate, setSnackBar, user, resetForm, dispatch]
  );

  const authProps = { account: true, password: true }[reason]
    ? {
        onSubmit,
        title: `${reason} Verification`,
        btnTitle: "Proceed",
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
              <Typography
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline"
                  }
                }}
                color="text.main"
                onClick={resendToken}
              >
                Resend code
              </Typography>
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
                }
              ]),
          // ...(user.password
          //   ? []
          //   : [
          //       {
          //         label: "Password",
          //         type: "password",
          //         name: "password",
          //         nullify: isPwd
          //       }
          //     ]),
          {
            label: "6-digit verification code",
            name: "token",
            type: "password",
            maxLength: "6",
            withBorderErr: true,
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
