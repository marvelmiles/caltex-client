import React, { useState } from "react";
import "./dashboard.css";
import caltexTrader from "./../../images/caltexTrader.png";
import logo from "./../../images/logo (1).png";
import forex from "./../../images/forex.png";
import crypto from "./../../images/crypto.png";
import withdraw from "./../../images/withdraw.png";
import help from "./../../images/help.png";
import profile from "./../../images/profile.png";
import admin from "./../../svgs/admin.svg";
import deposit from "./../../images/deposit.png";
import legal from "./../../images/legal.png";
import logout from "./../../images/logout.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BiSolidDashboard } from "react-icons/bi";
import styles from "./Sidebar.module.scss";
import { HOME_ORIGIN } from "../../config/constants";
import { FiTrendingUp } from "react-icons/fi";
import "./sidebar.css";

const Sidebar = () => {
  const { currentUser, handleSignout } = useAuth();

  const { isSuperAdmin, isAdmin } = currentUser;

  const [bgActive, setBgactive] = useState(false);

  return (
    <div class="dashboard-panel" id="sidenav">
      <div class="panel panels">
        <div class="logo">
          <span>
            <img src={logo} alt="logo" />
          </span>
          <span>
            <img src={caltexTrader} alt="caltek-logo" />
          </span>
        </div>

        {isSuperAdmin || isAdmin ? (
          <div class="panel-control" id={styles.admin}>
            <Link to="/u/dashboard" class="controld" id="dashboard" onclick=" ">
              <BiSolidDashboard id="other-icon" className="dashboard-icon" />
              Admin Dashboard
            </Link>
            <Link to="/manageUsers/ManageUsers">
              <span
                class="control"
                id={bgActive ? styles.colorActive : ""}
                onclick={() => setBgactive(!bgActive)}
              >
                <img src={profile} id="other-icon" alt="profile-icon" />
                Manage Users
              </span>
            </Link>

            <Link
              to="/manageDeposits/ManageDeposits"
              class="control"
              id={bgActive ? styles.colorActive : ""}
              onclick={() => setBgactive(!bgActive)}
            >
              <img src={deposit} id="other-icon" alt="deposit-icon" />
              Manage Deposit
            </Link>
            <Link
              to="/manageWithdrawals/ManageWithdrawals"
              class="control"
              id={bgActive ? styles.colorActive : ""}
              onclick={() => setBgactive(!bgActive)}
            >
              <img src={withdraw} id="other-icon" alt="withdraw-icon" />
              Manage Withdrawal
            </Link>
            {isSuperAdmin && (
              <>
                <Link
                  to="/manageAdmin/ManageAdmin"
                  class="control"
                  id={bgActive ? styles.colorActive : ""}
                  onclick={() => setBgactive(!bgActive)}
                >
                  <img src={admin} id="other-icon" alt="withdraw-icon" />
                  Manage Admins
                </Link>
                <Link
                  to="/addAdmin/AddAdmin"
                  class="control"
                  id={bgActive ? styles.colorActive : ""}
                  onclick={() => setBgactive(!bgActive)}
                >
                  <img src={admin} id="other-icon" alt="withdraw-icon" />
                  Add Admin
                </Link>
              </>
            )}

            <Link to={HOME_ORIGIN} onClick={handleSignout}>
              <span class="control">
                <img src={logout} id="other-icon" alt="logout-icon" />
                Signout
              </span>
            </Link>
          </div>
        ) : (
          <div class="panel-control">
            <Link to="/u/dashboard" class="controld" id="dashboard" onclick=" ">
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
              to="/Invest/InvestPage?tradeType=crypto"
              class="control"
              id=" "
              onclick=" "
            >
              <img src={crypto} id="other-icon" alt="crypto-icon" />
              Crypto
            </Link>
            <Link
              to="/Invest/InvestPage?tradeType=forex"
              class="control"
              id=" "
              onclick=" "
            >
              <img src={forex} id="other-icon" alt="forex-icon" />
              Forex
            </Link>
            <Link to="/investment/Investment" class="control">
              <FiTrendingUp style={{ fontSize: "24px", marginRight: "10px" }} />
              Investment
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
              <span class="control" id=" " onclick=" ">
                <img src={legal} id="other-icon" alt="legal-icon" />
                Legal Documents
              </span>
            </Link>
            <Link to={HOME_ORIGIN} onClick={handleSignout}>
              <span class="control">
                <img src={logout} id="other-icon" alt="logout-icon" />
                Signout
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
