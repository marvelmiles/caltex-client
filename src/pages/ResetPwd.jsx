import React, { useCallback, useMemo } from "react";
import AuthLayout from "../components/AuthLayout";
import pwdRequirementEl from "./Signup";
import { useCtx } from "../context";
import Redirect from "../components/Redirect";
import useForm from "../hooks/useForm";
import http from "../api/http";
import Typography from "@mui/material/Typography";
import { StyledLink } from "../styled";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { VERIFIC_TOKEN_TIMER } from "../config/constants";

const ResetPwd = () => {
  const { setSnackBar } = useCtx();

  let _user = localStorage.getItem("user");
  _user = _user ? JSON.parse(_user) : undefined;

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
        placeholders: _user,
        rules: {
          password: {
            type: "password"
          }
        },
        required: {
          password: true,
          confirmPassword: true
        }
      }),
      [_user]
    )
  );

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async e => {
      const { withErr, formData } = handleSubmit(e);

      if (withErr) return;

      try {
        await http.post("/auth/reset-password", formData, {
          withCredentials: false
        });

        localStorage.removeItem(VERIFIC_TOKEN_TIMER);

        formData.hasReset = true;

        localStorage.setItem("user", JSON.stringify(formData));

        navigate("/auth/reset-password-success");
      } catch ({ message }) {
        setSnackBar(message);
        resetForm(true);
      }
    },
    [handleSubmit, resetForm, setSnackBar, navigate]
  );

  if (!_user)
    return (
      <Redirect
        to="/auth/token-verification/password"
        message="Access denied. Token is missing!"
      />
    );

  return (
    <AuthLayout
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      handleChange={handleChange}
      title="Reset Password"
      postInputsEl={
        <div style={{ marginTop: "-16px" }}>{pwdRequirementEl}</div>
      }
      postFormEl={
        <Stack sx={{ mt: 1 }}>
          <StyledLink to="/auth/login" sx={{ textAlign: "right" }}>
            Log into account!
          </StyledLink>
          <StyledLink to="/auth/recover-password" sx={{ textAlign: "right" }}>
            Recover password
          </StyledLink>
        </Stack>
      }
      btnTitle="Proceed"
      forms={[
        {
          label: "Enter new password",
          type: "password",
          name: "password"
        },
        {
          label: "Confirm Password",
          type: "password",
          name: "confirmPassword",
          hidePwdEye: true
        }
      ]}
    />
  );
};

export default ResetPwd;
