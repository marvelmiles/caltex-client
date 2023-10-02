import React, { useCallback } from "react";
import AuthLayout from "../components/AuthLayout";
import Typography from "@mui/material/Typography";
import { StyledLink } from "../styled";
import useForm from "../hooks/useForm";
import { useCtx } from "../context";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

const RecoverPwd = () => {
  const { setSnackBar } = useCtx();

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm({
    required: {
      email: true
    }
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async e => {
      const { withErr, formData } = handleSubmit(e);

      if (withErr) return;

      try {
        await http.post("/auth/recover-password", formData, {
          withCredentials: false
        });

        navigate("/auth/token-verification/password", {
          state: { user: formData }
        });
      } catch ({ message }) {
        setSnackBar(message);
        resetForm(true);
      }
    },
    [handleSubmit, resetForm, setSnackBar, navigate]
  );

  return (
    <AuthLayout
      title="Forget Password? Worry less, Reset Here!"
      btnTitle="Proceed"
      formData={formData}
      errors={errors}
      onSubmit={onSubmit}
      handleChange={handleChange}
      isSubmitting={isSubmitting}
      preInputsEl={<Typography>Enter Your registered email address</Typography>}
      forms={[
        {
          label: "Your email address",
          type: "email",
          sx: {
            mb: 0
          },
          info: (
            <StyledLink
              to="/auth/login"
              sx={{ mb: 3, mt: -1, display: "block", textAlign: "right" }}
            >
              Log into account!
            </StyledLink>
          )
        }
      ]}
    />
  );
};

export default RecoverPwd;
