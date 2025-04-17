import React, { useState } from "react";
import styles from "../../Styles/AddPartners.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, message, Upload } from "antd";
import { editPartners } from "../../api/partners/getPartners";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";
import imageCompression from "browser-image-compression";

const ViewDetails = ({ onClose, restaurant, isEditable }) => {
  const { showAlert } = useAlert();
  const { handleGetAllPartnersData } = useData();
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
    imageUrl: restaurant.imageUrl || "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();

      reader.onload = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
        showAlert("success", "Image uploaded!");
      };

      reader.onerror = () => {
        showAlert("error", "Failed to upload image. Please try again.");
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
      showAlert("error", "Failed to compress image. Please try again.");
    }

    return false; 
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
        imageUrl: formData.imageUrl,
      };

      const response = await editPartners(restaurant.id, updatedData);
      if (response.status === 200) {
        showAlert("success", response.data.message);
        handleGetAllPartnersData();
        onClose(response.data); 
      } else {
        showAlert("error", response.data.message);
      }
    } catch (error) {
      message.error("Failed to update partner details.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} style={{ width: "30rem", height: "auto" }}>
        <div className={styles.modalHeader}>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.modal_info}>
          <div>
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
              className={styles.uploadBox}
            >
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Restaurant"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div className={styles.uploadContent}>
                  <p>Click to upload image</p>
                </div>
              )}
            </Upload>
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
