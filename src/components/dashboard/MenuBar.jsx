import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import forex from "../../images/forex.png";
import crypto from "../../images/crypto.png";
import withdraw from "../../images/withdraw.png";
import help from "../../images/help.png";
import profile from "../../images/profile.png";
import deposit from "../../images/deposit.png";
import legal from "../../images/legal.png";
import logout from "../../images/logout.png";
import { BiSolidDashboard } from "react-icons/bi";

const MenuBar = ({ isVisible, onClose }) => {
  return (
    <div>
      {isVisible && (
        <div className="MySidenav">
          <Link to=" " class="closebtn" id="close-btn" onClick={onClose}>
            &times;
          </Link>
          <Link to="/u/dashboard" class=" ">
            <BiSolidDashboard id="other-icon" className="dashboard-icon" />
            Dashboard
          </Link>
          <Link to="/profile/Profile" class="linkss">
            <img src={profile} id="other-icon" alt="profile-icon" />
            Profile
          </Link>
          <Link to="/Deposit/DepositPage" class="linkss">
            <img src={deposit} id="other-icon" alt="deposit-icon" />
            Deposit
          </Link>

          <Link to="/Invest/InvestPage?tradeType=forex" class="linkss">
            <img src={deposit} id="other-icon" alt="deposit-icon" />
            Invest
          </Link>
          <Link to="/Withdraw/withdrawPage" class="linkss">
            <img src={withdraw} id="other-icon" alt="withdraw-icon" />
            Withdraw
          </Link>
          <Link to="/Invest/InvestPage?tradeType=crypto" class="linkss">
            <img src={crypto} id="other-icon" alt="crypto-icon" />
            Crypto
          </Link>
          <Link to="/Invest/InvestPage?tradeType=forex" class="linkss">
            <img src={forex} id="other-icon" alt="forex-icon" />
            Forex
          </Link>
          <Link to="/help/Help" class="linkss">
            <img src={help} id="other-icon" alt="help-icon" />
            HELP
          </Link>
          <Link to="/legalDocument/LegalDocument" class="linkss">
            <img src={legal} id="other-icon" alt="legal-icon" />
            Legal Documents
          </Link>
          <Link to="/auth/login" class="linkss">
            <img src={logout} id="other-icon" alt="logout-icon" />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
