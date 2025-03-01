import React from "react";
import styles from "../../Styles/AddPartners.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const ViewDetails = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} style={{ width: "30rem" }}>
        <div className={styles.modalHeader}>
          {/* <h2 className={styles.modalTitle}>Add Partner</h2> */}
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.modal_info}>
          <div>
            <img
              src="https://c8.alamy.com/comp/2G39YFY/indian-female-purchasing-items-at-confectionary-store-at-chaudi-canacona-bus-stand-goa-india-2G39YFY.jpg"
              alt=""
            />
          </div>
          <div>
            <div className={styles.inputGroup}>
              <label>Company Name</label>
              <Input placeholder="Company Name" className={styles.inputField} />
            </div>

            <div className={styles.inputGroup}>
              <label>Name</label>
              <Input placeholder="Name" className={styles.inputField} />
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <h3>Personal Details</h3>
          <div className={styles.inputGroup}>
            <label>Contact No.</label>
            <Input placeholder="Contact No." className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label>Email-I’d</label>
            <Input placeholder="Email-I’d" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <Input placeholder="Address" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button type="primary" className={styles.saveButton}>
            Save Changes
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ViewDetails;
