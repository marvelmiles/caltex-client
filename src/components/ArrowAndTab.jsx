import React from "react";
import PropTypes from "prop-types";
import { useCtx } from "../context";
import InvestTabPane from "./InvestTabPane";

const ArrowAndTab = props => {
  const { renderBackArrow } = useCtx();

  return (
    <div class="invest-carltex" id="invest-carltex">
      <div class="invest-inner">
        {renderBackArrow()}
        <InvestTabPane replace />
      </div>
    </div>
  );
};

ArrowAndTab.propTypes = {};

export default ArrowAndTab;
