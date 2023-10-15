import React, { useEffect } from "react";
import "./index.css";
import { Box } from "@mui/material";
import Layout from "../Layout";

import cryptovec from "../../images/cryptovector.png";

const PaymentSelectLayout = ({ title, subTitle, children }) => {
  useEffect(() => {
    const node = document.getElementById("cryptoDeposit");
    if (node) node.style.display = "block";
  }, []);

  return (
    <Layout title="Width">
      <div className="deposit-funds-container">
        <Box
          className="deposit-funds"
          sx={{
            borderRadius: 0,
            marginLeft: "-2px",
            borderRight: "none",
            borderLeft: "none",
            border: "1px solid currentColor",
            borderColor: "divider"
          }}
        >
          <div className="deposit-fund-text">
            <h3>{title}</h3>
          </div>
          <div className="deposit-content-container">
            <Box
              className="deposit-container"
              sx={{
                border: "1px solid currentColor",
                borderColor: "divider",
                borderRadius: "5px"
              }}
            >
              <div className="cryptoprefix">
                <span>
                  <h3>{subTitle}</h3>
                </span>
                <span className="cp2">
                  <h4>
                    <img src={cryptovec} /> Crypto
                  </h4>
                </span>
              </div>
              {children}
            </Box>
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default PaymentSelectLayout;
