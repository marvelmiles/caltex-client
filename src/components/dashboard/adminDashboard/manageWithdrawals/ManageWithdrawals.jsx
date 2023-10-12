import React from "react";
import searchIcon from "../../../../svgs/search-icon.svg";
import styles from "./ManageWithdrawals.module.scss";
import useAuth from "../../../../hooks/useAuth";
import WithdrawalTable from "./withdrawalTable/WithdrawalTable";
import Layout from "../../../Layout";

const ManageWithdrawals = () => {
  const { currentUser } = useAuth();

  const { firstname, username } = currentUser;
  return (
    <Layout>
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
    </Layout>
  );
};

export default ManageWithdrawals;
