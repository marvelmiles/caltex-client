import React, { useState } from 'react';
import idIcon from "../../../../svgs/id-verify.svg";
import check from "../../../../svgs/check-gray.svg";
import styles from './ManualVerification.module.scss';
import VerificationNotice from './VerificationNotice';

const ManualVerification = () => {
  
  const [success, setSuccess] =useState(false);
  const [fileValue, setFileValue] = useState("");
  const [fileValue2, setFileValue2] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile2, setUploadedFile2] = useState(null);

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
   const handleFileChange2 = (event) => {
     const file = event.target.files[0];
     if (file) {
       setFileValue2(file.name);
       setUploadedFile2(file);
     } else {
       setFileValue2("");
       setUploadedFile2(null);
     }
   };

   const handleSubmit = () => {
    if (uploadedFile || uploadedFile2) {
      const formData = new FormData();
      formData.append('file', uploadedFile || uploadedFile2);

      // Replace 'your-api-endpoint' with the actual API endpoint.
      fetch("https://caltex-api.onrender.com/api/users/verify", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle the API response here
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className={styles.main_cont}>
      <span id={styles.header}>ID VERIFICATION</span>
      <div className={styles.id_ul_main_cont}>
        <ul className={styles.id_ul}>
          <li>
            <img src={idIcon} height={32} width={32} alt="id icon" />
          </li>
          <li>Manual Verification</li>
        </ul>
        <hr />
        <form action="" onSubmit={handleSubmit}>
          <div className={styles.card_cont}>
            <div>
              <ul>
                <li>Upload a clear copy Of the following documents.</li>
                <li id={styles.li}>
                  <span>
                    <img src={check} height={10} width={10} alt="check" />
                  </span>
                  <span>National Identity Card</span>
                </li>
                <li id={styles.li}>
                  <span>
                    <img src={check} height={10} width={10} alt="check" />
                  </span>
                  <span>Passport Number</span>
                </li>
                <li id={styles.li}>
                  <span>
                    <img src={check} height={10} width={10} alt="check" />
                  </span>
                  <span>Driving License</span>
                </li>
                <li id={styles.file_view}>Front View of your document</li>
                <label
                  htmlFor="upload_file"
                  className={styles.custom_file_input}
                >
                  <span id={styles.input_label}>Choose file</span>
                  <span id={styles.browse}>Browse</span>
                </label>
                <input
                  type="file"
                  id="upload_file"
                  className={styles.hidden_file_input}
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png, .gif, .pdf"
                />
                <span>{fileValue}</span>
                <button type="button">Upload</button>
              </ul>
            </div>
            <div className={styles.second_div}>
              <ul>
                <li id={styles.file_view}>Back View of your document</li>
                <label
                  htmlFor="upload_file2"
                  className={styles.custom_file_input}
                >
                  <span id={styles.input_label}>Choose file</span>
                  <span id={styles.browse}>Browse</span>
                </label>
                <input
                  type="file"
                  id="upload_file2"
                  className={styles.hidden_file_input}
                  onChange={handleFileChange2}
                  accept=".jpg, .jpeg, .png, .gif, .pdf"
                />
                <span>{fileValue2}</span>
                <button type="submit">Upload</button>
              </ul>
            </div>
          </div>
        </form>
        <hr />
      </div>
      {success && <VerificationNotice />}
    </div>
  );
}

export default ManualVerification;
