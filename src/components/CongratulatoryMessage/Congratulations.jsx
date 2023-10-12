import React from "react";
import "./Congratulations.css";
import { Link } from "react-router-dom";
import Layout from "../Layout";

const Congratulations = () => {
  return (
    <Layout>
      <div className="centerCongratMsg">
        <div className="centerCongratM">
          <div className="theMessage">
            <div className="theMsg">
              <p>
                Congratulations, your account has been funded successfully,
                <br></br>
                please kindly wait for system confirmation
              </p>
              <Link to="/investment/Investment" class="check-bal">
                Check Balance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Congratulations;
