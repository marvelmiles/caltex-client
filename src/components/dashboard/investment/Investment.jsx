import React, { useState } from "react";
import styles from "./Investment.module.scss";
import Sidebar from "../Sidebar";
import arrow from "../../../svgs/arrow-drop.svg";
import DashboardNav from "../DashboardNav";
import FixedHeaderTable from "./investmentTable/Table";
import HistoryTable from "./historyTable/HistoryTable";

const Investment = () => {
  const [trans, setTrans] = useState(false);
  const [trans1, setTrans1] = useState(false);
  const [trans2, setTrans2] = useState(false);
  return (
    <div>
      <div class="dashboard-container">
        <div class="board">
          <Sidebar />
          <div class="dashboard-content">
            <div class="board-content">
              <DashboardNav />
              <div class={styles.main_cont}>
                <p id={styles.p_text}>My Investment</p>
                <FixedHeaderTable />

                <p id={styles.p_note}>
                  Note: Your Return on Investment and capital will be added
                  automatically to your dashboard balance once your investment
                  is matured
                </p>
                <div className={styles.trans_history_main}>
                  <h2>Transaction History</h2>
                  <ul className={styles.date_cont}>
                    <input type="date" className={styles.date_input} />

                    <li onClick={() => setTrans(!trans)}>
                      <span>All transaction type</span>
                      <span>
                        <img src={arrow} height={10} width={10} alt="arrow" />
                      </span>
                    </li>
                    <li onClick={() => setTrans1(!trans1)}>
                      <span>All status</span>
                      <span>
                        <img src={arrow} height={10} width={10} alt="arrow" />
                      </span>
                    </li>
                    <li onClick={() => setTrans2(!trans2)}>
                      <span>All accounts</span>
                      <span>
                        <img src={arrow} height={10} width={10} alt="arrow" />
                      </span>
                    </li>
                  </ul>
                  {trans && (
                    <ul
                      className={styles.tans_ul}
                      onMouseLeave={() => setTrans(!trans)}
                    >
                      <li>All transaction</li>
                      <li>Deposit</li>
                      <li>Withdrawal</li>
                    </ul>
                  )}
                  {trans1 && (
                    <ul
                      className={styles.tans_ul}
                      id={styles.tans_ul2}
                      onMouseLeave={() => setTrans1(!trans1)}
                    >
                      <li>All status</li>
                      <li>Processing</li>
                      <li>Approved</li>
                      <li>Rejected</li>
                    </ul>
                  )}
                  {trans2 && (
                    <ul
                      className={styles.tans_ul}
                      id={styles.tans_ul3}
                      onMouseLeave={() => setTrans2(!trans2)}
                    >
                      <li>Account</li>
                      <li>Cryptocurrency</li>
                      <li>Forex</li>
                    </ul>
                  )}
                  <HistoryTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
