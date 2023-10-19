import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CustomInput from "../components/CustomInput";
import Button from "@mui/material/Button";
 
const AuthLayout = ({
  title,
  forms = [],
  btnTitle,
  onSubmit,
  preInputsEl,
  postInputsEl,
  postFormEl,
  errors = {},
  formData = {},
  handleChange,
  isSubmitting,
  onBtnClick,
  form,
  bgColor = "grey.main",
  sx
}) => {
  return (
    <Box
      className="auth-container"
      sx={{
        backgroundColor: bgColor,
        width: "100%",
        minHeight: "100vh",
        ...sx
      }}
    >
      <Stack
        className="auth-stack"
        sx={{
          minHeight: "inherit",
          width: "inherit",
          justifyContent: "center",
          alignSelf: "flex-start",
          ".form-container": {
            backgroundColor: "background.paper",
            py: 4,
            px: {
              xs: 2,
              md: 4,
              lg: 8
            },
            borderRadius: "10px",
            mx: "auto",
            mt: 3
          },
          ".custom-input": {
            maxWidth: "717px",
            mx: "auto"
          }
        }}
      >
        <Box
          className="auth-paper-container"
          sx={{ maxWidth: "768px", width: "90%", my: 8 }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "32px",
              "&::first-letter": {
                textTransform: "uppercase"
              }
            }}
          >
            {title}
          </Typography>
          {
            <Box
              className="form-container"
              component={form ? "div" : "form"}
              onSubmit={form ? undefined : onSubmit}
            >
              {preInputsEl}
              {form ||
                forms.map((u, i) => {
                  if (u.nullify) return null;

                  const error = errors[u.name || u.type];

                  return (
                    <React.Fragment key={i}>
                      <CustomInput
                        key={i}
                        readOnly={isSubmitting}
                        onChange={e => handleChange(e, u.validator)}
                        error={error}
                        {...u}
                        value={formData[u.name || u.type] || u.value || ""}
                      />
                      {u.info}
                    </React.Fragment>
                  );
                })}
              {postInputsEl}
              {btnTitle ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ width: "100%", py: 2, borderRadius: "5px" }}
                  onClick={onBtnClick}
                >
                  {btnTitle}
                </Button>
              ) : null}
              {postFormEl}
            </Box>
          }
        </Box>
      </Stack>
    </Box>
  );
};

AuthLayout.propTypes = {};

export default AuthLayout;
