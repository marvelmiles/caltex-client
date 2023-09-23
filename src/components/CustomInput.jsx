import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { StyledFormGroup } from "../styled";

const CustomInput = ({
  label,
  type = "text",
  endAdornment,
  startAdornment,
  sx,
  name,
  error,
  keepErrMounted = true,
  hidePwdEye,
  withBorderErr,
  inputEl,
  loading,
  readOnly,
  id = `${name || type}-input`,
  ...rest
}) => {
  loading = loading === true ? "loading" : "";

  readOnly = !!(loading || readOnly);

  const [showPwd, setShowPwd] = useState(false);

  const togglePwdVisibility = () => setShowPwd(!showPwd);

  endAdornment = {
    password: hidePwdEye ? (
      undefined
    ) : (
      <IconButton onClick={readOnly ? undefined : togglePwdVisibility}>
        {!readOnly && showPwd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </IconButton>
    )
  }[type];

  return (
    <StyledFormGroup
      type={type}
      error={error}
      withBorderErr={withBorderErr}
      noAdornment={!endAdornment && !startAdornment}
      className={`custom-input ${loading}`}
      sx={sx}
    >
      <label htmlFor={id}>{label}</label>
      <div className="custom-input-container">
        {startAdornment ? (
          <div className="adornment">{startAdornment}</div>
        ) : null}
        <Box className="custom-input-wrapper">
          {inputEl || (
            <input
              {...rest}
              id={id}
              type={readOnly || !showPwd ? type : "text"}
              name={name || type}
              readOnly={readOnly}
              validator={undefined}
              nullify={undefined}
              info={undefined}
              handleChange={undefined}
              key={1}
            />
          )}
          {loading ? (
            <input
              id={id + "-loading"}
              value={rest.value}
              type={type}
              placeholder={rest.placeholder}
              className="loading"
              readOnly
              key={2}
            />
          ) : null}
        </Box>
        {endAdornment ? <div className="adornment">{endAdornment}</div> : null}
      </div>

      {error || keepErrMounted ? (
        <Typography
          className="custom-input-error"
          color={
            error ? (error === "Medium" ? "success.main" : "error") : "red"
          }
          sx={{
            "&::first-letter": {
              textTransform: "uppercase"
            },
            opacity: error ? 1 : 0,
            m: 0
          }}
        >
          {{
            Medium: "Password strength is medium",
            Weak: "Password strength is weak"
          }[error] ||
            error ||
            "custom-error"}
        </Typography>
      ) : null}
    </StyledFormGroup>
  );
};

CustomInput.propTypes = {};

export default CustomInput;
