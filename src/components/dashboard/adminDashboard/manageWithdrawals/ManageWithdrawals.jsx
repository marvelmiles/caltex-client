import React from "react";
import styles from "./ManageWithdrawals.module.scss";
import WithdrawalTable from "./withdrawalTable/WithdrawalTable";
import Layout from "../../../Layout";
import SearchInput from "../../../SearchInput";
import BackArrow from "../../backArrow/BackArrow";

const ManageWithdrawals = () => {
  return (
    <Layout>
      <div class={styles.main_cont}>
        <BackArrow />
        <ul className={styles.main_ul}>
          <li>Manage Withdrawals</li>
          <SearchInput />
        </ul>
        <WithdrawalTable />
      </div>
    </Layout>
  );
};

export default ManageWithdrawals;
