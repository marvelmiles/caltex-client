import React from "react";
import "./index.css";
import InvestForm from "../InvestForm";
import ArrowAndTab from "../ArrowAndTab";
import Layout from "../Layout";

const InvestTab = ({
  investFormProps = {
    plan: "starter",
    tradeType: "forex",
    maxAmount: 10000,
    minAmount: 100,
    roiPct: 2.5,
    duration: 7
  }
}) => {
  return (
    <Layout>
      <ArrowAndTab />
      <div class="starter-planInvestF">
        <InvestForm {...investFormProps} />
      </div>
      <div class="congratulations" id="congratulations">
        <div class="congrats">
          <div class="congrat-text">
            <p>Congratulations, you have invested with caltex successfully</p>

            <div class="see-investment-btn">
              <span class="see-btn" onclick=" ">
                See Your Investment
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvestTab;
