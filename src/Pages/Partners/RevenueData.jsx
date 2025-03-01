import React from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { LuBriefcaseBusiness } from "react-icons/lu";
import styles from "../../Styles/StatsCard.module.css";
import Graph from "../Dashboard/Graph";

const RevenueData = () => {
  const statsData = [
    { number: "89,935", text: "Total Revenue", icon: <HiOutlineUsers /> },
    {
      number: "23,283.5",
      text: "Revenue this month",
      icon: <LuBriefcaseBusiness />,
    },
  ];

  return (
    <>
      <div className={styles.subscriber_statsContainer}>
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

      <Graph/>
    </>
  );
};

export default RevenueData;
