import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddAdmin.module.scss";
import CustomInput from "../../../CustomInput";
import http from "../../../../api/http";
import Toast from "../../profile/toast/Toast";
import { Link } from "react-router-dom";
import Layout from "../../../Layout";
import { Button } from "@mui/material";
import { useCtx } from "../../../../context";

// changed handleSwap -> closeToast
// by default you want to goback not dashboard...

// replacing setAddError -> setSnackBar. using a text doesn't feel
// to good

const AddAdmin = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setSnackBar } = useCtx();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log("submitting...");

      setIsSubmitting(true);

      const response = await http.post("/auth/create-admin", formData, {
        withCredentials: true
      });

      if (!response.success) throw response;

      console.log("Data sent successfully", response);

      setFormData({});
      handleSuccess();
    } catch (error) {
      console.error("An error occurred:", error.message);
      setSnackBar(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [swap, setSwap] = useState(false);

  const closeToast = () => {
    setSwap(false);
    setIsSuccessModalOpen(false);
  };

  const handleSuccess = () => {
    setSwap(!swap);
    setIsSuccessModalOpen(!isSuccessModalOpen);
  };

  const navigate = useNavigate();

  const handleProceed = () => {
    navigate(-1);
  };

  return (
    <Layout>
      {!swap && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
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
                    label="Username"
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
                    type="password"
                    sx={{ width: "623px", height: "65px" }}
                    onChange={handleInputChange}
                  />

                  {/*updated the button comp because i needed to style
                button on disabled... which the normal css for me would
                be... if you can style it with normal css you can 
                change it if you like..
                */}

                  {/* <button type="submit" className={styles.btn}>
                  Add Admin
                </button> */}

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    style={{
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      width: "623px",
                      padding: "16px"
                    }}
                  >
                    Add Admin
                  </Button>
                </div>
              </form>
              <Link to="/manageAdmin/ManageAdmin">
                <span id={styles.click}>Click here to Manage Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
      {isSuccessModalOpen && (
        <Toast
          message={`${formData.username} has been added as admin at Caltex`}
          btnText="Go back"
          closeModal={closeToast}
          Styles={styles.success_btn}
        />
      )}
    </Layout>
  );
};

export default AddAdmin;
