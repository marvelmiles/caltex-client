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
import DashboardPage from "../dashboard/DashboardPage";
import DashboardNav from "../dashboard/DashboardNav";

const ProfessionalplanCrypto = () => {
  const { currentUser } = useAuth();

  return (
    <div class="dashboard-container">
      <div class="board">
        <DashboardPage />

        <div class="dashboard-content">
          <div class="board-content">
            <DashboardNav />

            <ArrowAndTab />

            <div class="professional-planCrypto">
              <div class="professional-planC">
                <h4>Professional Plan</h4>
                <p>
                  <i class="fa fa-check" id="check"></i>Minimum
                  Investment:$16,000
                </p>
                <p>
                  <i class="fa fa-check" id="check"></i>Maximum
                  Investment:$100,000
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
                  to="/CryptoInvestForms/professionalPlanInvC"
                  class="invest-professionalCrypto"
                >
                  Invest
                </Link>
                <Link
                  to="/Invest/InvestPage?tradeType=forex"
                  class="change-professionalCrypto"
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

export default ProfessionalplanCrypto;
