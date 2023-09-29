import React from "react";
import warning from "../../../../svgs/warning.svg";
import styles from './ManualVerification.module.scss';

const VerificationNotice = () => {
  return (
    <div className={styles.verify_notice_main_cont}>
      <ul>
        <li>
          <img src={warning} width={30} height={28.003} alt="warning" />
        </li>
        <li>
          <span>Verification on Pending</span>
          <span>
            Please kindly note that your document has been received and our team
            are currently reviewing your document, we will notify you shortly
            concerning your verification.
          </span>
        </li>
      </ul>
    </div>
  );
};

export default VerificationNotice;
