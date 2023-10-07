import React from "react";
import Sidebar from "../../Sidebar";
import DashboardNav from "../../DashboardNav";
import searchIcon from "../../../../svgs/search-icon.svg";
import styles from "./ManageWithdrawals.module.scss";
import useAuth from "../../../../hooks/useAuth";
import WithdrawalTable from "./withdrawalTable/WithdrawalTable";

const ManageWithdrawals = () => {
  const { currentUser } = useAuth();

  const { firstname, username } = currentUser;
  return (
    <div>
      <div class="dashboard-container">
        <div class="board">
          <Sidebar />
          <div class="dashboard-content">
            <div class="board-content">
              <DashboardNav />
              <div class={styles.main_cont}>
                <ul className={styles.main_ul}>
                  <li>Manage Withdrawals</li>
                  <li>
                    <span>
                      <img src={searchIcon} height={20} width={20} alt="icon" />
                    </span>
                    <span>{firstname},</span>
                    <span>{username}</span>
                  </li>
                </ul>
                <WithdrawalTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageWithdrawals;
