import React, { useState } from "react";
import idIcon from "../../../../svgs/id-verify.svg";
import errorIcon from "../../../../svgs/error.svg";
import successIcon from "../../../../svgs/success.svg";
import styles from "./ElectronicVerification.module.scss";
import { useNavigate } from "react-router-dom";

import Toast from "../toast/Toast";
import http from "../../../../api/http";

const checkboxData = [
  { label: "National Identity Card", value: " nationalId" },
  { label: "Passport Number", value: "passport" },
  { label: "Driving License", value: "driverLicense" },
];

const ElectronicVerification = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [notice, setNotice] = useState({ success: false, fail: false });

  const handleCheckboxChange = (value) => {
    setSelectedOption(value);
  };
  
  const [numberValue, setNumberValue] = useState("");

  const handleNumberChange = (event) => {
    setNumberValue(event.target.value);
  };
  const [swap, setSwap] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you want to upload the number when the button is clicked.
    try {
      const res = await http.post(
        "https://caltex-api.onrender.com/api/users/verify",
        {
          documentType: selectedOption,
          documentNumber: numberValue,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setResponseMessage(res.message); // Handle the API response here
        setNotice((prevState) => ({ ...prevState, success: true }));
        handleSuccess();
      }
    } catch (error) {
      console.error("Error:", error);
      setNotice((prevState) => ({ ...prevState, fail: true }));
      setSwap(!swap);
    }
  };

  const handleSuccess = () => {
    setSwap(!swap);
  };

  const handleRetry = () => {
    setNotice(false);
    setSwap(!swap);
  };

  const navigate = useNavigate();

  const handleProceed = () => {
    setSwap(!swap);
    navigate("/u/dashboard");
  };

  const message = "Electronic verification has not been successful";
  const message2 = "Congratulation, your verification was approved";

  const btnText = "Retry Verification";
  const btnText2 = "Proceed";

  const { success, fail } = notice;
  return (
    <>
      {!swap && (
        <div className={styles.main_cont}>
          <span id={styles.header}>ID VERIFICATION</span>
          <div className={styles.id_ul_main_cont}>
            <ul className={styles.id_ul}>
              <li>
                <img src={idIcon} height={32} width={32} alt="id icon" />
              </li>
              <li>Electronic Verification</li>
            </ul>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className={styles.card_cont}>
                <div>
                  <ul>
                    <li>Select the ID Document Type:</li>
                    {checkboxData.map((checkbox, index) => (
                      <div key={index} className={styles.check_box_cont}>
                        <label
                          htmlFor={checkbox.value}
                          className={styles.checkbox}
                        >
                          <input
                            id={checkbox.value}
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange(checkbox.value)
                            }
                            checked={selectedOption === checkbox.value}
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                        <p id={styles.p_label}>{checkbox.label}</p>
                      </div>
                    ))}
                    <li id={styles.selected}>
                      {
                        checkboxData.find(
                          (item) => item.value === selectedOption
                        )?.label
                      }
                    </li>

                    <input
                      id={styles.input}
                      type="text"
                      value={numberValue}
                      onChange={handleNumberChange}
                    />
                    <button type="submit">Add Number</button>
                  </ul>
                </div>
              </div>
            </form>
            <p>{responseMessage}</p>
            <p id={styles.last_text}>
              Please ensure you add a correct ID number
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className={styles.main_cont}>
          <span id={styles.header}>ID VERIFICATION</span>
          <div className={styles.id_ul_main_cont}>
            <ul className={styles.id_ul}>
              <li>
                <img src={idIcon} height={32} width={32} alt="id icon" />
              </li>
              <li>Electronic Verification</li>
            </ul>
            <hr />
            <Toast
              header="Electronic ID check"
              icon={successIcon}
              message={message2}
              btnText={btnText2}
              Styles={styles.toastBtn}
              closeModal={handleProceed}
            />
          </div>
        </div>
      )}
      {fail && (
        <div className={styles.main_cont}>
          <span id={styles.header}>ID VERIFICATION</span>
          <div className={styles.id_ul_main_cont}>
            <ul className={styles.id_ul}>
              <li>
                <img src={idIcon} height={32} width={32} alt="id icon" />
              </li>
              <li>Electronic Verification</li>
            </ul>
            <hr />
            <Toast
              header="Electronic ID check"
              icon={errorIcon}
              message={message}
              btnText={btnText}
              Styles={styles.toastBtn}
              closeModal={handleRetry}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ElectronicVerification;
