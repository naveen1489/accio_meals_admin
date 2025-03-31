import React, { useState } from "react";
import styles from "../../Styles/AddPartners.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { editPartners } from "../../api/partners/getPartners";

const ViewDetails = ({ onClose, restaurant, isEditable }) => {
  if (!restaurant) return null;

  // State to manage editable fields
  const [formData, setFormData] = useState({
    companyName: restaurant.companyName || "",
    name: restaurant.name || "",
    contactNumber: restaurant.contactNumber || "",
    emailId: restaurant.emailId || "",
    address: `${restaurant.addressLine1 || ""}, ${restaurant.city || ""} - ${restaurant.postalCode || ""}`,
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save changes and call the API
  const handleSaveChanges = async () => {
    try {
        const updatedData = {
            companyName: formData.companyName,
            name: formData.name,
            contactNumber: formData.contactNumber,
            emailId: formData.emailId,
            addressLine1: formData.address.split(",")[0].trim(),
            city: formData.address.split(",")[1]?.trim().split("-")[0]?.trim() || "",
            postalCode: formData.address.split("-")[1]?.trim() || "",
        };

        await editPartners(restaurant.id, updatedData);
        message.success("Partner details updated successfully!");
        onClose(); 
    } catch (error) {
        message.error("Failed to update partner details.");
    }
  };

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
                value={formData.companyName}
                className={styles.inputField}
                // readOnly={!isEditable}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Name</label>
              <Input
                value={formData.name}
                className={styles.inputField}
                // readOnly={!isEditable}
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
              // readOnly={!isEditable}
              onChange={(e) => handleInputChange("contactNumber", e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email ID</label>
            <Input
              value={formData.emailId}
              className={styles.inputField}
              // readOnly={!isEditable}
              onChange={(e) => handleInputChange("emailId", e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <Input
              value={formData.address}
              className={styles.inputField}
              // readOnly={!isEditable}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        </div>

        {/* Conditionally render the Save Changes button */}
        {isEditable && (
          <div className={styles.modalFooter}>
            <Button type="primary" className={styles.saveButton} onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
