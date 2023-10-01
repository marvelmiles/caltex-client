import './professionalplanForex.css';
import React from "react";
import ReactDoM from "react-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
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
import closedeye from "../../images/closedeye.png";
import dashboard from "../../images/dashboard (1).png";
import ArrowAndTab from "../ArrowAndTab";
import useAuth from "../../hooks/useAuth";

import { BiSolidDashboard } from "react-icons/bi";

const ProfessionalplanForex = () => {
  const { currentUser } = useAuth();

  return (
    <div class="dashboard-container">
      <div class="board">
        <div class="dashboard-panel">
          <div class="panel">
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
                <img src={dashboard} id="other-icon" alt="profile-icon" />
                  Dashboard
                </Link>
                <Link to="/profile/Profile" className="control" id=" ">
                  <img src={profile} id="other-icon" alt="profile-icon" />
                  Profile
                </Link>
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
              <Link to="/Invest/InvestPage?tradeType=crypto" className="control" id=" ">
                  <img src={crypto} id="other-icon" alt="crypto-icon" />
                  Crypto
                </Link>
                <Link to="/Invest/InvestPage?tradeType=forex" className="control" id=" ">
                  <img src={forex} id="other-icon" alt="forex-icon" />
                  Forex
                </Link>
              <span class="control" id="partners" onclick=" ">
                <b> PARTNERS</b>
              </span>
              <span class="control" id="bam" onclick=" ">
                Become a Merchant
              </span>
              <Link to='/help/Help' className="control" id="help">
                  <img src={help} id="other-icon" alt="help-icon" />
                  HELP
                </Link>
                <Link to='/legalDocument/LegalDocument' className="control" id=" ">
                  <img src={legal} id="other-icon" alt="legal-icon" />
                  Legal Documents
                </Link>
                <Link to='/auth/login' className="control" id=" ">
                  <img src={logout} id="other-icon" alt="logout-icon" />
                  LogOut
                </Link>
            </div>
          </div>
        </div>

        <div class="dashboard-content">
          <div class="board-content">
            <div class="welcome-user">
              <div class="welcome">
                <div class="welcome-text">
                  <p>Welcome back, {currentUser.firstname}</p>
                </div>
                <div class="welcome-asset">
                  <span>
                    <img src={currentUser.photoUrl} alt="user-avatar" />
                  </span>
                  <span class="john">
                    <p>
                      {currentUser.firstname} {currentUser.lastname}
                    </p>
                  </span>
                  <span class="bell-notification" id=" " onclick=" ">
                    <i class="fa fa-bell"></i>
                  </span>
                </div>
              </div>
            </div>

            <ArrowAndTab />

            <div class="professional-planForex">
              <div class="professional-planF">
                <h4>Professional Plan</h4>
                <p>
                  <i class="fa fa-check" id="check"></i>Minimum
                  Investment:$11,000
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>Maximum
                  Investment:$50,000
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>Withdrawal fee:7%
                  withdrawal charges
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>3 stages referral
                  commission
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>15% referral for first
                  person
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>10% referral for second
                  person
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>7% referral for third
                  person
                </p>
              </div>
              <div class="investment-buttons">
                <Link
                  to="/ForexInvestForms/professionalPlanInvF"
                  class="invest-professionalForex"
                >
                  Invest
                </Link>
                <Link
                  to="/Invest/InvestPage?tradeType=forex"
                  class="change-professionalForex"
                >
                  Change Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalplanForex;
