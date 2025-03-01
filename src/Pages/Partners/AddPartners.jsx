import React, { useEffect } from "react";
import styles from "../../Styles/AddPartners.module.css";
import { Button, Radio, Input, Upload, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";

const AddPartners = ({ isOpen, onClose, isPopupOpen }) => {
  const { Option } = Select;

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
          <h2 className={styles.modalTitle}>Add Partner</h2>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.modalContent}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <Input placeholder="Company Name" className={styles.inputField} />
            </div>

            <div className={styles.inputGroup}>
              <label>Add Description</label>
              <div className={styles.inputRow}>
                <Select style={{ width: "3rem" }} className={styles.inputField}>
                  <Option>Mr.</Option>
                  <Option>Mrs.</Option>
                </Select>
                <Input
                  placeholder="Add Description....."
                  className={styles.inputField}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Contanct No.</label>
              <div className={styles.inputRow}>
                <Select style={{ width: "3rem" }} className={styles.inputField}>
                  <Option>+91</Option>
                  <Option>+11</Option>
                </Select>
                <Input placeholder="Number" className={styles.inputField} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email Id</label>
              <Input
                placeholder="Enter email id"
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Status</label>
              <Select placeholder="Select" className={styles.inputField} />
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
                  Upload Restaurant Image
                </p>
              </div>
            </Upload>
          </div>
        </div>
        <div className={styles.modalFooter} onClick={handleSave}>
          <Button type="primary" className={styles.saveButton}>
            Save & Add Partner
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPartners;
