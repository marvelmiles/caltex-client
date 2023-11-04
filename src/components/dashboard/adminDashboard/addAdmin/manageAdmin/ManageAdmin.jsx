import React from "react";
import AdminTable from "./adminTable/AdminTable";
import styles from "./ManageAdmin.module.scss";
import Layout from "../../../../Layout";
import SearchInput from "../../../../SearchInput";
import BackArrow from "../../../backArrow/BackArrow";

const ManageAdmin = () => {
  return (
    <Layout>
      <div class={styles.main_cont}>
        <BackArrow />
        <ul className={styles.main_ul}>
          <li>Manage Admins</li>
          <SearchInput />
        </ul>
        <AdminTable />
      </div>
    </Layout>
  );
};

export default ManageAdmin;
