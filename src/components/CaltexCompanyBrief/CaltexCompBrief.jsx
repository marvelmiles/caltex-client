import React from "react";
import ReactDoM from "react-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "../../components/Invest/InvestPage.css";
import "./CaltexCompBrief.css";
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
import dashboard from "../../images/dashboard (1).png";
import pdfIcon from "../../images/pdfLogo.png";
import companyBrief from "./CaltexCompanyBrief.pdf";

import { Link, useSearchParams } from "react-router-dom";

import { BiSolidDashboard } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { HiDocumentText } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { SiVisa } from "react-icons/si";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useCtx } from "../../context";
import InvestTabPane from "../InvestTabPane";
import useAuth from "../../hooks/useAuth";

const CaltexCompBrief = () => {
  const closeNav = () => {
    document.getElementById("sidenav").style.width = "0";
  };

  const { renderBackArrow } = useCtx();
  const { currentUser } = useAuth();

  const [searchParams] = useSearchParams();

  const [openPlan, setOpenPlan] = useState(false);

  const type = (searchParams.get("tradeType") || "forex").toLowerCase();

  const isForex = type === "forex";

  const handleTabClick = () => {
    setOpenPlan(false);
  };

  const togglePlan = () => {
    setOpenPlan(bool => !bool);
  };

  const searchParam = `tradeType=${type}`;

  

  return (
    <>
      <div class="mySidenav" id="sidenav">
        <Link to=" " class="closebtn" id="close-btn" onClick={closeNav}>
          &times;
        </Link>
        <Link to="/" class=" ">
          <BiSolidDashboard id="other-icon" className="dashboard-icon" />
          Dashboard
        </Link>
        <Link to="/" class="linkss">
          <img src={profile} id="other-icon" alt="profile-icon" />
          Profile
        </Link>
        <Link to="/Deposit/DepositPage" class="linkss">
          <img src={deposit} id="other-icon" alt="deposit-icon" />
          Deposit
        </Link>
        <Link to="/Withdraw/withdrawPage" class="linkss">
          <img src={withdraw} id="other-icon" alt="withdraw-icon" />
          Withdraw
        </Link>
        <Link to="/Invest/InvestPage" class="linkss">
          <img src={crypto} id="other-icon" alt="crypto-icon" />
          Crypto
        </Link>
        <Link to="/Invest/InvestPage" class="linkss">
          <img src={forex} id="other-icon" alt="forex-icon" />
          Forex
        </Link>
        <Link to="/" class="linkss">
          <img src={help} id="other-icon" alt="help-icon" />
          HELP
        </Link>
        <Link to="/" class="linkss">
          <img src={legal} id="other-icon" alt="legal-icon" />
          Legal Documents
        </Link>
        <Link to="/" class="linkss">
          <img src={logout} id="other-icon" alt="logout-icon" />
          LogOut
        </Link>
      </div>

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
                <Link
                  to="/Invest/InvestPage"
                  class="control"
                  id=" "
                  onclick=" "
                >
                  <img src={crypto} id="other-icon" alt="crypto-icon" />
                  Crypto
                </Link>
                <Link
                  to="/Invest/InvestPage"
                  class="control"
                  id=" "
                  onclick=" "
                >
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
                  <div class="menu-button" onClick={openNav}>
                    &#9776;
                  </div>
                </div>
              </div>

              <div class="invest-carltex" id="invest-carltex">
                <div class="invest-inner">
                  {renderBackArrow()}
                  <div class="invest-wt-caltex">
                    <p class="plan-text">Plan Details</p>
                    <div class="forex-or-crypto">
                      <div class="forex-or-crypto-inner">
                        <span class="forex" id="forex" onclick=''>
                          Forex
                        </span>
                        <span
                          class="crypto"
                          id="crypto"
                          onclick=''
                        >
                          Crypto
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="invest-forex">
                    <div class="invex-forex-inner">
                      <p class="wide-array">
                        We have a wide array of investment plans to choose from.
                        Choose from the options below the investment plan which
                        best suits you.
                      </p>
      
                        <div className="downloadPlan" id="downloadPlan">
                          <span><img src={pdfIcon} id='pdfIcon'></img></span>
                          <span id='download-text'>Download Caltex Company's Brief</span>
                        </div>  

                        <div className="downloadBtn">
                            <Link to={companyBrief} id='downloadBtn' download>Download</Link>    
                        </div>  

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function openNav() {
    document.getElementById("sidenav").style.width = "70%";
  }

};

export default CaltexCompBrief;
