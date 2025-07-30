import React, { useEffect, useState } from "react";
import styles from "../../Styles/Category.module.css";
import { Spin } from "antd";
import noDataFound from "../../assets/Auth/noDatafound.png";
import veg_icon from "../../assets/Category/veg.png";
import { TbEye } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import ViewDetails from "./ViewDetails";
import { useData } from "../../Context/DataProvider";
import EditCategory from "./EditCategory";
import nonveg_icon from "../../assets/Category/nonVeg.png";

const CategoryCard = ({ data }) => {
  const [openDeletepopup, setopendeletepopup] = useState(false);
  const [openViewPopup, setopenViewpopup] = useState(false);
  const [openEditPopup, setopenEditPopup] = useState(false);
  const { categoryData } = useData();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleViewClick = (category) => {
    setIsEditable(false);
    setSelectedCategory(category);
    setopenViewpopup(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditable(true);
    setopenEditPopup(true);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [categoryData, data]);

  const categories = data?.length > 0 ? data : categoryData;

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.cardsContainer}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : categories?.length > 0 ? (
          categories.map((category, index) => (
            <div className={styles.card} key={index}>
              <div>
                <div className={styles.header}>
                  <div className={styles.categoryInfo}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1yMxBVI-74dtHiEy0qHBtwrXEaLyhN-PWQ&s"
                      alt=""
                      style={{ width: "10rem", height: "10rem" }}
                    />
                    <div>
                      <h2>{category.categoryName}</h2>
                      <span className={styles.vegIndicator}>
                        <img src={category.vegNonVeg == "Veg" ? veg_icon : nonveg_icon} alt="veg_icon" />
                        {category.vegNonVeg}
                      </span>
                    </div>
                  </div>
                  <div className={styles.status}>
                    <div
                      style={{
                        background:
                          category.status == "active" ? "#36973a2b" : "#fff3cd",
                        border:
                          category.status == "Active"
                            ? "0.5px solid #36973a2b"
                            : "0.5px solid #fff3cd",
                      }}
                    >
                      <div
                        style={{
                          background:
                            category.status == "active" ? "green" : "#ffcc80",
                          border:
                            category.status == "active"
                              ? "0.5px solid green"
                              : "0.5px solid #ffcc80",
                        }}
                      ></div>
                    </div>{" "}
                    {category.status == "active"
                      ? "Active"
                      : "Inactive" || "Status"}
                  </div>
                </div>

                <div className={styles.actions}>
                  <TbEye
                    className={styles.icon}
                    onClick={() => handleViewClick(category)}
                  />
                  <BiEdit
                    className={styles.icon}
                    onClick={() => handleEditClick(category)}
                  />
                  <RiDeleteBin6Line
                    className={styles.icon}
                    onClick={() => {
                      setSelectedCategory(category);
                      setopendeletepopup(true);
                    }}
                  />
                </div>

                <div className={styles.details}>
                  <h3>Category Details</h3>
                  <div>
                    <p>Description </p> <p>:</p>
                    <p>{category.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noData}>
            <img src={noDataFound} alt="no data found" />
          </div>
        )}
      </div>
      {/* {openViewPopup && <ViewDetails onClose={() => setopenViewpopup(false)} />} */}
      {openViewPopup && (
        <ViewDetails
          onClose={() => setopenViewpopup(false)}
          category={selectedCategory}
          isEditable={isEditable}
        />
      )}

      {openEditPopup && (
        <EditCategory
          onClose={() => setopenEditPopup(false)}
          category={selectedCategory}
          isEditable={isEditable}
        />
      )}

      {openDeletepopup && selectedCategory && (
        <ConformationPopup
          categoryData={selectedCategory}
          route={"category"}
          onClose={() => setopendeletepopup(false)}
          icon={<RiDeleteBin6Line />}
          text={
            <>
              You are about to delete a{" "}
              <span style={{ color: "#F15A5C" }}>Category</span>
            </>
          }
          leftBtn={true}
          rightBtn={true}
        />
      )}
    </div>
  );
};

export default CategoryCard;
