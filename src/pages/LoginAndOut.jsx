import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useCtx } from "../context";

const LoginAndOut = ({ children }) => {
  const { locState } = useCtx();

  const navigate = useNavigate();

  const handleTabChange = (_, value) => {
    navigate(`/auth/${value}`, { state: locState });
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  const tab = (window.location.pathname.split("/")[2] || "").toLowerCase();

  return (
    <AuthLayout
      sx={{
        ".auth-container": {
          minHeight: 0,
          ".auth-stack": {
            minHeight: "0"
          },
          ".auth-paper-container": {
            mt: 3
          },
          ".form-container": {
            p: 0,
            m: 0
          }
        }
      }}
      form={children}
      onSubmit={onSubmit}
      title="Welcome to Caltex"
      preInputsEl={
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              flex: 1,
              borderBottom: "2px solid currentColor",
              borderBottomColor: "divider"
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "action.border"
            },
            "& .MuiButtonBase-root.Mui-selected": {
              color: "action.border"
            }
          }}
        >
          <Tab value={"login"} label={"Login"} wrapped />
          <Tab value={"signup"} label={"Create Account"} wrapped />
        </Tabs>
      }
    />
  );
};

LoginAndOut.propTypes = {};

export default LoginAndOut;
