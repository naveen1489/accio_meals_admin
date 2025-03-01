import React from "react";
import styles from "../../Styles/StatsCard.module.css";
import { HiOutlineUsers } from "react-icons/hi";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { ImCreditCard } from "react-icons/im";

const statsData = [
  { number: "89,935", text: "Total Partners", icon: <HiOutlineUsers /> },
  { number: "23,283.5", text: "Total Subscribers", icon: <LuBriefcaseBusiness />},
  { number: "46,827", text: "Revenue till date", icon: <ImCreditCard /> },
];

const StatsCard = () => {
  return (
    <div className={styles.statsContainer}>
      {statsData.map((item, index) => (
        <div key={index} className={styles.statItem}>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{item.number}</span>
            <span className={styles.statText}>{item.text}</span>
          </div>
          <div className={styles.statIcon}>{item.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
