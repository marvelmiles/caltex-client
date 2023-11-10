import React, { useCallback, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthLayout from "../components/AuthLayout";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { StyledLink } from "../styled";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http";
import { useCtx } from "../context";
import useForm, { isNumber } from "../hooks/useForm";
import CountdownTimer from "../components/CountdownTimer";
import { VERIFIC_TOKEN_TIMER } from "../config/constants";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../context/reducers/userReducer";

const TokenVerification = ({}) => {
  const [requestingToken, setRequestingToken] = useState(false);

  const { _sentTokenVerification, isLogin } = useSelector(
    state => state.user.currentUser
  );

  let { userId = "", reason = "" } = useParams();

  reason = reason.toLowerCase();

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
        placeholders: {
          userId
        },
        required: {
          token: "Verification token is required"
        }
      }),
      [userId]
    )
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const resendToken = useCallback(
    async cb => {
      try {
        const { formData, withErr } = handleSubmit(undefined, {
          blacklist: ["token"]
        });

        if (withErr) return;

        setRequestingToken(true);

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
        setSnackBar(
          cb ? "Something went wrong while requesting token!" : err.message
        );
      } finally {
        setRequestingToken(false);
        typeof cb === "function" && cb();
      }
    },
    [handleSubmit, reason, resetForm, setSnackBar]
  );

  useEffect(() => {
    if (!_sentTokenVerification && isLogin) {
      (async () => {
        resendToken(() => {
          dispatch(
            updateUser({
              _sentTokenVerification: true
            })
          );
        });
      })();
    }
  }, [_sentTokenVerification, dispatch, resendToken, isLogin]);

  const onTimeUp = useCallback(() => {
    localStorage.removeItem(VERIFIC_TOKEN_TIMER);

    setTimeUp(true);
  }, []);

  const onSubmit = useCallback(
    async e => {
      try {
        const { withErr, formData } = handleSubmit(e);

        if (withErr) return;

        switch (reason) {
          case "password":
            navigate("/auth/reset-password", {
              state: { tokenBody: formData }
            });
            break;
          default:
            await http.post(`/auth/verify-token/${reason}`, formData);

            if (isLogin)
              dispatch(
                updateUser({
                  accountExpires: null
                })
              );

            navigate("/auth/account-success");
            break;
        }
      } catch (err) {
        setSnackBar(err.message);
      } finally {
        resetForm(true);
      }
    },
    [handleSubmit, navigate, reason, setSnackBar, resetForm, dispatch, isLogin]
  );

  const authProps = { account: true, password: true }[reason]
    ? {
        onSubmit,
        title: `${reason} Verification`,
        btnTitle: "Proceed",
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
                onClick={requestingToken ? undefined : resendToken}
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
          {
            label: requestingToken
              ? "Please wait requesting token..."
              : "6-digit verification code",
            name: "token",
            type: "password",
            maxLength: "6",
            readOnly: requestingToken,
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
      isSubmitting={isSubmitting || requestingToken}
      {...authProps}
    />
  );
};

TokenVerification.propTypes = {};

export default TokenVerification;
