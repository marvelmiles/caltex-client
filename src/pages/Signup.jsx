import React, { useCallback, useMemo, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useForm from "../hooks/useForm";
import { useCtx } from "../context";
import { StyledLink } from "../styled";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import http from "../api/http";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HTTP_CODE_MAIL_ERROR,
  VERIFIC_TOKEN_TIMER,
  HOME_ORIGIN
} from "../config/constants";
import { useSearchParams } from "react-router-dom";

const pwdRequirementEl = (
  <ul style={{ marginLeft: "-24px" }}>
    <li>Use a minimum of 8 characters</li>
    <li>Use both uppercase and lowercase letters</li>
    <li>Use a combination of numbers and alphabetical letters</li>
  </ul>
);

const Signup = props => {
  const [searchParams] = useSearchParams();

  const referralCode = searchParams.get("ref") || "";

  const agreeCheckErr = "You haven't agreed to the terms and conditions above!";

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm(
    useMemo(
      () => ({
        placeholders: { referralCode },
        rules: {
          password: {
            type: "password",
          },
        },
        required: {
          firstname: true,
          lastname: true,
          username: true,
          email: true,
          password: true,
          confirmPassword: "Confirm Password is required",
          agreed: agreeCheckErr,
        },
      }),
      [referralCode]
    )
  );

  const { setSnackBar } = useCtx();
  const navigate = useNavigate();
  const location = useLocation();

  // State to track the number of referred users
  const [referredUsersCount, setReferredUsersCount] = useState(0);

  const onSubmit = useCallback(
    async (e) => {
      const { formData, withErr } = handleSubmit(e);

      if (!formData.agreed) return setSnackBar(agreeCheckErr);

      if (withErr) return;

      try {
        delete formData.agreed;

        // referral code in the registration data
        formData.referralCode = referralCode;

        // API call to register the user with the referral code and ROI
        const { message } = await http.post("/auth/signup", formData);

        // Increment the referred user count on successful sign-up
        setReferredUsersCount(referredUsersCount + 1);
        localStorage.removeItem(VERIFIC_TOKEN_TIMER);

        setSnackBar({ message, severity: "success" });

        navigate("/auth/token-verification/account", {
          state: {
            user: formData,
          },
        });

        resetForm();
      } catch ({ message, code }) {
        resetForm({
          ...formData,
          confirmPassword: formData.password,
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
    [
      handleSubmit,
      navigate,
      resetForm,
      setSnackBar,
      referralCode,
      referredUsersCount,
    ]
  );

  return (
    <AuthLayout
      bgColor="transparent"
      isSubmitting={isSubmitting}
      btnTitle="Create account"
      errors={errors}
      formData={formData}
      handleChange={handleChange}
      postFormEl={
        <Stack sx={{ mt: 1 }}>
          <StyledLink to={HOME_ORIGIN}>
            @Caltex {new Date().getFullYear()}
          </StyledLink>
          <StyledLink
            state={{ user: formData }}
            to="/auth/token-verification/account"
          >
            Verify token
          </StyledLink>
        </Stack>
      }
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
                      errors: (errors) => {
                        if (bool) delete errors.agreed;
                        else errors.agreed = agreeCheckErr;
                        return { ...errors };
                      },
                    }
                  )
                }
                name="agreed"
              />
            }
            label={
              <Typography>
                I Declare that I agree with the{" "}
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
          name: "firstname",
        },
        {
          label: "Lastname",
          name: "lastname",
        },
        {
          label: "Username",
          name: "username",
        },
        {
          label: "Email",
          type: "email",
        },
        {
          label: "Password",
          type: "password",
          name: "password",
          info: pwdRequirementEl,
        },
        {
          label: "Confirm Password",
          type: "password",
          name: "confirmPassword",
          hidePwdEye: true,
        },
        {
          readOnly: true,
          label: "Referral Code (Optional)",
          value: referralCode,
          name: "referralCode",
          sx: { mb: 0 },
        },
      ]}
    />
  );
};

export default Signup;
