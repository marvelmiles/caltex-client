import React, { useState } from "react";
import idIcon from "../../../../svgs/id-verify.svg";
import check from "../../../../svgs/check-gray.svg";
import styles from "./IdVerificationMethod.module.scss";
import ManualVerification from "../manualVerification/ManualVerification";
import ElectronicVerification from "../electronicVerification/ElectronicVerification";
import BackArrow from "../../backArrow/BackArrow";
// import Layout from "../../../Layout";

const IdVerificationMethod = () => {
  const [swap, setSwap] = useState(false);
  const [swap1, setSwap1] = useState(false);
  const [swap2, setSwap2] = useState(false);

  const handleManualVerification = () => {
    setSwap(!swap);
    setSwap1(!swap1);
  };
  const handleElectronicVerification = () => {
    setSwap(!swap);
    setSwap2(!swap2);
  };
  return (
    <>
      {!swap && (
        <div className={styles.main_cont}>
          <BackArrow />
          <span id={styles.header}>ID VERIFICATION</span>
          <div className={styles.id_ul_main_cont}>
            <ul className={styles.id_ul}>
              <li>
                <img src={idIcon} height={32} width={32} alt="id icon" />
              </li>
              <li>Select Verification Method</li>
            </ul>
            <hr />
            <div className={styles.card_cont}>
              <div>
                <ul>
                  <li>Electronic Verification</li>
                  <li>Provide the ID number of any one of the following</li>
                  <li>
                    <span>
                      <img src={check} height={10} width={10} alt="check" />
                    </span>
                    <span>National Identity Card</span>
                  </li>
                  <li>
                    <span>
                      <img src={check} height={10} width={10} alt="check" />
                    </span>
                    <span>Passport Number</span>
                  </li>
                  <li>
                    <span>
                      <img src={check} height={10} width={10} alt="check" />
                    </span>
                    <span>Driving License</span>
                  </li>
                  <button type="button" onClick={handleElectronicVerification}>
                    Add Number
                  </button>
                </ul>
              </div>
              <div>
                <ul>
                  <li>Manual Verification</li>
                  <li>Upload One Of the following documents</li>
                  <li>
                    <span>
                      <img src={check} height={10} width={10} alt="check" />
                    </span>
                    <span>National Identity Card</span>
                  </li>
                  <li>
                    <span>
                      <img src={check} height={10} width={10} alt="check" />
                    </span>
                    <span>Passport Number</span>
                  </li>
                  <li>
                    <span>
                      <img src={check} height={10} width={10} alt="check" />
                    </span>
                    <span>Driving License</span>
                  </li>
                  <button type="button" onClick={handleManualVerification}>
                    Upload
                  </button>
                </ul>
              </div>
            </div>
            <hr />
          </div>
        </div>
      )}
      {swap1 && <ManualVerification />}
      {swap2 && <ElectronicVerification />}
    </>
  );
};

export default IdVerificationMethod;
