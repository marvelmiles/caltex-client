import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import DashboardNav from "../DashboardNav";
import styles from "./Profile.module.scss";
import CustomInput from "../../../components/CustomInput";
import IdVerificationMethod from "./idVerificationMethod/IdVerificationMethod";
import Toast from "./toast/Toast";
import http from "../../../api/http";
import useAuth from "../../../hooks/useAuth";
import user from "../../../svgs/user2.svg";

const Profile = () => {
  const { currentUser } = useAuth();

  const { firstname, lastname } = currentUser;

  const [fileValue, setFileValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstname,
    lastname,
    address: "",
    address2: "",
    zipCode: "",
    country: "",
    uploadedFile: null, // Initialize it as null
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      uploadedFile,
    }));
  }, [uploadedFile]);


  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { id } = currentUser;

  const apiEndpoint = `https://caltex-api.onrender.com/api/users/${id}`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileValue(file.name);
      setUploadedFile(file);
    } else {
      setFileValue("");
      setUploadedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.put(apiEndpoint, formData, {
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
  const [swap1, setSwap1] = useState(false);

  const handleSwap = () => {
    setSwap(swap);
    setSwap1(!swap1);
    setIsSuccessModalOpen(false);
  };

  const handleSuccess = () => {
    setSwap(!swap);
    setIsSuccessModalOpen(!isSuccessModalOpen);
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="board">
          <Sidebar />
          <div className="dashboard-content">
            <div className="board-content">
              <DashboardNav />

              {!swap && (
                <div className={`ct ${styles.main_cont}`} id="ct">
                  <div className={styles.personal_cont}>
                    <p>Investor Profile and information</p>
                  </div>
                  <form action="" onSubmit={handleSubmit}>
                    <div className={styles.personal_info_cont}>
                      <div className={styles.profile_cont}>
                        <ul>
                          <li>Profile Picture</li>
                          <li>
                            <span>
                              <img
                                src={user}
                                height={32}
                                width={32}
                                alt="user"
                              />
                            </span>
                            <span id={styles.up_span}>Upload Profile Picture</span>
                          </li>
                          <li>
                            <label
                              htmlFor="upload_file"
                              className={styles.custom_file_input}
                            >
                              <span id={styles.input_label}>Choose file</span>
                            {fileValue ? fileValue : "No file chosen"}
                            </label>
                            <input
                              type="file"
                              id="upload_file"
                              name={fileValue}
                              className={styles.hidden_file_input}
                              onChange={handleFileChange}
                              accept=".jpg, .jpeg, .png, .gif, .pdf"
                            />
                          </li>
                          
                          <li>
                            <button type="submit">Upload</button>
                          </li>
                        </ul>
                      </div>
                      <span>Personal Information</span>
                      <div className={styles.input_cont}>
                        <div>
                          <CustomInput
                            label="First Name"
                            name="firstname"
                            type="text"
                            sx={{ width: "430px", height: "50px" }}
                            defaultValue={firstname}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <CustomInput
                            label="lastname"
                            name="lastname"
                            type="text"
                            sx={{ width: "430px", height: "50px" }}
                            defaultValue={lastname}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className={styles.input_cont}>
                        <div>
                          {" "}
                          <CustomInput
                            label="Address Line 1:"
                            name="address"
                            type="text"
                            sx={{ width: "430px", height: "50px" }}
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <CustomInput
                            label="Address Line 2:"
                            name="address2"
                            type="text"
                            sx={{ width: "430px", height: "50px" }}
                            value={formData.address2}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className={styles.input_cont}>
                        <div>
                          <CustomInput
                            label="Postal Code/Zip code:"
                            name="zipCode"
                            type="text"
                            sx={{ width: "430px", height: "50px" }}
                            value={formData.zipCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          {" "}
                          <CustomInput
                            label="Country Of Residence"
                            name="country"
                            type="text"
                            sx={{ width: "430px", height: "50px" }}
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className={styles.btn}>
                      Save
                    </button>
                  </form>
                </div>
              )}
              {isSuccessModalOpen && (
                <Toast
                  message="Congratulations, your profile has been saved"
                  btnText="Proceed to KYC"
                  closeModal={handleSwap}
                />
              )}
              {swap1 && <IdVerificationMethod />}
              {apiError && <p className={styles.errorMessage}>{apiError}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
