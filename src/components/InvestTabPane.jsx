import React from "react";
import PropTypes from "prop-types";
import { useSearchParams, Link } from "react-router-dom";

const InvestTabPane = ({ onClick, replace }) => {
  const [searchParams] = useSearchParams();

  const type = (
    searchParams.get("tradeType") ||
    (window.location.pathname.toLowerCase().endsWith("f") ? "forex" : "crypto")
  ).toLowerCase();

  const isForex = type === "forex";

  return (
    <div class="invest-wt-caltexF">
      <p class="cal-text">Invest with Caltex</p>
      <div class="forex-or-crypto">
        <div class="forex-or-crypto-inne">
          <Link
            to="/Invest/InvestPage?tradeType=forex"
            className={`forex ${isForex ? "active" : ""}`}
            id="forex"
            replace={!!replace}
            onClick={onClick}
          >
            Forex
          </Link>
          <Link
            to="/Invest/InvestPage?tradeType=crypto"
            className={`crypto ${isForex ? "" : "active"}`}
            id="crypto"
            replace={!!replace}
            onClick={onClick}
          >
            Crypto
          </Link>
        </div>
      </div>
    </div>
  );
};

InvestTabPane.propTypes = {};

export default InvestTabPane;
