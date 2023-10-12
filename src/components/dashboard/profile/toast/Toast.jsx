import React from "react";
import PropsTypes from "prop-types";
import styles from "./Toast.module.scss";

const Toast = props => {
  const { closeModal, header, icon, message, btnText, Styles } = props;
  return (
    <div className={styles.main_cont}>
      <div className={styles.inner_main}>
        <h2>{header}</h2>
        {icon && <img src={icon} height={32} width={32} alt="modal icon" />}
        <p>{message}</p>

        <button type="button" onClick={() => closeModal()} className={Styles}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  header: PropsTypes.string,
  icon: PropsTypes.string,
  message: PropsTypes.string,
  btnText: PropsTypes.string,
  Styles: PropsTypes.string,
  closeModal: PropsTypes.func
};

export default Toast;
