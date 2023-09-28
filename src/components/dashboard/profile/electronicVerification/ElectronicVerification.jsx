import React, { useState } from "react";
import idIcon from "../../../../svgs/id-verify.svg";
import errorIcon from "../../../../svgs/error.svg";
import successIcon from "../../../../svgs/success.svg";
import styles from "./ElectronicVerification.module.scss";
import Toast from "../toast/Toast";

const checkboxData = [
  { label: "National Identity Card", value: " nationalId" },
  { label: "Passport Number", value: "passport Number" },
  { label: "Driving License", value: "driverLicense" },
];

const ElectronicVerification = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCheckboxChange = (value) => {
    setSelectedOption(value);
  };
  const [numberValue, setNumberValue] = useState("");

  const handleNumberChange = (event) => {
    setNumberValue(event.target.value);
  };

  const [success, setSuccess] = useState(false);
  const [swap, setSwap] = useState(false);
console.log(numberValue);
  const handleSubmit = () => {
    // Assuming you want to upload the number when the button is clicked.
    fetch("https://caltex-api.onrender.com/api/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({"documentType": "passport", "documentNumber": "AB123456"}),
      body: JSON.stringify({"documentType": selectedOption, "documentNumber": numberValue}),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message); // Handle the API response here
        handleSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSuccess = () => {
    setSuccess(!success);
    setSwap(!swap);
  }

  const handleRetry = () => {
    setSuccess(!success);
    setSwap(!swap);
  }

  const message = "Electronic verification has not been successful";
  const message2 = "Congratulation, your verification was approved";

  const btnText = "Retry Verification";
  const btnText2 = "Proceed";



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
            <form action="" onSubmit={handleSubmit}>
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
                    <li id={styles.selected}>{selectedOption}</li>
                    <input
                      id={styles.input}
                      type="text"
                      value={numberValue}
                      onChange={handleNumberChange}
                    />
                    <button type="submit" 
                    // onClick={handleSuccess}
                    >
                      Add Number
                    </button>
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
          icon={success ? successIcon : errorIcon}
          message={success ? message2 : message}
          btnText={success ? btnText2 : btnText}
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
