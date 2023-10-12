import React from "react";
import searchIcon from "../../../../svgs/search-icon.svg";
import styles from "./ManageDeposits.module.scss";
import useAuth from "../../../../hooks/useAuth";
import DepositTable from "./depositTable/DepositTable";
import Layout from "../../../Layout";

const ManageDeposits = () => {
  const { currentUser } = useAuth();

  const { firstname, username } = currentUser;
  return (
    <Layout>
      <div class={styles.main_cont}>
        <ul className={styles.main_ul}>
          <li>Manage Deposits</li>
          <li>
            <span>
              <img src={searchIcon} height={20} width={20} alt="icon" />
            </span>
            <span>{firstname},</span>
            <span>{username}</span>
          </li>
        </ul>
        <DepositTable />
      </div>
    </Layout>
  );
};

export default ManageDeposits;
