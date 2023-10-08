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
                <div className={styles.details_cont}>
                  <ul>
                    <li>
                      <span>Full Name</span>
                      <span>|</span>
                      <span>
                        {" "}
                        {firstname} {lastname}
                      </span>
                    </li>
                    <li>
                      <span>Email address</span>
                      <span>|</span>
                      <span>{email}</span>
                    </li>
                    <li>
                      <span>Mobile Numbers</span>
                      <span>|</span>
                      <span>
                        <ul>
                          {phone.map((phoneNumber, index) => (
                            <li key={index}>{phoneNumber}</li>
                          ))}
                        </ul>
                      </span>
                    </li>
                    <li>
                      <span>Address</span>
                      <span>|</span>
                      <span>
                        <p>{address.street}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.zipCode}</p>
                      </span>
                    </li>
                    <li>
                      <span>Country Of Residence</span>
                      <span>|</span>
                      <span>{country}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
