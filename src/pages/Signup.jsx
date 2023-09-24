import React, { useCallback, useMemo } from "react";
import AuthLayout from "../components/AuthLayout";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useForm from "../hooks/useForm";
import { useCtx } from "../context";
import { StyledLink } from "../styled";
import Typography from "@mui/material/Typography";
import http from "../api/http";
import { useNavigate } from "react-router-dom";
import { HTTP_CODE_MAIL_ERROR } from "../config/constants";

export const pwdRequirementEl = (
  <ul style={{ marginLeft: "-24px" }}>
    <li>Use minimum of 8 characters</li>
    <li>Use both uppercase and lowercase</li>
    <li>Use combination of Numbers and Alphabetical letters</li>
  </ul>
);

const Signup = props => {
  const agreeCheckErr = "You haven't agreed to the terms and conditions above!";

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
        rules: {
          password: {
            type: "password"
          }
        },
        required: {
          firstname: true,
          lastname: true,
          username: true,
          email: true,
          password: true,
          confirmPassword: "Confirm Password is required",
          agreed: agreeCheckErr
        }
      }),
      []
    )
  );

  const { setSnackBar } = useCtx();

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async e => {
      const { formData, withErr } = handleSubmit(e);

      if (!formData.agreed) {
        resetForm(true);
        return setSnackBar(agreeCheckErr);
      }

      if (withErr) return resetForm(true);

      try {
        delete formData.agreed;

        const { message } = await http.post("/auth/signup", formData);

        setSnackBar({ message, severity: "success" });

        navigate("/auth/token-verification/account", {
          state: {
            user: formData
          }
        });

        resetForm();
      } catch ({ message, code }) {
        resetForm({
          ...formData,
          confirmPassword: formData.password
        });
        setSnackBar(
          code === HTTP_CODE_MAIL_ERROR ? (
            <Typography>
              {message}{" "}
              <StyledLink
                to="/auth/token-verification/account"
                state={{ user: formData }}
              >
                Get a new code
              </StyledLink>
            </Typography>
          ) : (
            message
          )
        );
      }
    },
    [handleSubmit, navigate, resetForm, setSnackBar]
  );

  return (
    <AuthLayout
      bgColor="transparent"
      isSubmitting={isSubmitting}
      btnTitle="Create account"
      errors={errors}
      formData={formData}
      handleChange={handleChange}
      postInputsEl={
        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            sx={{ maxWidth: "400px" }}
            control={
              <Checkbox
                disabled={isSubmitting}
                checked={!!formData.agreed}
                onChange={(_, bool) =>
                  resetForm(
                    { ...formData, agreed: bool },
                    {
                      errors: errors => {
                        if (bool) delete errors.agreed;
                        else errors.agreed = agreeCheckErr;

                        return { ...errors };
                      }
                    }
                  )
                }
                name="agreed"
              />
            }
            label={
              <Typography>
                I Declare that i agree with the{" "}
                <StyledLink>terms and conditions</StyledLink> of operation of
                Caltex Investment
              </Typography>
            }
          />
        </FormGroup>
      }
      onSubmit={onSubmit}
      forms={[
        {
          label: "Firstname",
          name: "firstname"
        },
        {
          label: "Lastname",
          name: "lastname"
        },
        {
          label: "Username",
          name: "username"
        },
        {
          label: "Email",
          type: "email"
        },
        {
          label: "Password",
          type: "password",
          name: "password",
          info: pwdRequirementEl
        },
        {
          label: "Confirm Password",
          type: "password",
          name: "confirmPassword",
          hidePwdEye: true
        },
        {
          label: "Referral Code (Optional)",
          name: "referralCode",
          sx: { mb: 0 }
        }
      ]}
    />
  );
};

export default Signup;
