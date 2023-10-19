import React from "react";
import AuthLayout from "../components/AuthLayout";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import useAuth from "../hooks/useAuth";

const AuthSuccess = ({ reason = "account", message = "" }) => {
  const isPwd = reason === "password";

  message = `Congratulations! Your ${
    isPwd ? "password has been reset" : "account has been created"
  } successfully.`;

  const {
    accVerified,
    locStateUser: { token }
  } = useAuth();

  const navigate = useNavigate();

  const authProps = (isPwd
  ? token
  : accVerified)
    ? {
        title: isPwd ? "Password Reset" : "Account Creation",
        btnTitle: "Login",
        onBtnClick: () => navigate("/auth/login"),
        preInputsEl: <Typography sx={{ my: 3 }}>{message}</Typography>
      }
    : {
        title: "Forbidden access!",
        preInputsEl: (
          <Typography sx={{ textAlign: "center" }}>
            You aren't authorize to view this page and will be redirected in{" "}
            <CountdownTimer
              delay={10}
              onTimeUp={() => navigate(`/auth/token-verification/${reason}`)}
            />
          </Typography>
        )
      };

  return <AuthLayout {...authProps} />;
};

export default AuthSuccess;
