import React, { useState } from "react";
import styles from "../../Styles/AddPartners.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { editPartners } from "../../api/partners/getPartners";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";

const ViewDetails = ({ onClose, restaurant, isEditable }) => {
  const {showAlert} = useAlert();
  const {handleGetAllPartnersData} = useData();
  if (!restaurant) return null;

  // State to manage editable fields
  const [formData, setFormData] = useState({
    companyName: restaurant.companyName || "",
    name: restaurant.name || "",
    contactNumber: restaurant.contactNumber || "",
    emailId: restaurant.emailId || "",
    address: `${restaurant.addressLine1 || ""}, ${restaurant.city || ""} - ${
      restaurant.postalCode || ""
    }`,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        companyName: formData.companyName,
        name: formData.name,
        contactNumber: formData.contactNumber,
        emailId: formData.emailId,
        addressLine1: formData.address.split(",")[0].trim(),
        city:
          formData.address.split(",")[1]?.trim().split("-")[0]?.trim() || "",
        postalCode: formData.address.split("-")[1]?.trim() || "",
      };

      const response = await editPartners(restaurant.id, updatedData);
      if (response.status === 200) {
        showAlert("success", response.data.message);
        handleGetAllPartnersData();
        onClose();
      } else {
        showAlert("error", response.data.message);
      }
    } catch (error) {
      message.error("Failed to update partner details.");
    }
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} style={{ width: "30rem", height:"auto"}}>
        <div className={styles.modalHeader}>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.modal_info}>
          <div>
            <img
              src={restaurant.imageUrl}
              alt="Restaurant"
            />
          </div>
          <div>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <Input
                value={formData.companyName}
                className={styles.inputField}
                readOnly={!isEditable}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Name</label>
              <Input
                value={formData.name}
                className={styles.inputField}
                readOnly={!isEditable}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <h3>Personal Details</h3>
          <div className={styles.inputGroup}>
            <label>Contact No.</label>
            <Input
              value={formData.contactNumber}
              className={styles.inputField}
              readOnly={!isEditable}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email ID</label>
            <Input
              value={formData.emailId}
              className={styles.inputField}
              readOnly={!isEditable}
              onChange={(e) => handleInputChange("emailId", e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <Input
              value={formData.address}
              className={styles.inputField}
              readOnly={!isEditable}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        </div>

        {/* Conditionally render the Save Changes button */}
        {isEditable && (
          <div className={styles.modalFooter}>
            <Button
              type="primary"
              className={styles.saveButton}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
