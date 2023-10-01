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
import backarrow from "../../images/backArrow.png";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { BiSolidDashboard } from "react-icons/bi";

import ArrowAndTab from "../ArrowAndTab";
import useAuth from "../../hooks/useAuth";

const MasterplanCrypto = () => {
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
                <BiSolidDashboard id="other-icon" className="dashboard-icon" />
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

            <ArrowAndTab />
 
            <div class="master-planCrypto">
              <div class="master-planC">
                <h4>Master Plan</h4>
                <p>
                  <i class="fa fa-check" id="check"></i>Minimum
                  Investment:$101,000
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>Maximum
                  Investment:UNLIMITED
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>Withdrawal fee:10%
                  withdrawal charges
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>3 stages referral
                  commission
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>20% referral for first
                  person
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>15% referral for second
                  person
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>10% referral for third
                  person
                </p>
              </div>
              <div class="investment-buttons">
                <Link
                  to="/CryptoInvestForms/masterPlanInvC"
                  class="invest-masterCrypto"
                >
                  Invest
                </Link>
                <Link
                  to="/Invest/InvestPage?tradeType=forex"
                  class="change-masterCrypto"
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

export default MasterplanCrypto;
