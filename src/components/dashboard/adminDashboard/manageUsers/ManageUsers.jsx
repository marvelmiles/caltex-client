import React from "react";
import searchIcon from "../../../../svgs/search-icon.svg";
import styles from "./ManageUsers.module.scss";
import useAuth from "../../../../hooks/useAuth";
import UserTable from "./userTable/UserTable";
import Layout from "../../../Layout";

const ManageUsers = () => {
  const { currentUser } = useAuth();

  const { firstname, username } = currentUser;

  return (
    <Layout>
      <div class={styles.main_cont}>
        <ul className={styles.main_ul}>
          <li>Manage Users</li>
          <li>
            <span>
              <img src={searchIcon} height={20} width={20} alt="icon" />
            </span>
            <span>{firstname},</span>
            <span>{username}</span>
          </li>
        </ul>
        <UserTable />
      </div>
    </Layout>
  );
};

export default ManageUsers;
