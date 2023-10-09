import React from 'react';
import useAuth from "../../../../../hooks/useAuth";
import AdminTable from "./adminTable/AdminTable";
import searchIcon from "../../../../../svgs/search-icon.svg";
import styles from "./ManageAdmin.module.scss";
import Sidebar from '../../../Sidebar';
import DashboardNav from '../../../DashboardNav';

const ManageAdmin = () => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAdmin;
