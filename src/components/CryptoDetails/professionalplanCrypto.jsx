import { Link } from "react-router-dom";
import ArrowAndTab from "../ArrowAndTab";
import Layout from "../Layout";

const ProfessionalplanCrypto = () => {
  return (
    <Layout>
      <ArrowAndTab />

      <div className="professional-planCrypto">
        <div className="professional-planC">
          <h4>Professional Plan</h4>
          <p>
            <i className="fa fa-check" id="check"></i>Minimum Investment:$16,000
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>Maximum
            Investment:$100,000
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>Withdrawal fee:10%
            withdrawal charges
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>3 stages referral
            commission
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>15% referral for first
            person
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>10% referral for second
            person
          </p>
          <p>
            <i className="fa fa-check" id="check"></i>7% referral for third
            person
          </p>
        </div>
        <div className="investment-buttons">
          <Link
            to="/CryptoInvestForms/professionalPlanInvC"
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

export default ProfessionalplanCrypto;
