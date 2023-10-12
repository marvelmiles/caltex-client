import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCtx } from "../context";
import { createRelativeUrl } from "../api/http";
import Loading from "./Loading";

const Redirect = ({
  to = `/auth/login?redirect=${createRelativeUrl()}`,
  message = "You are not authroized to view the previous page!",
  options,
  ...rest
}) => {
  const { setSnackBar, locState } = useCtx();

  const isNumber = typeof to === "number";

  const navigate = useNavigate();

  const _options = useMemo(() => ({ replace: true, ...options }), [options]);

  useEffect(() => {
    if (isNumber) navigate(-1, _options);

    if (message) setSnackBar(message, true);
  }, [setSnackBar, message, isNumber, navigate, _options]);

  if (isNumber) return <Loading />;

  return <Navigate {...rest} state={locState} to={to} {..._options} />;
};

Redirect.propTypes = {};

export default Redirect;
