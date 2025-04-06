import React, { useState, useEffect } from "react";
import styles from "../../Styles/Help.module.css";
import { Input, Button, Upload, Table } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

const MenuDetails = ({ menu, onClose }) => {
  const [itemCategories, setItemCategories] = useState([]);
  const [activeDay, setActiveDay] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    const uniqueDays = [...new Set(menu.menuCategories.map((cat) => cat.day))];
    setDays(uniqueDays);

    if (uniqueDays.length > 0) {
      setActiveDay(uniqueDays[0]);
    }
  }, [menu]);

  useEffect(() => {
    const filteredCategories = menu.menuCategories
      .filter((cat) => cat.day === activeDay)
      .flatMap((cat) =>
        cat.menuItems.map((item) => ({
          itemCategoryName: item.itemCategory, 
          items: [item.itemName], 
        }))
      );
    setItemCategories(filteredCategories);
  }, [activeDay, menu]);

  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  const handleRemoveItem = (categoryName, itemName) => {
    console.log(`Remove item: ${itemName} from category: ${categoryName}`);
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

            <div className={styles.content_container}>
              <div className={styles.inputGroup}>
                <label>Menu Item Name</label>
                <Input
                  placeholder="Item Name"
                  value={menu?.menuName}
                  className={styles.inputField}
                  style={{ width: "22.2rem" }}
                />
              </div>
              <div className={styles.flexRow} style={{ width: "22.5rem" }}>
                <div className={styles.inputGroup}>
                  <label>Menu Category</label>
                  <Input
                    placeholder="Item Category"
                    className={styles.inputField}
                    value={menu.menuCategories[0]?.categoryName}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Veg/Non-veg</label>
                  <Input
                    placeholder="veg/non-veg"
                    className={styles.inputField}
                    value={menu?.vegNonVeg}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Price</label>
                  <Input placeholder="Price" 
                  className={styles.inputField} 
                  value={menu.price || 0}/>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Uploaded Image</label>
                <Upload className={styles.uploadBox}>
                  <PiImageLight />
                </Upload>
              </div>

              <div className={styles.days}>
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`${styles.dayButton} ${
                      activeDay === day ? styles.activeDay : styles.inactiveDay
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className={styles.tableSection}>
                <Table
                  dataSource={itemCategories}
                  columns={columns}
                  rowKey="itemCategoryName"
                  pagination={false}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Add Comment</label>
                <Input.TextArea placeholder="Demo Comment" rows={3} />
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
