import React from "react";
import PropTypes from "prop-types";
import { useCtx } from "../../../context";

const BackArrow = (props) => {
  const { renderBackArrow } = useCtx();

  return (
    <div style={{ marginLeft: "20px" }}>
      <div class="invest-inner">
        {renderBackArrow()}
      </div>
    </div>
  );
};

BackArrow.propTypes = {};

export default BackArrow;
