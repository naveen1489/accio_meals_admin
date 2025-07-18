import React, { useEffect, useState } from "react";
import styles from "../../Styles/AddCategory.module.css";
import { Button, Radio, Input, Select, message, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { addCategory } from "../../api/category/category";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";

const AddCategory = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [vegType, setVegType] = useState("Veg");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [itemCategories, setItemCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const { showAlert } = useAlert();
  const { handleGetAllCategoryData } = useData();

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

  // const handleOverlayClick = (e) => {
  //   if (e.target.classList.contains(styles.modalOverlay)) {
  //     onClose();
  //   }
  // };

  const handleAddItem = () => {
    if (!currentCategory || !currentItem) {
      message.error("Please select a category and enter an item.");
      return;
    }

    const existingCategory = itemCategories.find(
      (cat) => cat.itemCategoryName === currentCategory
    );

    if (existingCategory) {
      existingCategory.items.push(currentItem);
    } else {
      setItemCategories([
        ...itemCategories,
        { itemCategoryName: currentCategory, items: [currentItem] },
      ]);
    }

    setCurrentItem("");
  };

  const handleRemoveItem = (categoryName, item) => {
    setItemCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.itemCategoryName === categoryName
          ? {
              ...cat,
              items: cat.items.filter((i) => i !== item),
            }
          : cat
      )
    );
  };

  const handleSave = async () => {
    const payload = {
      categoryName,
      vegNonVeg: vegType,
      description,
      status,
      itemCategories,
    };

    try {
      const response = await addCategory(payload);
      if (response.status === 200) {
        showAlert("success", response.data.message);
        handleGetAllCategoryData();
        onClose();
      } else {
        showAlert("error", response.data.message);
      }
    } catch (error) {
      message.error("An error occurred while adding the category.");
    }
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "itemCategoryName",
      key: "itemCategoryName",
      onHeaderCell: () => ({
        style: { backgroundColor: "#FDF5F5", color: "#EE8A92" },
      }),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items, record) =>
        items.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <span>{item}</span>
            <CloseOutlined
              style={{ marginLeft: "8px", color: "red", cursor: "pointer" }}
              onClick={() => handleRemoveItem(record.itemCategoryName, item)}
            />
          </div>
        )),
    },
  ];

  return (
    <div className={styles.modalOverlay} 
    // onClick={handleOverlayClick}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Category</h2>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.modalContent_container}>
          <div className={styles.modalContent}>
            {/* Left Section */}
            <div className={styles.leftSection}>
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label>Category Name</label>
                  <Input
                    placeholder="Enter category name"
                    className={styles.inputField}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Veg/Non-Veg</label>
                  <Select
                    placeholder="Select"
                    className={styles.inputField}
                    value={vegType}
                    onChange={(value) => setVegType(value)}
                  >
                    <Select.Option value="Veg">Veg</Select.Option>
                    <Select.Option value="NonVeg">Non-Veg</Select.Option>
                  </Select>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <Input
                  placeholder="Add description..."
                  className={styles.inputField}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.statusSection}>
                <label>Status:</label>
                <Radio.Group
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <Radio value="active">Active</Radio>
                  <Radio value="inactive">Inactive</Radio>
                </Radio.Group>
              </div>
              <div className={`${styles.inputRow} ${styles.categoryRow}`}>
                <div className={styles.inputGroup}>
                  <label>Category</label>
                  <Select
                    placeholder="Select category"
                    className={styles.inputField}
                    value={currentCategory}
                    onChange={(value) => setCurrentCategory(value)}
                  >
                    <Select.Option value="Main Sabji">Main Sabji</Select.Option>
                    <Select.Option value="Dal">Dal</Select.Option>
                    <Select.Option value="Rice">Rice</Select.Option>
                    <Select.Option value="Roti">Roti</Select.Option>
                    <Select.Option value="Papad">Papad</Select.Option>
                    <Select.Option value="Dahi">Dahi</Select.Option>
                    <Select.Option value="Achar">Achar</Select.Option>
                  </Select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Item</label>
                  <Input
                    placeholder="Enter item"
                    className={styles.inputField}
                    value={currentItem}
                    onChange={(e) => setCurrentItem(e.target.value)}
                  />
                </div>
                <div
                  style={{ marginTop: "1.5rem" }}
                  className={styles.add_button}
                >
                  <Button onClick={handleAddItem}>Add</Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tableSection}>
            <Table
              dataSource={itemCategories}
              columns={columns}
              rowKey="itemCategoryName"
              pagination={false}
            />
          </div>
          <div className={styles.modalFooter}>
            <Button
              type="primary"
              className={styles.saveButton}
              onClick={handleSave}
            >
              Save & Add Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
