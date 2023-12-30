import React, { useCallback } from "react";
import AuthLayout from "../components/AuthLayout";
import Typography from "@mui/material/Typography";
import { StyledLink } from "../styled";
import useForm from "../hooks/useForm";
import { useCtx } from "../context";
import http from "../api/http"; 
import { VERIFIC_TOKEN_TIMER } from "../config/constants";

const RecoverPwd = () => {
  const { setSnackBar } = useCtx();

  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : {};

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm({
    placeholders: user,
    required: {
      email: true
    }
  });
 
  const onSubmit = useCallback(
    async e => {
      const { withErr, formData } = handleSubmit(e);

      if (withErr) return;

      try {
        await http.post("/auth/recover-password", formData, {
          withCredentials: false
        });

        localStorage.removeItem(VERIFIC_TOKEN_TIMER);

        localStorage.setItem("user", JSON.stringify(formData));
        setSnackBar({message:"A mail with further instructions has been sent to your email.",severity:"success"})

      } catch ({ message }) {
        setSnackBar(message);
      } finally {
        resetForm(true)
      }
    },
    [handleSubmit, resetForm, setSnackBar]
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
