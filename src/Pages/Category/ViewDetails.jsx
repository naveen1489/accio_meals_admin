import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import styles from "../../Styles/ViewCard.module.css";
import { editCategoy } from "../../api/category/category";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";

const ViewDetails = ({ onClose, category }) => {
  const [editableCategory, setEditableCategory] = useState({ ...category });
  const {showAlert} = useAlert();
  const {handleGetAllCategoryData} = useData();

  const handleInputChange = (field, value) => {
    setEditableCategory((prev) => ({ ...prev, [field]: value }));
  };

  // console.log("category", category);
  const handleSaveChanges = async () => {
    try {
      const payload = {
        categoryName: editableCategory.categoryName,
        status: editableCategory.status,
        createdAt: editableCategory.createdAt,
        vegNonVeg: editableCategory.vegNonVeg,
        description: editableCategory.description,
        itemCategories: editableCategory.itemCategories,
      };

      const response = await editCategoy(category.id, payload);
      if (response.status === 200) {
        showAlert("success", response.data.message);
        handleGetAllCategoryData();
        onClose();
      }else{
        showAlert("error", response.data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
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
                  value={editableCategory.categoryName}
                  onChange={(e) =>
                    handleInputChange("categoryName", e.target.value)
                  }
                />
              </div>

              <div>
                <label>Status</label>
                <Input
                  placeholder="Status"
                  className={styles.inputField}
                  style={{ width: "7rem" }}
                  value={editableCategory.status || ""}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div>
                <label>Date</label>
                <Input
                  type="date"
                  className={styles.inputField}
                  value={editableCategory.createdAt?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleInputChange("createdAt", e.target.value)
                  }
                />
              </div>

              <div>
                <label>Veg/Non-veg</label>
                <Input
                  style={{ width: "7rem" }}
                  placeholder="Veg/Non-veg"
                  className={styles.inputField}
                  value={editableCategory.vegNonVeg || ""}
                  onChange={(e) =>
                    handleInputChange("vegNonVeg", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <h3>Category Details</h3>
          <div className={styles.inputGroup}>
            <label>Description</label>
            <Input.TextArea
              className={styles.inputField}
              value={editableCategory.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Items</label>
            <Input.TextArea
              className={styles.inputField}
              value={
                editableCategory.itemCategories
                  ?.flatMap((itemCategory) =>
                    itemCategory.items?.map((item) => item.itemName)
                  )
                  .join(", ") || "No items available"
              }
              onChange={(e) =>
                handleInputChange(
                  "itemCategories",
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            type="primary"
            className={styles.saveButton}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
