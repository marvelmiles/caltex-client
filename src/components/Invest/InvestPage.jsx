import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../Layout";
import ArrowAndTab from "../ArrowAndTab";

const InvestPage = () => {
  const [searchParams] = useSearchParams();

  const [openPlan, setOpenPlan] = useState(false);

  const type = (searchParams.get("tradeType") || "forex").toLowerCase();

  const isForex = type === "forex";

  const togglePlan = () => {
    setOpenPlan(bool => !bool);
  };

  const searchParam = `tradeType=${type}`;

  return (
    <Layout>
      <div class="invest-carltex" id="invest-carltex">
        <div class="invest-inner">
          <ArrowAndTab />
          <div class="invest-forex">
            <div class="invex-forex-inner">
              <p class="wide-array">
                We have a wide array of investment plans to choose from. Choose
                from the options below the investment plan which best suits you.
              </p>

              <div class="choose-your-plan">
                <div class="choose" id="choose">
                  <div
                    class="choose-plan1"
                    id="choose-plan1"
                    onClick={togglePlan}
                  >
                    <span>Choose Plan</span>

                    {openPlan ? (
                      <span class="close-plan" id="close-plan">
                        <i class="fa fa-caret-up"></i>
                      </span>
                    ) : (
                      <span class="view-plan" id="view-plan">
                        <i class="fa fa-caret-down"></i>
                      </span>
                    )}
                  </div>

                  <div
                    class="plan-options-forex"
                    style={{
                      display: openPlan && isForex ? "block" : "none",
                    }}
                  >
                    <div class="plan">
                      <Link
                        to={`/ForexDetails/StarterplanForex?${searchParam}`}
                        class="starter-plan"
                      >
                        Starter Plan 1.0% ROI, 7 DAYS PACKAGE $100-$10000
                      </Link>
                      <Link
                        to={`/ForexDetails/professionalplanForex?${searchParam}`}
                        class="professional-plan"
                      >
                        Professional Plan 1.5% ROI, 14 DAYS PACKAGE
                        $11000-$50000
                      </Link>
                      <Link
                        to={`/ForexDetails/masterplanForex?${searchParam}`}
                        class="master-plan"
                      >
                        Master Plan 2.0% ROI 21 DAYS $50000-$100000
                      </Link>
                    </div>
                  </div>

                  <div
                    class="plan-options-crypto"
                    style={{
                      display: openPlan && !isForex ? "block" : "none",
                    }}
                  >
                    <div class="plan">
                      <Link
                        to={`/CryptoDetails/starterplanCrypto?${searchParam}`}
                        class="starter-plan"
                      >
                        Starter Plan 2.0% ROI, 10 DAYS PACKAGE $300-$15000
                      </Link>
                      <Link
                        to={`/CryptoDetails/professionalplanCrypto?${searchParam}`}
                        class="professional-plan"
                      >
                        Professional Plan 2.5% ROI, 20 DAYS PACKAGE
                        $16000-$100000
                      </Link>
                      <Link
                        to={`/CryptoDetails/masterplanCrypto?${searchParam}`}
                        class="master-plan"
                      >
                        Master Plan 3.0% ROI 30 DAYS $101000-$UNLIMITED
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/CaltexCompanyBrief/CaltexCompBrief"
                    class="viewPlanDetails"
                  >
                    View Plan details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default InvestPage;
