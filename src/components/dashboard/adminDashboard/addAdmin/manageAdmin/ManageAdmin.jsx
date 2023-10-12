import React from "react";
import useAuth from "../../../../../hooks/useAuth";
import AdminTable from "./adminTable/AdminTable";
import searchIcon from "../../../../../svgs/search-icon.svg";
import styles from "./ManageAdmin.module.scss";
import Layout from "../../../../Layout";

const ManageAdmin = () => {
  const { currentUser } = useAuth();

  const { firstname, username } = currentUser;
  return (
    <Layout>
      <div class={styles.main_cont}>
        <ul className={styles.main_ul}>
          <li>Manage Admins</li>
          <li>
            <span>
              <img src={searchIcon} height={20} width={20} alt="icon" />
            </span>
            <span>{firstname},</span>
            <span>{username}</span>
          </li>
        </ul>
        <AdminTable />
      </div>
    </Layout>
  );
};

export default ManageAdmin;
