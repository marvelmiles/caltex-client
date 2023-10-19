import React from "react";
import styles from "./ManageUsers.module.scss";
import UserTable from "./userTable/UserTable";
import Layout from "../../../Layout";
import SearchInput from "../../../SearchInput";

const ManageUsers = () => {
  return (
    <Layout>
      <div class={styles.main_cont}>
        <ul className={styles.main_ul}>
          <li>Manage Users</li>
          <SearchInput />
        </ul>
        <UserTable />
      </div>
    </Layout>
  );
};

export default ManageUsers;
