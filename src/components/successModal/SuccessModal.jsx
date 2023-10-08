import React from 'react';
import PropsTypes from "prop-types";
import styles from './SuccessModal.module.scss';

const SuccessModal = (props) => {

 const { closeModal,
  icon,
  message,
  btnText,
  Styles, } = props;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <img src={icon} height={800} width={800} alt="modal icon" />
        <p>{message}</p>

        <button type="button" onClick={() => closeModal()} className={Styles}>
          {btnText}
        </button>
      </div>
    </div>
  )
}

SuccessModal.propTypes = {
  icon: PropsTypes.string,
  message: PropsTypes.string,
  btnText: PropsTypes.string,
  Styles: PropsTypes.string,
};

export default SuccessModal;

