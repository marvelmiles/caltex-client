import React from "react";
import AuthLayout from "../components/AuthLayout";
import { Typography } from "@mui/material";

const ResetPwdSuccess = () => {
  return (
    <AuthLayout
      title="Reset Password"
      btnTitle="Login"
      preInputsEl={
        <Typography sx={{ my: 3 }}>
          Your Password has been change successfully. Login Now!
        </Typography>
      }
    />
  );
};

export default ResetPwdSuccess;
