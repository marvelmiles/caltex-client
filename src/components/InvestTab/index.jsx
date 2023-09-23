import http from "../../api/http";
import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import caltexTrader from "../../images/caltexTrader.png";
import logo from "../../images/logo (1).png";
import john from "../../images/John.jpg";
import forex from "../../images/forex.png";
import crypto from "../../images/crypto.png";
import withdraw from "../../images/withdraw.png";
import help from "../../images/help.png";
import profile from "../../images/profile.png";
import deposit from "../../images/deposit.png";
import legal from "../../images/legal.png";
import logout from "../../images/logout.png";

import backarrow from "../../images/backArrow.png";

import { BiSolidDashboard } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import InvestForm from "../InvestForm";
import IconButton from "@mui/material/IconButton";
import { useCtx } from "../../context";

const InvestTab = ({ investFormProps = {} }) => {
  investFormProps = {
    plan: "starter",
    tradeType: "forex",
    maxAmount: 10000,
    minAmount: 100,
    roiPct: 2.5,
    duration: 7,
    ...investFormProps
  };

  const { handleGoBack } = useCtx();

  const { currentUser } = useAuth();

  const isForex = investFormProps.tradeType === "forex";

  return (
    <div class="dashboard-container">
      <div class="board">
        <div class="dashboard-panel">
          <div class="panels">
            <div class="logo">
              <span>
                <img src={logo} alt="logo" />
              </span>
              <span>
                <img src={caltexTrader} alt="caltek-logo" />
              </span>
            </div>
            <div class="panel-control">
              <Link to="/" class="controld" id="dashboard" onclick=" ">
                <BiSolidDashboard id="other-icon" className="dashboard-icon" />
                Dashboard
              </Link>
              <span class="control" id=" " onclick=" ">
                <img src={profile} id="other-icon" alt="profile-icon" />
                Profile
              </span>
              <Link
                to="/Deposit/DepositPage"
                class="control"
                id="funding"
                onclick=" "
              >
                <b>FUNDING</b>
              </Link>
              <Link
                to="/Deposit/DepositPage"
                class="control"
                id=" "
                onclick=" "
              >
                <img src={deposit} id="other-icon" alt="deposit-icon" />
                Deposit
              </Link>
              <Link
                to="/Withdraw/WithdrawPage"
                class="control"
                id=" "
                onclick=" "
              >
                <img src={withdraw} id="other-icon" alt="withdraw-icon" />
                Withdraw
              </Link>
              <Link
                to="/Invest/InvestPage"
                class="control"
                id="trading"
                onclick=" "
              >
                <b>TRADING</b>
              </Link>
              <Link to="/Invest/InvestPage" class="control" id=" " onclick=" ">
                <img src={crypto} id="other-icon" alt="crypto-icon" />
                Crypto
              </Link>
              <Link to="/Invest/InvestPage" class="control" id=" " onclick=" ">
                <img src={forex} id="other-icon" alt="forex-icon" />
                Forex
              </Link>
              <span class="control" id="partners" onclick=" ">
                <b> PARTNERS</b>
              </span>
              <span class="control" id="bam" onclick=" ">
                Become a Merchant
              </span>
              <span class="control" id="help" onclick=" ">
                <img src={help} id="other-icon" alt="help-icon" />
                HELP
              </span>
              <span class="control" id=" " onclick=" ">
                <img src={legal} id="other-icon" alt="legal-icon" />
                Legal Documents
              </span>
              <span class="control" id=" " onclick=" ">
                <img src={logout} id="other-icon" alt="logout-icon" />
                LogOut
              </span>
            </div>
          </div>
        </div>

        <div class="dashboard-content">
          <div class="board-content">
            <div class="welcome-user">
              <div class="welcome">
                <div class="welcome-text">
                  <p>Welcome back, {currentUser.firstName}</p>
                </div>
                <div class="welcome-asset">
                  <span>
                    <img src={currentUser.photoUrl} alt="user-avatar" />
                  </span>
                  <span class="john">
                    <p>
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                  </span>
                  <span class="bell-notification" id=" " onclick=" ">
                    <i class="fa fa-bell"></i>
                  </span>
                </div>
              </div>
            </div>

            <IconButton onClick={handleGoBack}>
              <img src={backarrow} alt="backarrow" id="arrowI" />
            </IconButton>

            <div class="invest-wt-caltexF">
              <p class="cal-text">Invest with Caltex</p>
              <div class="forex-or-crypto">
                <div class="forex-or-crypto-inne">
                  <Link
                    to="/Invest/InvestPage?tradeType=forex"
                    className={`forex ${isForex ? "active" : ""}`}
                    id="forex"
                  >
                    Forex
                  </Link>
                  <Link
                    to="/Invest/InvestPage?tradeType=crypto"
                    className={`crypto ${isForex ? "" : "active"}`}
                    id="crypto"
                  >
                    Crypto
                  </Link>
                </div>
              </div>
            </div>

            <div class="starter-planInvestF">
              <InvestForm {...investFormProps} />
            </div>

            <div class="congratulations" id="congratulations">
              <div class="congrats">
                <div class="congrat-text">
                  <p>
                    Congratulations, you have invested with caltex successfully
                  </p>

                  <div class="see-investment-btn">
                    <span class="see-btn" onclick=" ">
                      See Your Investment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestTab;
