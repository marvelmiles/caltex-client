import React, { useCallback, useEffect, useRef } from "react";
import AuthLayout from "../components/AuthLayout";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { StyledLink } from "../styled";
import useForm from "../hooks/useForm";
import http from "../api/http";
import {
  signoutUser,
  signinUser,
  defaultUser,
} from "../context/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context";
import useAuth from "../hooks/useAuth";
import Typography from "@mui/material/Typography";
import {
  HTTP_CODE_ACCOUNT_VERIFICATION_ERROR,
  VERIFIC_TOKEN_TIMER,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  HTTP_MSG_API_DOWN,
} from "../config/constants.js";
import { setCookie } from "../utils";
import { isProdMode } from "../config/index.js";

const Login = (props) => {
  const { setSnackBar } = useCtx();

  const { currentUser, locState } = useAuth();

  const stateRef = useRef({
    logout: currentUser.isLogin,
  });

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm({
    placeholders: {
      rememberMe: true,
    },
    required: {
      email: true,
      password: true,
    },
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

  const storeTempUser = useCallback(() => {
    localStorage.setItem(VERIFIC_TOKEN_TIMER, "30");
    localStorage.setItem("user", JSON.stringify(formData));
  }, [formData]);

  const onSubmit = useCallback(
    async (e) => {
      const { formData, withErr } = handleSubmit(e);

      if (withErr) return;

      const setData = ({ data: { user, tokens } }) => {
        const bearerToken = `Bearer ${tokens.accessToken}`;

        http.defaults.headers.common["Authorization"] = bearerToken;

        setCookie(COOKIE_ACCESS_TOKEN, tokens.accessToken);
        setCookie(COOKIE_REFRESH_TOKEN, tokens.refreshToken);

        localStorage.removeItem(VERIFIC_TOKEN_TIMER, tokens.refreshToken);
        localStorage.removeItem("user");

        dispatch(signinUser(user));

        const params = new URLSearchParams(window.location.search);

        navigate(params.get("redirect") || "/u/dashboard", { state: locState });
      };

      try {
        if (formData.email === "caltex@default.com")
          throw {
            message: HTTP_MSG_API_DOWN,
          };

        setData(await http.post("/auth/signin", formData));
      } catch ({ message, code }) {
        if (isProdMode || message !== HTTP_MSG_API_DOWN)
          setSnackBar(
            code === HTTP_CODE_ACCOUNT_VERIFICATION_ERROR ? (
              <Typography>
                {message}{" "}
                <StyledLink
                  to="/auth/token-verification/account"
                  onClick={storeTempUser}
                >
                  Get a new code
                </StyledLink>{" "}
              </Typography>
            ) : (
              message
            )
          );
        else
          setData({
            data: { user: defaultUser, tokens: {} },
          });
      } finally {
        resetForm(true);
      }
    },
    [
      handleSubmit,
      resetForm,
      dispatch,
      navigate,
      setSnackBar,
      locState,
      storeTempUser,
    ]
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
              <StyledLink to="/auth/recover-password" onClick={storeTempUser}>
                Forgot password?
              </StyledLink>
            </Stack>
          ),
        },
      ]}
    />
  );
};

export default Login;
