import React from "react";
import styles from "../../Styles/ConformationPopup.module.css";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAlert } from "../../Context/AlertContext";
import { deletePartner } from "../../api/partners/getPartners";
import { useData } from "../../Context/DataProvider";

const ConformationPopup = ({
  icon,
  text,
  onClose,
  onConfirm,
  leftBtn,
  rightBtn,
  restaurantId,
}) => {
  const {showAlert } = useAlert();
  const {handleGetAllData} = useData();

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalBackdrop)) {
      onClose();
    }
  };

  const handleDelete = async () => {
    if (!restaurantId || !restaurantId.id) { 
      console.error("Invalid restaurantId", restaurantId);
      return;
    }
  
    const response = await deletePartner(restaurantId.id);
  
    if (response.status === 200) {
      showAlert("success", response.message);
      await handleGetAllData();
      onClose();
    } else {
      showAlert("error", response.message || 'Restaurant not found');
      console.error("Failed to delete restaurant");
      onClose();
    }
  };
  
  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <div className={styles.iconWrapper}>
            {React.cloneElement(icon, { className: styles.deleteIcon })}
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <AiOutlineClose />
          </button>
          <p className={styles.modalText}>{text}</p>
          <div className={styles.buttonGroup}>
           {leftBtn && <button className={styles.closeBtn} onClick={onClose}>
              Close
            </button>}
            {rightBtn && <button className={styles.confirmBtn} onClick={handleDelete}>
              Save Changes
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformationPopup;
