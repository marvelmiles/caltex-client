import React from "react";
import { Link } from "react-router-dom";
import "./starterplanForex.css";
import ArrowAndTab from "../ArrowAndTab";
import Layout from "../Layout";

const StarterplanForex = () => {
  return (
    <Layout>
      <ArrowAndTab />

      <div class="starter-planForex">
        <div class="starter-planF">
          <h4>Starter Plan</h4>
          <p>
            <i class="fa fa-check" id="check"></i>Minimum Investment:$100
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Maximum Investment:$10,000
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Withdrawal fee:10% withdrawal
            charges
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>3 stages referral commission
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>10% referral for first person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>7% referral for second person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>3% referral for third person
          </p>
        </div>
        <div class="investment-buttons">
          <Link
            to="/ForexInvestForms/StarterPlanInvF"
            class="invest-masterCrypto"
          >
            Invest
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

export default StarterplanForex;
