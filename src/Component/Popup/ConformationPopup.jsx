import React from "react";
import styles from "../../Styles/ConformationPopup.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useAlert } from "../../Context/AlertContext";
import { deletePartner } from "../../api/partners/getPartners";
import { useData } from "../../Context/DataProvider";
import { deleteCategory } from "../../api/category/category";
import { useNavigate } from "react-router-dom";

const ConformationPopup = ({
  icon,
  text,
  onClose,
  leftBtn,
  rightBtn,
  restaurantId,
  route,
  categoryData,
}) => {
  const {showAlert } = useAlert();
  const {handleGetAllPartnersData, handleGetAllCategoryData} = useData();
  const navigate = useNavigate();


  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalBackdrop)) {
      onClose();
    }
  };

  const handleDelete = async () => {
    if(route === "category") {  
      try {
        const response = await deleteCategory(categoryData?.id);
        console.log('response', response);
        if (response.status === 200) {
          showAlert("success", response.data.message);
          handleGetAllCategoryData();
        } else {
          showAlert("error", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        onClose();
      }
    }else if((route === "partners" || route == "partners/view")) {
      try {
        const response = await deletePartner(restaurantId?.id);
        if (response.status === 200) {
          showAlert("success", response.data.message);
          handleGetAllPartnersData();
          if(route == "partners/view") {
            navigate("/partners");
          }
        } else {
          showAlert("error", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting partner:", error);
      } finally {
        onClose();
      }
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
