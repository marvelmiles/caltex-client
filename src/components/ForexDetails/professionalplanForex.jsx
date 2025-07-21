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
            <i class="fa fa-check" id="check"></i> Minimum Amount: $11,000
          </p>

          <p>
            <i class="fa fa-check" id="check"></i> Withdraw: Daily
          </p>

          <p>
            <i class="fa fa-check" id="check"></i>Withdrawal fee:7% (No hidden
            fee)
          </p>

          <p>
            <i class="fa fa-check" id="check"></i>3 stages referral commision
          </p>

          <p>
            <i class="fa fa-check" id="check"></i>Average Spread: Daily yield
          </p>

          <p>
            <i class="fa fa-check" id="check"></i>
            Equity etfs,Crypto Derivatives, Symbol
          </p>

          <p>
            <i class="fa fa-check" id="check"></i>
            Forex pairs, Dax futures
          </p>

          {/* <p>
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
            <i class="fa fa-check" id="check"></i>7% referral for third person
          </p> */}
          {/* <p>
            <i class="fa fa-check" id="check"></i>15% referral for first person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>10% referral for second person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>7% referral for third person
          </p> */}
        </div>
        <div class="investment-buttons">
          <Link
            to="/ForexInvestForms/professionalPlanInvF"
            class="invest-masterCrypto"
          >
            Buy
          </Link>
          <Link
            replace
            to="/Invest/InvestPage?tradeType=forex"
            class="change-masterCrypto"
          >
            Change Plan
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalplanForex;
