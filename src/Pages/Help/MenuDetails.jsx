import React from "react";
import styles from "../../Styles/Help.module.css";
import { Input, Button, Upload } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

const MenuDetails = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.heading}>Help Center</h2>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.modalContent}>
          {/* Left Side: Form Inputs */}
          <div className={styles.leftSection}>
            <h3 className={styles.subHeading}>New Menu Details</h3>
            <div className={styles.inputGroup}>
              <label>Item Name</label>
              <Input
                placeholder="Item Name"
                className={styles.inputField}
                style={{ width: "22.2rem" }}
              />
            </div>
            <div className={styles.flexRow}>
              <div className={styles.inputGroup}>
                <label>Item Category</label>
                <Input
                  placeholder="Item Category"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Veg/Non-veg</label>
                <Input
                  placeholder="veg/non-veg"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Price</label>
                <Input placeholder="Price" className={styles.inputField} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Uploaded Image</label>
              <Upload className={styles.uploadBox}>
                <PiImageLight />
              </Upload>
            </div>
            <div className={styles.formGroup}>
              <label>Add Comment</label>
              <Input.TextArea placeholder="Demo Comment" rows={3} />
            </div>
          </div>

          {/* Right Side: Company Details & Actions */}
          <div className={styles.rightSection}>
            <div className={styles.infoBox}>
              <div>
                <p>Company Name </p> <p>:</p>
                <p>Demo Name</p>
              </div>
              <div>
                <p>Added On </p> <p>:</p>
                <p>22/12/2024</p>
              </div>
              <div>
                <p>Request </p> <p>:</p>
                <p>New Menu</p>
              </div>
              <div>
                <p>Status </p> <p>:</p>
                <p>Active</p>
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <Button className={styles.approveBtn} icon={<CheckOutlined />}>
                Approve
              </Button>
              <Button className={styles.rejectBtn} icon={<RxCross2 />}>
                Reject
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
