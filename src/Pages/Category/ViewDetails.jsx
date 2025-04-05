import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import styles from "../../Styles/ViewCard.module.css";
import { editCategory } from "../../api/category/category";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";

const ViewDetails = ({ onClose, category, isEditable }) => {
  const [editableCategory, setEditableCategory] = useState({ ...category });
  const { showAlert } = useAlert();
  const { handleGetAllCategoryData } = useData();

  const handleInputChange = (field, value) => {
    setEditableCategory((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveItem = (categoryName, item) => {
    setEditableCategory((prev) => ({
      ...prev,
      itemCategories: prev.itemCategories.map((cat) =>
        cat.itemCategoryName === categoryName
          ? { ...cat, items: cat.items.filter((i) => i.itemName !== item) }
          : cat
      ),
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const payload = {
        categoryName: editableCategory.categoryName,
        vegNonVeg: editableCategory.vegNonVeg,
        description: editableCategory.description,
        status: editableCategory.status,
        itemCategories: editableCategory.itemCategories.map((cat) => ({
          itemCategoryName: cat.itemCategoryName,
          items: cat.items.map((item) => item.itemName),
        })),
      };

      const response = await editCategory(category.id, payload);
      if (response.status === 200) {
        showAlert("success", response.data.message);
        handleGetAllCategoryData();
        onClose();
      } else {
        showAlert("error", response.data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "itemCategoryName",
      key: "itemCategoryName",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items, record) =>
        items.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <span>{item.itemName}</span>
            {/* {isEditable && (
              <CloseOutlined
                style={{ marginLeft: "8px", color: "red", cursor: "pointer" }}
                onClick={() => handleRemoveItem(record.itemCategoryName, item.itemName)}
              />
            )} */}
          </div>
        )),
    },
  ];

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
                <label>Category Name</label>
                <Input
                  placeholder="Company Name"
                  className={styles.inputField}
                  value={editableCategory.categoryName}
                  onChange={(e) =>
                    handleInputChange("categoryName", e.target.value)
                  }
                  readOnly={!isEditable}
                />
              </div>

              <div>
                <label>Status</label>
                <Input
                  placeholder="Status"
                  className={styles.inputField}
                  style={{ width: "7rem" }}
                  value={editableCategory.status || ""}
                  readOnly={!isEditable}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div>
                <label>Date</label>
                <Input
                  type="date"
                  readOnly={!isEditable}
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
                  readOnly={!isEditable}
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
              readOnly={!isEditable}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className={styles.tableSection}>
            <Table
              dataSource={editableCategory.itemCategories}
              columns={columns}
              rowKey="id"
              pagination={false}
              style={{width:"100%"}}
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
