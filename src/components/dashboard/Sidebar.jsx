import React from 'react';
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
import "./dashboard.css";
import caltexTrader from "./../../images/caltexTrader.png";
import logo from "./../../images/logo (1).png";
// import john from "./../images/John.jpg";
import forex from "./../../images/forex.png";
import crypto from "./../../images/crypto.png";
import withdraw from "./../../images/withdraw.png";
import help from "./../../images/help.png";
import profile from "./../../images/profile.png";
import deposit from "./../../images/deposit.png";
import legal from "./../../images/legal.png";
import logout from "./../../images/logout.png";

import { Link } from "react-router-dom";

import { BiSolidDashboard } from "react-icons/bi";

const Sidebar = () => {


 /** Begininng Of script for menu **/

 function openNav() {
   document.getElementById("sidenav").style.width = "70%";
 }

 function closeNav() {
   document.getElementById("sidenav").style.width = "0";
 }

  return (
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
          <Link to="/profile/Profile">
            {" "}
            <span class="control" id=" " onclick=" ">
              <img src={profile} id="other-icon" alt="profile-icon" />
              Profile
            </span>
          </Link>
          <Link
            to="/Deposit/DepositPage"
            class="control"
            id="funding"
            onclick=" "
          >
            <b>FUNDING</b>
          </Link>
          <Link to="/Deposit/DepositPage" class="control" id=" " onclick=" ">
            <img src={deposit} id="other-icon" alt="deposit-icon" />
            Deposit
          </Link>
          <Link to="/Withdraw/WithdrawPage" class="control" id=" " onclick=" ">
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
          <Link to="/help/Help">
            <span class="control" id="help" onclick=" ">
              <img src={help} id="other-icon" alt="help-icon" />
              HELP
            </span>
          </Link>
          <Link to="/legalDocument/LegalDocument">
            {" "}
            <span class="control" id=" " onclick=" ">
              <img src={legal} id="other-icon" alt="legal-icon" />
              Legal Documents
            </span>
          </Link>
          <span class="control" id=" " onclick=" ">
            <img src={logout} id="other-icon" alt="logout-icon" />
            LogOut
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
