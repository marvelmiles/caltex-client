import "./professionalplanForex.css";
import { Link } from "react-router-dom";
import ArrowAndTab from "../ArrowAndTab";
import Layout from "../Layout";

const ProfessionalplanForex = () => {
  return (
    <Layout>
      <ArrowAndTab />

      <div class="professional-planForex">
        <div class="professional-planF">
          <h4>Professional Plan</h4>
          <p>
            <i class="fa fa-check" id="check"></i>Minimum Investment:$11,000
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Maximum Investment:$50,000
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Withdrawal fee:7% withdrawal
            charges
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>3 stages referral commission
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>15% referral for first person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>10% referral for second person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>7% referral for third person
          </p>
        </div>
        <div class="investment-buttons">
          <Link
            to="/ForexInvestForms/professionalPlanInvF"
            class="invest-professionalForex"
          >
            Invest
          </Link>
          <Link
            replace
            to="/Invest/InvestPage?tradeType=forex"
            class="change-professionalForex"
          >
            Change Plan
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalplanForex;
