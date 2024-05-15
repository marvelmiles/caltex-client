import forex from "../../images/forex.png";
import crypto from "../../images/crypto.png";
import withdraw from "../../images/withdraw.png";
import help from "../../images/help.png";
import profile from "../../images/profile.png";
import deposit from "../../images/deposit.png";
import legal from "../../images/legal.png";
import logout from "../../images/logout.png";

import { Link } from "react-router-dom";

import { BiSolidDashboard } from "react-icons/bi";

import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";

import "./layout.css";

const Layout = ({ children }) => {
  const closeNav = () => {
    document.getElementById("sidenav").style.width = "0";
  };

  return (
    <>
      <div className="mySidenav" id="sidenav">
        <Link to=" " className="closebtn" id="close-btn" onClick={closeNav}>
          &times;
        </Link>
        <Link to="/" className=" ">
          <BiSolidDashboard id="other-icon" className="dashboard-icon" />
          Dashboard
        </Link>
        <Link to="/profile/Profile" className="linkss">
          <img src={profile} id="other-icon" alt="profile-icon" />
          Profile
        </Link>
        <Link to="/Deposit/DepositPage" className="linkss">
          <img src={deposit} id="other-icon" alt="deposit-icon" />
          Deposit
        </Link>

        <Link to="/Invest/InvestPage?tradeType=forex" className="linkss">
          <img src={deposit} id="other-icon" alt="deposit-icon" />
          Invest
        </Link>
        <Link to="/Withdraw/withdrawPage" className="linkss">
          <img src={withdraw} id="other-icon" alt="withdraw-icon" />
          Withdraw
        </Link>
        <Link to="/Invest/InvestPage?tradeType=crypto" className="linkss">
          <img src={crypto} id="other-icon" alt="crypto-icon" />
          Crypto
        </Link>
        <Link to="/Invest/InvestPage?tradeType=forex" className="linkss">
          <img src={forex} id="other-icon" alt="forex-icon" />
          Forex
        </Link>
        <Link to="/help/Help" className="linkss">
          <img src={help} id="other-icon" alt="help-icon" />
          HELP
        </Link>
        <Link to="/legalDocument/LegalDocument" className="linkss">
          <img src={legal} id="other-icon" alt="legal-icon" />
          Legal Documents
        </Link>
        <Link to="/auth/login" className="linkss">
          <img src={logout} id="other-icon" alt="logout-icon" />
          Logout
        </Link>
      </div>

      <div className="dashboard-container">
        <div className="board">
          <Sidebar />
          <div className="dashboard-content">
            <div className="board-content">
              <DashboardNav />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
