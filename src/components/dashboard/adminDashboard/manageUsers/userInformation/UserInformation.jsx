import React from "react";
import Sidebar from "../../../Sidebar";
import DashboardNav from "../../../DashboardNav";
import useAuth from "../../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./UserInformation.module.scss";

const UserInformation = () => {
  const { currentUser } = useAuth();

  const {firstname, lastname, email, phone, address, country, } = currentUser;

  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/manageUsers/ManageUsers");
  };

  return (
    <div>
      <div class="dashboard-container">
        <div class="board">
          <Sidebar />
          <div class="dashboard-content">
            <div class="board-content">
              <DashboardNav />
              <div class={styles.main_cont}>
                <span id={styles.header_text}>{firstname}</span>
                <ul className={styles.ul}>
                  <li>USER INFORMATION</li>
                  <li onClick={handleProceed}>Go Back</li>
                </ul>
                <table>
                  <tr>
                    <td id={styles.table_d}>Full Name</td>
                    <td id={styles.table_d}>
                      {firstname} {lastname}
                    </td>
                  </tr>
                  <tr>
                    <td id={styles.table_d}>Email address </td>
                    <td id={styles.table_d}>{email}</td>
                  </tr>
                  <tr>
                    <td id={styles.table_d}>Mobile Numbers</td>
                    <td id={styles.table_d}>
                      <ul>
                        {phone.map((phoneNumber, index) => (
                          <li key={index}>{phoneNumber}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td id={styles.table_d}>Address</td>
                    <td id={styles.table_d}>
                      <p>{address.street}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.zipCode}</p>
                    </td>
                  </tr>
                  <tr>
                    <td id={styles.table_d}>Country Of Residence </td>
                    <td id={styles.table_d}>{country}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
