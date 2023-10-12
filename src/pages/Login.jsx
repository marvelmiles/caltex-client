import React, { useCallback, useEffect, useState, useRef } from "react";
import AuthLayout from "../components/AuthLayout";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { StyledLink } from "../styled";
import useForm from "../hooks/useForm";
import http from "../api/http";
import { signoutUser, signinUser } from "../context/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context";
import useAuth from "../hooks/useAuth";
import Typography from "@mui/material/Typography";
import { HTTP_CODE_ACCOUNT_VERIFICATION_ERROR } from "../config/constants.js";

const Login = props => {
  const { setSnackBar } = useCtx();

  const { currentUser, locState } = useAuth();

  const stateRef = useRef({
    logout: currentUser.isLogin
  });

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm({
    placeholders: {
      rememberMe: true
    },
    required: {
      email: true,
      password: true
    }
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const stateCtx = stateRef.current;

    if (stateCtx.logout) {
      stateCtx.logout = false;
      dispatch(signoutUser());
      setSnackBar("You have been logged out!", true);
    }
  }, [dispatch, setSnackBar]);

  const onSubmit = useCallback(
    async e => {
      const { formData, errors, withErr } = handleSubmit(e);

      if (withErr) return;

      try {
        const { data } = await http.post("/auth/signin", formData, {
          withCredentials: true
        });

        dispatch(signinUser(data));

        console.log("logged in...", !!navigate);

        const params = new URLSearchParams(window.location.search);

        navigate(params.get("redirect") || "/u/dashboard", { state: locState });
      } catch ({ message, code }) {
        setSnackBar(
          code === HTTP_CODE_ACCOUNT_VERIFICATION_ERROR ? (
            <Typography>
              {message}{" "}
              <StyledLink
                to="/auth/token-verification/account"
                state={{
                  user: {
                    ...locState.user,
                    ...formData,
                    resend: true
                  }
                }}
              >
                Get a new code
              </StyledLink>{" "}
            </Typography>
          ) : (
            message
          )
        );
      } finally {
        resetForm(true);
      }
    },
    [handleSubmit, resetForm, dispatch, navigate, setSnackBar, locState]
  );

  return (
    <AuthLayout
      bgColor="transparent"
      btnTitle="Login"
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      forms={[
        { label: "Your email address", type: "email", name: "email" },
        {
          label: "Password",
          type: "password",
          sx: { mb: 0 },
          name: "password",
          info: (
            <Stack sx={{ mb: 3, mt: -1 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isSubmitting}
                      checked={formData.rememberMe}
                      onChange={(_, bool) =>
                        resetForm({ ...formData, rememberMe: bool })
                      }
                    />
                  }
                  label="Remember Me"
                />
              </FormGroup>
              <StyledLink
                to="/auth/recover-password"
                state={{ user: { email: formData.email } }}
              >
                Forgot password?
              </StyledLink>
            </Stack>
          )
        }
      ]}
    />
  );
};

export default Login;
