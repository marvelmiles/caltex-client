import React from "react";
import "../../components/Invest/InvestPage.css";
import "./CaltexCompBrief.css";
import pdfIcon from "../../images/pdfLogo.png";
import companyBrief from "./CaltexCompanyBrief.pdf";

import { Link, useSearchParams } from "react-router-dom";
import { useCtx } from "../../context";
import Layout from "../Layout";
import ArrowAndTab from "../ArrowAndTab";

const CaltexCompBrief = () => {
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

              <div className="downloadPlan" id="downloadPlan">
                <span>
                  <img src={pdfIcon} id="pdfIcon"></img>
                </span>
                <span id="download-text">Download Caltex Company's Brief</span>
              </div>

              <div className="downloadBtn">
                <Link to={companyBrief} id="downloadBtn" download>
                  Download
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  function openNav() {
    document.getElementById("sidenav").style.width = "70%";
  }
};

export default CaltexCompBrief;
