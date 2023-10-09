import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import DashboardNav from "../../DashboardNav";
import { useNavigate } from "react-router-dom";
import styles from "./AddAdmin.module.scss";
import CustomInput from "../../../CustomInput";
import http from "../../../../api/http";
import Toast from "../../profile/toast/Toast";
import { Link } from "react-router-dom";

const AddAdmin = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [apiError, setApiError] = useState(null);

  const apiEndpoint = "https://caltex-api.onrender.com/api/auth/create-admin";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post(apiEndpoint, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Data sent successfully", response);
        handleSuccess();
      } else {
        const errorMessage = await response.text();
        console.error("Error sending data to the API:", errorMessage);
        setApiError(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      setApiError("An error occurred. Please try again later.");
    }
  };

  const [swap, setSwap] = useState(false);

  const handleSwap = () => {
    navigate("/u/dashboard");
  };

  const handleSuccess = () => {
    setSwap(!swap);
    setIsSuccessModalOpen(!isSuccessModalOpen);
  };

  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/u/dashboard");
  };

  return (
    <div>
      <div class="dashboard-container">
        <div class="board">
          <Sidebar />
          <div class="dashboard-content">
            <div class="board-content">
              <DashboardNav />
              {!swap && (
                <div class={styles.main_cont}>
                  <ul className={styles.ul}>
                    <li>
                      <span>Add Admin</span>
                      <span>Allow multiple admin to manage users!</span>
                    </li>
                    <li onClick={handleProceed}>Go Back</li>
                  </ul>
                  <div className={styles.form_div}>
                    <form action="" onSubmit={handleSubmit}>
                      <div className={styles.custom_input_cont}>
                        <CustomInput
                          label="Full Name"
                          name="username"
                          type="text"
                          sx={{ width: "623px", height: "65px" }}
                          onChange={handleInputChange}
                        />
                        <CustomInput
                          label="Email Address"
                          name="email"
                          type="text"
                          sx={{ width: "623px", height: "65px" }}
                          onChange={handleInputChange}
                        />
                        <CustomInput
                          label="Password"
                          name="password"
                          type="password"
                          sx={{ width: "623px", height: "65px" }}
                          onChange={handleInputChange}
                        />
                        <CustomInput
                          label="Confirm Password"
                          name="confirmPassword"
                          type="text"
                          sx={{ width: "623px", height: "65px" }}
                          onChange={handleInputChange}
                        />
                        <button type="submit" className={styles.btn}>
                          Add Admin
                        </button>
                      </div>
                    </form>
                    <Link to="/manageAdmin/ManageAdmin">
                      <span id={styles.click}>Click here to Manage Admin</span>
                    </Link>
                  </div>
                </div>
              )}
              {isSuccessModalOpen && (
                <Toast
                  message={`${formData.username} has been added as admin at Caltex`}
                  btnText="Go back"
                  closeModal={handleSwap}
                  Styles={styles.success_btn}
                />
              )}
              {apiError && <p className={styles.errorMessage}>{apiError}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
