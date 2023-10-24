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
import useAuth from "../../hooks/useAuth";
import admin from "./../../svgs/admin.svg";
import { HOME_ORIGIN } from "../../config/constants";
import { FiTrendingUp } from "react-icons/fi";

const MenuBar = ({ isVisible, onClose }) => {
  const {
    currentUser: { isAdmin, isSuperAdmin },
    handleSignout
  } = useAuth();

  return (
    <div>
      {isVisible && (
        <div className="MySidenav">
          <Link to=" " class="closebtn" id="close-btn" onClick={onClose}>
            &times;
          </Link>
          <Link to="/u/dashboard" className="link_cont ">
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
          <Link to="/investment/Investment" class="linkss">
            <FiTrendingUp style={{ fontSize: "24px", marginRight: "10px", color: "#000" }} />
            Investment
          </Link>
          <Link to="/help/Help" class="linkss">
            <img src={help} id="other-icon" alt="help-icon" />
            HELP
          </Link>
          <Link to="/legalDocument/LegalDocument" class="linkss">
            <img src={legal} id="other-icon" alt="legal-icon" />
            Legal Documents
          </Link>
          {isAdmin ? (
            <>
              {[
                {
                  to: "/manageUsers/ManageUsers",
                  label: "Manage Users",
                  icon: profile,
                },
                {
                  to: "/manageDeposits/ManageDeposits",
                  label: "Manage Deposit",
                  icon: deposit,
                },
                {
                  to: "/manageWithdrawals/ManageWithdrawals",
                  label: "Manage Withdrawal",
                  icon: withdraw,
                },
                {
                  nullify: !isSuperAdmin,
                  to: "/manageAdmin/ManageAdmin",
                  label: "Manage Admins",
                  icon: admin,
                },
              ].map((l, i) =>
                l.nullify ? null : (
                  <Link key={i} to={l.to} class="linkss">
                    <img src={l.icon} id="other-icon" alt="legal-icon" />
                    {l.label}
                  </Link>
                )
              )}
            </>
          ) : null}
          <Link to={HOME_ORIGIN} onClick={handleSignout} class="linkss">
            <img src={logout} id="other-icon" alt="logout-icon" />
            Signout
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
