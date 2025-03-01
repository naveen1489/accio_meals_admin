import React from "react";
import styles from "../../Styles/Category.module.css";
import veg_icon from "../../assets/Category/veg.png";
import { TbEye } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const CategoryCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.categoryInfo}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1yMxBVI-74dtHiEy0qHBtwrXEaLyhN-PWQ&s"
            alt=""
            style={{ width: "10rem", height: "10rem" }}
          />
          <div>
            <h2>Breakfast</h2>
            <span className={styles.vegIndicator}>
              <img src={veg_icon} alt="veg_icon" />
              VEG
            </span>
          </div>
        </div>
        <div className={styles.status}>
          <div>
            <div></div>
          </div>{" "}
          Active
        </div>
      </div>

      <div className={styles.actions}>
        <TbEye className={styles.icon} />
        <BiEdit className={styles.icon} />
        <RiDeleteBin6Line className={styles.icon} />
      </div>

      <div className={styles.details}>
        <h3>Category Details</h3>
        <div>
          <p>Description </p> <p>:</p>
          <p>
            Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
            Lorem ipsum dolor sit!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
