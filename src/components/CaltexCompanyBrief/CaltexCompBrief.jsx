import "../../components/Invest/InvestPage.css";
import "./CaltexCompBrief.css";
import pdfIcon from "../../images/pdfLogo.png";
import companyBrief from "../../svgs/CaltexCompanyBrief.pdf";

import { Link } from "react-router-dom";
import Layout from "../Layout";
import ArrowAndTab from "../ArrowAndTab";

const CaltexCompBrief = () => {
  return (
    <Layout>
      <div className="invest-carltex" id="invest-carltex">
        <div className="invest-inner">
          <ArrowAndTab />

          <div className="invest-forex">
            <div className="invex-forex-inner">
              <p className="wide-array">
                We have a wide array of investment plans to choose from. Choose
                from the options below the investment plan which best suits you.
              </p>

              <div className="downloadPlan" id="downloadPlan">
                <span>
                  <img src={pdfIcon} id="pdfIcon"></img>
                </span>
                <span id="download-text">Download Caltex Company's Brief</span>
              </div>

              <div className="downloadBtn">
                <Link
                  to={companyBrief}
                  id="downloadBtn"
                  target="_blank"
                  download="CaltexCompanyBrief.pdf"
                >
                  Download
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaltexCompBrief;
