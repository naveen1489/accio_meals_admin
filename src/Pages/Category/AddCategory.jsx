import React, { useEffect } from "react";
import styles from "../../Styles/AddCategory.module.css";
import { Button, Radio, Input, Upload, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";

const AddCategory = ({ isOpen, onClose, isPopupOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  const handleSave = () => {
    isPopupOpen(true);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Category</h2>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.modalContent}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Category Name</label>
                <Select
                  placeholder="Select category"
                  className={styles.inputField}
                  style={{ width: "14rem" }}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Veg/ Non-Veg</label>
                <Select
                  placeholder="Select"
                  className={`${styles.inputField}`}
                  style={{ width: "7.3rem" }}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Add Description</label>
              <Input
                placeholder="Add Description....."
                className={styles.inputField}
                style={{ width: "22.2rem" }}
              />
            </div>
            <div className={styles.statusSection}>
              <label>Status:</label>
              <Radio.Group defaultValue="active" className={styles.radioGroup}>
                <Radio value="active">Active</Radio>
                <Radio value="inactive">Inactive</Radio>
              </Radio.Group>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Add Menu Item</label>
                <Input
                  placeholder="Enter Name"
                  className={styles.inputField}
                  style={{ width: "14rem" }}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Select Item</label>
                <Select
                  placeholder="Select"
                  className={styles.inputField}
                  style={{ width: "7.3rem" }}
                />
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className={styles.rightSection}>
            <Upload className={styles.uploadBox}>
              <div className={styles.uploadContent}>
                <PiImageLight fontSize={"2.5rem"} />
                <p>
                  {" "}
                  <MdOutlineModeEdit fontSize={"1rem"} />
                  Upload Category Image
                </p>
              </div>
            </Upload>
          </div>
        </div>
        <div className={styles.modalFooter} onClick={handleSave}>
          <Button type="primary" className={styles.saveButton}>
            Save & Add category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
