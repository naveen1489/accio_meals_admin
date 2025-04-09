import React from "react";
import styles from "../../Styles/ConformationPopup.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useAlert } from "../../Context/AlertContext";
import { deletePartner } from "../../api/partners/getPartners";
import { useData } from "../../Context/DataProvider";
import { deleteCategory } from "../../api/category/category";

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

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalBackdrop)) {
      onClose();
    }
  };

  // const handleDelete = async () => {
  //   console.log(categoryData?.id, restaurantId?.id, route);
  //   try {
  //     const config = {
  //       category: {
  //         deleteFunction: deleteCategory,
  //         id: categoryData?.id,
  //         errorMessage: "Failed to delete category",
  //         refreshData: handleGetAllCategoryData
  //       },
  //       partner: {
  //         deleteFunction: deletePartner,
  //         id: restaurantId?.id,
  //         errorMessage: "Failed to delete partner",
  //         refreshData: handleGetAllPartnersData
  //       }
  //     };

  //     const currentConfig = config[route];
  //     if (!currentConfig || !currentConfig.id) {
  //       console.error(`Invalid route or missing ID for route: ${route}`);
  //       return;
  //     }

  //     const response = await currentConfig.deleteFunction(currentConfig.id);
      
  //     if (response.status === 200) {
  //       showAlert("success", response.data.message);
  //       currentConfig.refreshData();
  //     } else {
  //       showAlert("error", response.data.message);
  //       console.error(currentConfig.errorMessage);
  //     }
  //   } catch (error) {
  //     console.error(`Error deleting ${route}:`, error);
  //     showAlert("error", error.response?.message || "An unexpected error occurred");
  //   } finally {
  //     onClose();
  //   }
  // };
  
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
    }else if(route === "partners") {
      try {
        const response = await deletePartner(restaurantId?.id);
        if (response.status === 200) {
          showAlert("success", response.data.message);
          handleGetAllPartnersData();
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
