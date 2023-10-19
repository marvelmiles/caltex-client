import React from "react";
import { Link } from "react-router-dom";
import ArrowAndTab from "../ArrowAndTab";
import Layout from "../Layout";

const MasterplanCrypto = () => {
  return (
    <Layout>
      <ArrowAndTab />

      <div class="master-planCrypto">
        <div class="master-planC">
          <h4>Master Plan</h4>
          <p>
            <i class="fa fa-check" id="check"></i>Minimum Investment:$101,000
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Maximum Investment:UNLIMITED
          </p>
          <p>
            <i class="fa fa-check" id="check"></i>Withdrawal fee:10% withdrawal
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
          </p>
        </div>
        <div class="investment-buttons">
          <Link
            to="/CryptoInvestForms/masterPlanInvC"
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

export default MasterplanCrypto;
