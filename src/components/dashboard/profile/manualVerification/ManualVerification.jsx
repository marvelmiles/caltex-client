import { useRef, useState } from "react";
import idIcon from "../../../../svgs/id-verify.svg";
import styles from "./ManualVerification.module.scss";
import VerificationNotice from "./VerificationNotice";
import http from "../../../../api/http";
import useAuth from "../../../../hooks/useAuth";
import { useCtx } from "../../../../context";
import BackArrow from "../../backArrow/BackArrow";

const checkboxData = [
  { label: "National Identity Card", value: "nin" },
  { label: "Passport Number", value: "passport" },
  { label: "Driving License", value: "driverLicense" },
];

const ManualVerification = () => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileValue, setFileValue] = useState("");
  const [fileValue2, setFileValue2] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile2, setUploadedFile2] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const { setSnackBar } = useCtx();

  const formRef = useRef();

  const {
    currentUser: { id: cid },
  } = useAuth();

  const handleCheckboxChange = (value) => {
    setSelectedOption(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const m = {
      message: "Uploading file. Please wait!",
      severity: "info",
    };

    if (uploading) {
      setSnackBar(m);
      return;
    }

    if (uploadedFile && uploadedFile2 && selectedOption) {
      const formData = new FormData();
      formData.append(selectedOption + "-front", uploadedFile);
      formData.append(selectedOption + "-back", uploadedFile2);

      setUploading(true);
      setSnackBar(m);

      try {
        const queryParams = `fields=${selectedOption}-front ${selectedOption}-back`;

        const res = await http.put(`/users/${cid}?${queryParams}`, formData, {
          withCredentials: true,
        });
        if (res.status === 200) {
          console.log("Successfully Uploaded!");
          formRef.current.reset();
          setFileValue("");
          setFileValue2("");
          setUploadedFile(null);
          setUploadedFile2(null);
          setSelectedOption("");

          setSuccess(true);
        }
      } catch (error) {
        console.log("Upload Failed!", error);
      } finally {
        setUploading(false);
      }
    } else {
      setSnackBar(
        "Add front and back of your document and select a document type!"
      );
    }
  };

  return (
    <div className={styles.main_cont}>
      <BackArrow />
      <span id={styles.header}>ID VERIFICATION</span>
      <div className={styles.id_ul_main_cont}>
        <ul className={styles.id_ul}>
          <li>
            <img src={idIcon} height={32} width={32} alt="id icon" />
          </li>
          <li>Manual Verification</li>
        </ul>
        <hr />
        <form ref={formRef} action="" onSubmit={handleSubmit}>
          <div className={styles.card_cont}>
            <div>
              <ul>
                <li>Upload a clear copy of the following documents.</li>
                {checkboxData.map((checkbox, index) => (
                  <div key={index} className={styles.check_box_cont}>
                    <label htmlFor={checkbox.value} className={styles.checkbox}>
                      <input
                        readOnly={uploading}
                        id={checkbox.value}
                        type="checkbox"
                        onChange={() => handleCheckboxChange(checkbox.value)}
                        checked={selectedOption === checkbox.value}
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                    <p id={styles.p_label}>{checkbox.label}</p>
                  </div>
                ))}
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
                  readOnly={uploading}
                  className={styles.hidden_file_input}
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png, .gif, .pdf"
                />
                <span>{fileValue}</span>
              </ul>
            </div>
            <div className={styles.second_div}>
              <ul>
                <li id={styles.file_view}>Back View of your document</li>
                <label
                  htmlFor="upload_file2"
                  className={styles.custom_file_input}
                >
                  <span id={styles.input_label} className={styles.label2}>
                    Choose file
                  </span>
                  <span id={styles.browse}>Browse</span>
                </label>
                <input
                  readOnly={uploading}
                  type="file"
                  id="upload_file2"
                  className={styles.hidden_file_input}
                  onChange={handleFileChange2}
                  accept=".jpg, .jpeg, .png, .gif, .pdf"
                />
                <span>{fileValue2}</span>
                <button type="submit" disabled={uploading}>
                  Upload
                </button>
              </ul>
            </div>
          </div>
        </form>
        <hr />
      </div>
      {success && <VerificationNotice />}
    </div>
  );
};

export default ManualVerification;
