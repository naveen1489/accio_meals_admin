import React, { useEffect, useState } from "react";
import styles from "../../Styles/Partners.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import { useData } from "../../Context/DataProvider";
import MenuDetails from "./MenuDetails";
import { Button } from "antd";
import { FiEye } from "react-icons/fi";

const HelpCards = ({ data }) => {
  const [viewPopup, setViewPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { menuDetails, handleGetMenuDetails } = useData();
  const [selectedmenu, setSelectedmenu] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  console.log("menuDetails", menuDetails);
  useEffect(() => {
    //const SenderId = localStorage.getItem("SenderId");
    //const SenderId = localStorage.removeItem("SenderId");
    handleGetMenuDetails();
  }, []);

  const handleViewClick = (menu) => {
    setIsEditable(false);
    setSelectedmenu(menu);
    setViewPopup(true);
  };

  const getStatusStyles = (status) => {
    return {
      background:
        status == "Approved"
          ? "#36973a2b"
          : status == "Rejected"
          ? "#f8d7da"
          : "#fff3cd",
      border:
        status == "Approved"
          ? "0.5px solid #36973a2b"
          : status == "Rejected"
          ? "0.5px solid #f8d7da"
          : "0.5px solid #fff3cd",
      mainBgColor:
        status == "Approved"
          ? "green"
          : status == "Rejected"
          ? "red"
          : "#ffcc80",
    };
  };

  return (
    <>
      {(data?.length > 0 ? data : menuDetails)?.map((menu, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <div className={styles.categoryInfo}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1yMxBVI-74dtHiEy0qHBtwrXEaLyhN-PWQ&s"
                alt=""
                style={{ width: "10rem", height: "10rem" }}
              />
              <div>
                <h2>{menu.menuName || "Menu Name"}</h2>
                <h2>{menu.name || "Restaurant Name"}</h2>

                {/* <div className={styles.subscriber}>
                  <h1>{menu.subscriberCount || "0"}</h1>
                  <span>Subscriber</span>
                </div> */}
              </div>
            </div>
            <div className={styles.status}>
              <div
                style={{
                  background: getStatusStyles(menu.status).background,
                  border: getStatusStyles(menu.status).border,
                }}
              >
                <div
                  style={{
                    background: getStatusStyles(menu.status).mainBgColor,
                    border: getStatusStyles(menu.status).border,
                  }}
                ></div>
              </div>
              {menu.status == "Approved"
                ? "Approved"
                : menu.status == "Rejected"
                ? "Rejected"
                : "Pending"}
            </div>
          </div>

          <div className={styles.actions}>
            <div>
              <span className={styles.request}>Request:</span>
              <Button className={styles.newMenuBtn}>New Menu</Button>
              <FiEye
                className={styles.icon}
                onClick={() => handleViewClick(menu)}
              />
            </div>
          </div>

          <div className={styles.details}>
            <h3>Personal Details</h3>
            <div>
              <p>Address</p> <p>:</p>
              <p>{`${menu.addressLine1 || ""} ${
                menu.city || "Address not found"
              } - ${menu.postalCode || "postalCode not found"}`}</p>
            </div>
            <div>
              <p>Email ID</p> <p>:</p>
              <p>{menu.emailId || "Email not available"}</p>
            </div>
            <div>
              <p>Contact No</p> <p>:</p>
              <p>{menu.contactNumber || "Contact not available"}</p>
            </div>
          </div>
        </div>
      ))}

      {viewPopup && (
        <MenuDetails
          onClose={() => setViewPopup(false)}
          menu={selectedmenu}
          isEditable={isEditable}
        />
      )}
      {openDeletePopup && (
        <ConformationPopup
          route={"help"}
          menuId={selectedmenu}
          onClose={() => setOpenDeletePopup(false)}
          icon={<RiDeleteBin6Line />}
          text={
            <>
              You are about to delete a{" "}
              <span style={{ color: "#F15A5C" }}>Partner</span>
            </>
          }
          leftBtn={true}
          rightBtn={true}
        />
      )}
    </>
  );
};

export default HelpCards;
