import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useCtx } from "../context";
import Loading from "./Loading";
import { HOME_ORIGIN } from "../config/constants";

const Redirect = ({
  to = HOME_ORIGIN,
  message = "You are not authroized to view the previous page!",
  options,
  ...rest
}) => {
  // using home_origin validaiton check for caution when routing
  // btw react and third party site(home page)...

  const { setSnackBar, locState } = useCtx();

  const isNumber = typeof to === "number";

  const navigate = useNavigate();

  const _options = useMemo(() => ({ replace: !isHome, ...options }), [
    options,
    isHome
  ]);

  const isHome = to === HOME_ORIGIN;

  useEffect(() => {
    if (isNumber && to) navigate(to, _options);

    if (!isHome && message) setSnackBar(message, true);

    const taskId = setTimeout(() => {
      navigate("/auth/login", { replace: true });
      clearTimeout(taskId);
    }, 7000);
  }, [setSnackBar, message, isNumber, navigate, _options, to, isHome]);

  if (isNumber || isHome) return <Loading fullSize />;

  return <Navigate {...rest} state={locState} to={to} {..._options} />;
};

Redirect.propTypes = {};

export default Redirect;
