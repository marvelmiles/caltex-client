import React from "react";
import styles from "./ManageDeposits.module.scss";
import DepositTable from "./depositTable/DepositTable";
import Layout from "../../../Layout";
import SearchInput from "../../../SearchInput";
import BackArrow from "../../backArrow/BackArrow";

const ManageDeposits = () => {
  return (
    <Layout>
      <div class={styles.main_cont}>
        <BackArrow />
        <ul className={styles.main_ul}>
          <li>Manage Deposits</li>
          <SearchInput />
        </ul>
        <DepositTable />
      </div>
    </Layout>
  );
};

export default ManageDeposits;
