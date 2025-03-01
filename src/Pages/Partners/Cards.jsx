import React, { useState } from "react";
import styles from "../../Styles/Partners.module.css";
import { TbEye } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ViewDetails from "./ViewDetails";

const PartnersCard = () => {
  const [viewPopup, setviewPopup] = useState(false);

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
            <h2>restro name</h2>
            <h2>Aditya awdhut Mahya</h2>

            <div className={styles.subscriber}>
              <h1>1200</h1>
              <span>Subscriber</span>
            </div>
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
        <TbEye className={styles.icon} onClick={() => setviewPopup(true)} />
        <BiEdit className={styles.icon} />
        <RiDeleteBin6Line className={styles.icon} />
      </div>

      <div className={styles.details}>
        <h3>Personal Details</h3>
        <div>
          <p>Address </p> <p>:</p>
          <p>Xyz Colony, YY area, Nagpur - 440027</p>
        </div>
        <div>
          <p>Email ID </p> <p>:</p>
          <p>adityaawdhut1234@gmail.com</p>
        </div>
        <div>
          <p>Contact No </p> <p>:</p>
          <p>1234567890</p>
        </div>
      </div>

      {viewPopup && <ViewDetails onClose={() => setviewPopup(false)} />}
    </div>
  );
};

export default PartnersCard;
