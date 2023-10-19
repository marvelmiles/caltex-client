import React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ sx, className, fullSize, ...rest }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        color: "primary.main",
        width: "100%",
        minWidth: "100%",
        height: "inherit",
        minHeight: fullSize ? "100vh" : "inherit",
        ...sx
      }}
      className={`custom-loading ${className}`}
    >
      <CircularProgress
        value={60}
        thickness={4}
        size={20}
        {...rest}
        sx={{ color: "primary.main" }}
      />
    </Stack>
  );
};

Loading.propTypes = {};

export default Loading;
