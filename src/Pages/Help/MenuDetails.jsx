import React, { useState, useEffect } from "react";
import styles from "../../Styles/Help.module.css";
import { Input, Button, Upload, Table } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { PiImageLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { reviewMenuDetails } from "../../api/menu/getMenuDetails";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";

const MenuDetails = ({ menu, onClose }) => {
  const [itemCategories, setItemCategories] = useState([]);
  const [activeDay, setActiveDay] = useState("");
  const [days, setDays] = useState([]);
  const [adminComment, setAdminComment] = useState("");
  const { showAlert } = useAlert();
  const { handleGetMenuDetails } = useData();

  useEffect(() => {
    const uniqueDays = [...new Set(menu?.menuCategories.map((cat) => cat.day))];
    setDays(uniqueDays);

    if (uniqueDays.length > 0) {
      setActiveDay(uniqueDays[0]);
    }
  }, [menu]);

  useEffect(() => {
    const filteredCategories = menu?.menuCategories
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
          </div>
        )),
    },
  ];

  const handleReview = async (status) => {
    const payload = {
      menuId: menu?.menuCategories[0]?.menuId,
      restaurantId: menu?.restaurantId,
      status,
      adminComment,
    };
    // console.log("Payload:", payload);

    const response = await reviewMenuDetails(payload);
    if (response.status == 200) {
      // console.log("Response:", response);
      showAlert("success", response.data.message);
      handleGetMenuDetails();
      onClose();
    } else {
      showAlert("error", response.data.message);
    }
  };

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
                    value={menu?.menuCategories[0]?.categoryName}
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
                  <Input
                    placeholder="Price"
                    className={styles.inputField}
                    value={menu?.price || 0}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Uploaded Image</label>
                <div className={styles.imageContainer}>
                  <img
                    src={
                      menu?.imageUrl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1yMxBVI-74dtHiEy0qHBtwrXEaLyhN-PWQ&s"
                    }
                    alt="Menu Item"
                    className={styles.uploadedImage}
                  />
                </div>
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
                <Input.TextArea
                  placeholder="Write your reviews here"
                  rows={3}
                  value={
                    menu?.status === "Approved" || menu?.status === "Rejected"
                      ? menu?.menuReviews?.[0]?.adminComment || ""
                      : adminComment
                  }
                  onChange={(e) => {
                    if (
                      menu?.status !== "Approved" &&
                      menu?.status !== "Rejected"
                    ) {
                      setAdminComment(e.target.value);
                    }
                  }}
                  readOnly={
                    menu?.status === "Approved" || menu?.status === "Rejected"
                  }
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              {menu?.status === "Approved" ? (
                <Button
                  className={styles.approveBtn}
                  icon={<CheckOutlined />}
                  disabled
                >
                  Approved
                </Button>
              ) : menu?.status === "Rejected" ? (
                <Button
                  className={styles.rejectBtn}
                  icon={<RxCross2 />}
                  disabled
                >
                  Rejected
                </Button>
              ) : (
                <>
                  <Button
                    className={styles.approveBtn}
                    icon={<CheckOutlined />}
                    onClick={() => handleReview("Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    className={styles.rejectBtn}
                    icon={<RxCross2 />}
                    onClick={() => handleReview("Rejected")}
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
