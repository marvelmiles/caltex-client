import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BsFileEarmark } from "react-icons/bs";
import useForm, { isObject } from "../hooks/useForm";
import { useCtx } from "../context";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

const UploadProof = ({
  id = "payment-proof",
  name = id,
  formData: placeholders,
  message
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    resetForm
  } = useForm({
    required: {
      [name]: "Payment proof is required"
    }
  });

  const { setSnackBar } = useCtx();

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async e => {
      try {
        const { withErr, formData } = handleSubmit(e, {
          formData: new FormData()
        });

        if (withErr) return;

        if (placeholders)
          for (const key in placeholders) {
            const v = placeholders[key];
            if (isObject(v)) {
              for (const _key in v) {
                formData.set(`${key}[${_key}]`, v[_key]);
              }
            } else if (Array.isArray(v)) {
              for (const _key of v) {
                formData.append(key, _key);
              }
            } else formData.set(key, v);
          }

        const res = await http.post(
          "/transactions/record-crypto-payment",
          formData
        );

        if (!res.success) throw res;

        resetForm();
        navigate("/CongratulatoryMessage/Congratulations", {
          state: { invested: true }
        });
      } catch (err) {
        console.log(err);
        setSnackBar(err.message);
        resetForm(true);
      }
    },
    [handleSubmit, setSnackBar, resetForm, placeholders, navigate]
  );

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={onSubmit}>
      <Typography variant="h4" sx={{ mt: 3 }}>
        Upload Proof of Payment
      </Typography>

      <Stack
        component="label"
        justifyContent="normal"
        htmlFor={id}
        gap={4}
        sx={{
          border: "1px solid currentColor",
          borderColor: errors[name] ? "error.main" : "action.border",
          padding: "12px",
          borderRadius: "5px",
          my: 2,
          width: "100%",
          cursor: isSubmitting ? "not-allowed" : "pointer"
        }}
      >
        <BsFileEarmark
          style={{
            fontSize: "20px",
            cursor: isSubmitting ? "not-allowed" : "pointer"
          }}
        />

        <Typography
          variant="h5"
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            maxWidth: "calc(100% - 50px)"
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>Choose File</span>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "100%"
            }}
          >
            {formData[name] ? formData[name].name : "No file choosen"}
          </Typography>
        </Typography>

        <input
          disabled={isSubmitting}
          component="input"
          type="file"
          id={id}
          name={name}
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          multiple={false}
          style={{
            display: "none"
          }}
          onChange={handleChange}
        />
      </Stack>

      <Button
        variant="contained"
        disabled={isSubmitting}
        type="submit"
        sx={{ p: 2, width: "150px" }}
      >
        Upload
      </Button>

      <Typography sx={{ mt: 1, color: "error.main", maxWidth: "400px" }}>
        {message}
      </Typography>
    </Box>
  );
};

UploadProof.propTypes = {};

export default UploadProof;
