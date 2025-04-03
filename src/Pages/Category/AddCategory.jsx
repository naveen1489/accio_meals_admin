import React, { useEffect, useState } from "react";
import styles from "../../Styles/AddCategory.module.css";
import { Button, Radio, Input, Upload, Select, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { addCategory } from "../../api/category/category"; 
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";


const AddCategory = ({ isOpen, onClose, isPopupOpen }) => {
  const [categoryName, setCategoryName] = useState("");
  const [vegType, setVegType] = useState("veg"); 
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [menuItem, setMenuItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("item1"); 
  const [image, setImage] = useState(null);
  const {showAlert} = useAlert();
  const {handleGetAllCategoryData} = useData();

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

  const handleSave = async () => {
    const payload = {
      categoryName: categoryName, 
      vegNonVeg: vegType === "non-veg" ? "NonVeg" : "Veg", 
      description: description,
      status: status,
      menuItem: menuItem,
      selectedItem: selectedItem,
    };

    try {
      const response = await addCategory(payload);
      console.log('response', payload, response);
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
                <Input
                  placeholder="Enter category name"
                  className={styles.inputField}
                  style={{ width: "14rem" }}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Veg/ Non-Veg</label>
                <Select
                  placeholder="Select"
                  className={`${styles.inputField}`}
                  style={{ width: "7.3rem" }}
                  value={vegType}
                  onChange={(value) => setVegType(value)}
                >
                  <Select.Option value="veg">Veg</Select.Option>
                  <Select.Option value="non-veg">Non-Veg</Select.Option>
                </Select>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Add Description</label>
              <Input
                placeholder="Add Description....."
                className={styles.inputField}
                style={{ width: "22.2rem" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.statusSection}>
              <label>Status:</label>
              <Radio.Group
                defaultValue="active"
                className={styles.radioGroup}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
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
                  value={menuItem}
                  onChange={(e) => setMenuItem(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Select Item</label>
                <Select
                  placeholder="Select"
                  className={styles.inputField}
                  style={{ width: "7.3rem" }}
                  value={selectedItem}
                  onChange={(value) => setSelectedItem(value)}
                >
                  <Select.Option value="item1">Item 1</Select.Option>
                  <Select.Option value="item2">Item 2</Select.Option>
                </Select>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className={styles.rightSection}>
            <Upload
              className={styles.uploadBox}
              beforeUpload={(file) => {
                setImage(file);
                return false; // Prevent automatic upload
              }}
            >
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
