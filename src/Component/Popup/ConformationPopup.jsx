import React from "react";
import styles from "../../Styles/ConformationPopup.module.css";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const ConformationPopup = ({
  icon,
  text,
  onClose,
  onConfirm,
  leftBtn,
  rightBtn,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalBackdrop)) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <div className={styles.iconWrapper}>
            <MdDelete className={styles.deleteIcon} />
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <AiOutlineClose />
          </button>
          <p className={styles.modalText}>You are about to delete a Partner</p>
          <div className={styles.buttonGroup}>
            <button className={styles.closeBtn} onClick={onClose}>
              Close
            </button>
            <button className={styles.confirmBtn} onClick={onConfirm}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformationPopup;
