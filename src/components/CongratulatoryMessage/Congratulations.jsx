import React from "react";
import { useEffect, useState } from "react";
import "./Congratulations.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Sidebar from "../dashboard/Sidebar";
import { useCtx } from "../../context";
import http from "../../api/http";
import DashboardNav from "../dashboard/DashboardNav";

const Congratulations = () => {
  return (
    <div>
    <div class="dashboard-container">
      <div class="board">
        <Sidebar />
        <div class="dashboard-content">
          <div class="board-content">
            <DashboardNav />

            <div className="centerCongratMsg">
                <div className="centerCongratM">
                 <div className="theMessage">
                     <div className="theMsg">
                        <p>
                        Congratulations, your account has been funded successfully,
                        <br></br>
                        please kindly wait for system confirmation
                        </p>
                        <Link to ="/investment/Investment" class="check-bal">
                        Check Balance
                       </Link>
                </div>
            </div>
        </div>
    </div>

    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Congratulations

