import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Routes, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCtx } from "../context";
import { createRelativeUrl } from "../api/http";

const Redirect = ({
  to = `/auth/login?redirect=${createRelativeUrl()}`,
  message = "You are not authroized to view the previous page!",
  ...rest
}) => {
  const { setSnackBar, locState } = useCtx();

  useEffect(() => {
    const taskId = setTimeout(() => {
      setSnackBar(message);
      clearTimeout(taskId);
    }, 500);
  }, [setSnackBar, message]);

  return <Navigate {...rest} state={locState} to={to} />;
};

Redirect.propTypes = {};

export default Redirect;
