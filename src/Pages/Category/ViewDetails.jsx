import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import styles from "../../Styles/ViewCard.module.css";

const ViewDetails = ({ onClose }) => {
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
              alt=""
            />
          </div>
          <div>
            <div className={styles.inputGroup}>
              <div>
                <label>Company Name</label>
                <Input
                  placeholder="Company Name"
                  className={styles.inputField}
                />
              </div>

              <div>
                <label>Status</label>
                <Input
                  placeholder="Status"
                  className={styles.inputField}
                  style={{ width: "7rem" }}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div>
                <label>Date</label>
                <Input type="date" className={styles.inputField} />
              </div>

              <div>
                <label>Veg/Non-veg</label>
                <Input
                  style={{ width: "7rem" }}
                  placeholder="Veg/Non-veg"
                  className={styles.inputField}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <h3>Category Details</h3>
          <div className={styles.inputGroup}>
            <label>Discription</label>
            <Input.TextArea className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label>Items</label>
            <Input.TextArea className={styles.inputField} />
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
