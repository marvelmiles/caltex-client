import "./starterplanCrypto.css";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import ArrowAndTab from "../ArrowAndTab";

const StarterplanCrypto = () => {
  return (
    <Layout>
      <ArrowAndTab />

      {/* <!--Starter Plan Crypto--> */}
      <div className="starter-planCrypto">
        <div className="starter-planC">
          <h4>Starter Plan</h4>
          <p>
            <i className="fa fa-check" id="check"></i>Minimum Investment:$300
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>Maximum Investment:$15,000
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>Withdrawal fee:5%
            withdrawal charges
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>3 stages referral
            commission
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>10% referral for first
            person
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>7% referral for second
            person
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>3% referral for third
            person
          </p>
        </div>
        <div className="investment-buttons">
          <Link
            to="/CryptoInvestForms/starterPlanInvC"
            className="invest-masterCrypto"
          >
            Invest
          </Link>
          <Link
            replace
            to="/Invest/InvestPage?tradeType=forex"
            className="change-masterCrypto"
          >
            Change Plan
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default StarterplanCrypto;
