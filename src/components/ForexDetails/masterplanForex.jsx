import React from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import "./masterplanForex.css";
import ArrowAndTab from "../ArrowAndTab";

const MasterplanForex = () => {
  return (
    <Layout>
      <ArrowAndTab />

      <div class="master-planForex">
        <div class="master-planF">
          <h4>Master Plan</h4>
          <p>
            <i class="fa fa-check" id="check"></i> Minimum Amount: $50,000
          </p>

          <p>
            <i class="fa fa-check" id="check"></i> Withdraw: Daily
          </p>

          <p>
            <i class="fa fa-check" id="check"></i>Withdrawal fee:5% (No hidden
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
            Convertible bonds, commodity features
          </p>

          <p>
            <i class="fa fa-check" id="check"></i> Bitcoin ETFs, Index CFds,
            Bond ETfs
          </p>
          {/* <p>
            <i class="fa fa-check" id="check"></i>Minimum Investment:$51,000
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Maximum Investment:$100,000
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Withdrawal fee:5% withdrawal
            charges
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>3 stages referral commission
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>20% referral for first person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>15% referral for second person
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>10% referral for third person
          </p> */}
        </div>
        <div class="investment-buttons">
          <Link
            to="/ForexInvestForms/masterPlanInvF"
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

export default MasterplanForex;
