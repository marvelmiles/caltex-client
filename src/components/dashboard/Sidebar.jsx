import { useState } from "react";
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
import createBlog from "./../../images/blog1.png";
import viewBlog from "./../../images/view-blog.png";
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
    <div className="dashboard-panel" id="sidenav">
      <div className="panel panels">
        <div className="logo">
          <span>
            <img src={logo} alt="logo" />
          </span>
          <span>
            <img src={caltexTrader} alt="caltek-logo" />
          </span>
        </div>

        {isSuperAdmin || isAdmin ? (
          <div className="panel-control" id={styles.admin}>
            <Link to="/u/dashboard" className="controld" id="dashboard">
              <BiSolidDashboard
                id="other-icon"
                classNameName="dashboard-icon"
              />
              Admin Dashboard
            </Link>
            <Link to="/manageUsers/ManageUsers">
              <span
                className="control"
                id={bgActive ? styles.colorActive : ""}
                onClick={() => setBgactive(!bgActive)}
              >
                <img src={profile} id="other-icon" alt="profile-icon" />
                Manage Users
              </span>
            </Link>

            <Link
              to="/manageDeposits/ManageDeposits"
              className="control"
              id={bgActive ? styles.colorActive : ""}
              onclick={() => setBgactive(!bgActive)}
            >
              <img src={deposit} id="other-icon" alt="deposit-icon" />
              Manage Deposit
            </Link>
            <Link
              to="/manageWithdrawals/ManageWithdrawals"
              className="control"
              id={bgActive ? styles.colorActive : ""}
              onclick={() => setBgactive(!bgActive)}
            >
              <img src={withdraw} id="other-icon" alt="withdraw-icon" />
              Manage Withdrawal
            </Link>
            <Link
              to="/blog/CreateBlog"
              className="control"
              id={bgActive ? styles.colorActive : ""}
              onclick={() => setBgactive(!bgActive)}
            >
              <img src={viewBlog} id="other-icon" alt="withdraw-icon" />
              Create Blog
            </Link>
            <Link
              to="/blog/ViewBlog"
              className="control"
              id={bgActive ? styles.colorActive : ""}
              onclick={() => setBgactive(!bgActive)}
            >
              <img src={createBlog} id="other-icon" alt="withdraw-icon" />
              View Blogs
            </Link>
            {isSuperAdmin && (
              <>
                <Link
                  to="/manageAdmin/ManageAdmin"
                  className="control"
                  id={bgActive ? styles.colorActive : ""}
                  onclick={() => setBgactive(!bgActive)}
                >
                  <img src={admin} id="other-icon" alt="withdraw-icon" />
                  Manage Admins
                </Link>
                <Link
                  to="/addAdmin/AddAdmin"
                  className="control"
                  id={bgActive ? styles.colorActive : ""}
                  onclick={() => setBgactive(!bgActive)}
                >
                  <img src={admin} id="other-icon" alt="withdraw-icon" />
                  Add Admin
                </Link>
              </>
            )}

            <Link to={HOME_ORIGIN} onClick={handleSignout}>
              <span className="control">
                <img src={logout} id="other-icon" alt="logout-icon" />
                Signout
              </span>
            </Link>
          </div>
        ) : (
          <div className="panel-control">
            <Link to="/u/dashboard" className="controld" id="dashboard">
              <BiSolidDashboard
                id="other-icon"
                classNameName="dashboard-icon"
              />
              Dashboard
            </Link>
            <Link to="/profile/Profile">
              {" "}
              <span className="control" id=" ">
                <img src={profile} id="other-icon" alt="profile-icon" />
                Profile
              </span>
            </Link>
            <Link to="/Deposit/DepositPage" className="control" id="funding">
              <b>FUNDING</b>
            </Link>
            <Link to="/Deposit/DepositPage" className="control" id=" ">
              <img src={deposit} id="other-icon" alt="deposit-icon" />
              Deposit
            </Link>
            <Link to="/Withdraw/WithdrawPage" className="control" id=" ">
              <img src={withdraw} id="other-icon" alt="withdraw-icon" />
              Withdraw
            </Link>
            <Link to="/Invest/InvestPage" className="control" id="trading">
              <b>TRADING</b>
            </Link>
            <Link
              to="/Invest/InvestPage?tradeType=crypto"
              className="control"
              id=" "
            >
              <img src={crypto} id="other-icon" alt="crypto-icon" />
              Crypto
            </Link>
            <Link
              to="/Invest/InvestPage?tradeType=forex"
              className="control"
              id=" "
            >
              <img src={forex} id="other-icon" alt="forex-icon" />
              Forex
            </Link>
            <Link to="/investment/Investment" className="control">
              <FiTrendingUp style={{ fontSize: "24px", marginRight: "10px" }} />
              Investment
            </Link>
            <span className="control" id="partners">
              <b> PARTNERS</b>
            </span>
            <span className="control" id="bam">
              Become a Merchant
            </span>
            <Link to="/help/Help">
              <span className="control" id="help">
                <img src={help} id="other-icon" alt="help-icon" />
                HELP
              </span>
            </Link>
            <Link to="/legalDocument/LegalDocument">
              <span className="control" id=" ">
                <img src={legal} id="other-icon" alt="legal-icon" />
                Legal Documents
              </span>
            </Link>
            <Link to={HOME_ORIGIN} onClick={handleSignout}>
              <span className="control">
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
