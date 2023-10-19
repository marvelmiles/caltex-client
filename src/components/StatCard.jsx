import React from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";

const StatCard = ({ value, label, prefix = "$" }) => {
  return (
    <Stack
      flexDirection="column"
      sx={{
        border: "2px solid currentColor",
        borderColor: "divider",
        p: 2,
        pb: 3,
        borderRadius: "5px",
        minHeight: "80px",
        cursor: "default",
        maxWidth: "220px"
      }}
    >
      <Typography variant="h2" sx={{ my: 1 }}>
        {prefix}
        {value}
      </Typography>

      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {label}
      </Typography>
    </Stack>
  );
};

StatCard.propTypes = {};

export default StatCard;
