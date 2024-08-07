import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../Layout";
import ArrowAndTab from "../ArrowAndTab";

const InvestPage = () => {
  const [searchParams] = useSearchParams();

  const [openPlan, setOpenPlan] = useState(false);

  const type = (searchParams.get("tradeType") || "forex").toLowerCase();

  const isForex = type === "forex";

  const togglePlan = () => {
    setOpenPlan((bool) => !bool);
  };

  const searchParam = `tradeType=${type}`;

  return (
    <Layout>
      <div className="invest-carltex" id="invest-carltex">
        <div className="invest-inner">
          <ArrowAndTab />
          <div className="invest-forex">
            <div className="invex-forex-inner">
              <p className="wide-array">
                We have a wide array of securities and investment plans to
                choose from. Select from the options below the market plan that
                best suits you.
              </p>

              <div className="choose-your-plan">
                <div className="choose" id="choose">
                  <div
                    className="choose-plan1"
                    id="choose-plan1"
                    onClick={togglePlan}
                  >
                    <span>Choose Plan</span>

                    {openPlan ? (
                      <span className="close-plan" id="close-plan">
                        <i className="fa fa-caret-up"></i>
                      </span>
                    ) : (
                      <span className="view-plan" id="view-plan">
                        <i className="fa fa-caret-down"></i>
                      </span>
                    )}
                  </div>

                  <div
                    className="plan-options-forex"
                    style={{
                      display: openPlan && isForex ? "block" : "none",
                    }}
                  >
                    <div className="plan">
                      <Link
                        to={`/ForexDetails/StarterplanForex?${searchParam}`}
                        className="starter-plan"
                      >
                        Starter Plan LR 0.6%, 14 DAYS roll over, Mini Dep
                        $100-$10000
                      </Link>
                      <Link
                        to={`/ForexDetails/professionalplanForex?${searchParam}`}
                        className="professional-plan"
                      >
                        Professional Plan LR 1.5%, 5 Weeks roll over, Mini Dep
                        $11000-$50000
                      </Link>
                      <Link
                        to={`/ForexDetails/masterplanForex?${searchParam}`}
                        className="master-plan"
                      >
                        Master Plan LR 2%,2 months roll over, Mini Dep
                        $50000-$100000
                      </Link>
                    </div>
                  </div>

                  <div
                    className="plan-options-crypto"
                    style={{
                      display: openPlan && !isForex ? "block" : "none",
                    }}
                  >
                    <div className="plan">
                      <Link
                        to={`/CryptoDetails/starterplanCrypto?${searchParam}`}
                        className="starter-plan"
                      >
                        Starter Plan 1.4% ROI, 10 DAYS PACKAGE $300-$15000
                      </Link>
                      <Link
                        to={`/CryptoDetails/professionalplanCrypto?${searchParam}`}
                        className="professional-plan"
                      >
                        Professional Plan 2.5% ROI, 20 DAYS PACKAGE
                        $16000-$100000
                      </Link>
                      <Link
                        to={`/CryptoDetails/masterplanCrypto?${searchParam}`}
                        className="master-plan"
                      >
                        Master Plan 3.0% ROI 30 DAYS $101000-$UNLIMITED
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/CaltexCompanyBrief/CaltexCompBrief"
                    className="viewPlanDetails"
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
