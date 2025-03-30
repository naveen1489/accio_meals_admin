import React from "react";
import styles from "../../Styles/AddPartners.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const ViewDetails = ({ onClose, restaurant , isEditable}) => {
  if (!restaurant) return null;

  
  console.log('iseditable', isEditable);
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} style={{ width: "30rem" }}>
        <div className={styles.modalHeader}>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.modal_info}>
          <div>
            <img
              src="https://c8.alamy.com/comp/2G39YFY/indian-female-purchasing-items-at-confectionary-store-at-chaudi-canacona-bus-stand-goa-india-2G39YFY.jpg"
              alt="Restaurant"
            />
          </div>
          <div>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <Input
                value={restaurant.companyName || "N/A"}
                className={styles.inputField}
                readOnly={!isEditable}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Name</label>
              <Input
                value={restaurant.name || "N/A"}
                className={styles.inputField}
                readOnly={!isEditable}
              />
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <h3>Personal Details</h3>
          <div className={styles.inputGroup}>
            <label>Contact No.</label>
            <Input
              value={restaurant.contactNumber || "N/A"}
              className={styles.inputField}
              readOnly={!isEditable}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email ID</label>
            <Input
              value={restaurant.emailId || "N/A"}
              className={styles.inputField}
              readOnly={!isEditable}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <Input
              value={`${restaurant.addressLine1 || ""}, ${restaurant.city || ""} - ${restaurant.postalCode || ""}`}
              className={styles.inputField}
              readOnly={!isEditable}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button type="primary" className={styles.saveButton} onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
