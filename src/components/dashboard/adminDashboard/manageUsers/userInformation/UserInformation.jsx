import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInformation.module.scss";
import Layout from "../../../../Layout";
import { useCtx } from "../../../../../context";
import Redirect from "../../../../Redirect";

const UserInformation = () => {
  const {
    locState: { previewUser = {} }
  } = useCtx();

  const { firstname, lastname, email, phone, address, country } = previewUser;

  const navigate = useNavigate();

  const handleProceed = () => {
    navigate(-1);
  };

  if (!email)
    return (
      <Redirect
        to="/manageUsers/ManageUsers"
        message="Invalid user selection. Access deneied!"
      />
    );

  return (
    <Layout>
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
    </Layout>
  );
};

export default UserInformation;
