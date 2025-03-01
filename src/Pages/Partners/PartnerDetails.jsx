import React, { useState } from "react";
import styles from "../../Styles/ViewDetails.module.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import { Button, Input } from "antd";
import SubscriberTable from "./SubscriberTable";
import RevenueData from "./RevenueData";

const PartnerDetails = () => {
  const [activeTab, setActiveTab] = useState("subscriber");

  return (
    <SidebarHeader
      headingText={"Partners"}
      subTitle={"Here is the information about all your Partners"}
    >
      <div style={{ margin: "auto", marginTop: "2rem", width: "90%" }}>
        <div className={styles.upperDiv}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.user_info}>
                <img
                  src="https://i.pinimg.com/736x/12/d6/94/12d694f54fa6c8ddaf26a193c858de0c.jpg"
                  alt=""
                />
              </div>

              <div>
                <div className={styles.inputGroup}>
                  <label>Company Name</label>
                  <Input
                    placeholder="Company Name"
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Name</label>
                  <Input placeholder="Name" className={styles.inputField} />
                </div>
                <div>
                  <span>1200</span>
                  <span>Subscriber</span>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <BiEdit className={styles.icon} />
              <RiDeleteBin6Line className={styles.icon} />
            </div>
          </div>

          <div className={styles.dates}>
            <span>Addon date</span>
            <span>14 Feb, 2025</span>
          </div>
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

        <div className={styles.calculation_btns}>
        <Button
          className={activeTab === "subscribers" ? styles.activeButton : styles.inactiveButton}
          onClick={() => setActiveTab("subscribers")}
        >
          Total Subscriber
        </Button>
        <Button
          className={activeTab === "revenue" ? styles.activeButton : styles.inactiveButton}
          onClick={() => setActiveTab("revenue")}
        >
          Total Revenue
        </Button>
      </div>

      {activeTab === "subscribers" && <SubscriberTable />}
      {activeTab === "revenue" && <RevenueData />}
      </div>
    </SidebarHeader>
  );
};

export default PartnerDetails;
