import React, { useEffect, useState } from "react";
import styles from "../../Styles/Partners.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import { useData } from "../../Context/DataProvider";
import MenuDetails from "./MenuDetails";
import { Button } from "antd";
import { FiEye } from "react-icons/fi";
import noDataFound from "../../assets/Auth/noDatafound.png";

const HelpCards = ({ data, filter, searchText }) => {
  const [viewPopup, setViewPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { menuDetails, handleGetMenuDetails } = useData();
  const [selectedmenu, setSelectedmenu] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    handleGetMenuDetails();
  }, []);
  useEffect(() => {
    const SenderId = localStorage.getItem("menuId");
    if (SenderId) {
      const filteredMenu = menuDetails.filter(
        (menu) => menu.id == SenderId
      );
  
      if (filteredMenu.length > 0) {
        setIsEditable(false);
        setSelectedmenu(filteredMenu[0]);
        setViewPopup(true);
        localStorage.removeItem("menuId");
      }
    }
    
  }, [menuDetails]);
  //console.log("menuDetails", menuDetails);
  const handleViewClick = (menu) => {
    setIsEditable(false);
    setSelectedmenu(menu);
    setViewPopup(true);
  };

  const getStatusStyles = (status) => {
    return {
      background:
        status === "Approved"
          ? "#36973a2b"
          : status === "Rejected"
          ? "#f8d7da"
          : "#fff3cd",
      border:
        status === "Approved"
          ? "0.5px solid #36973a2b"
          : status === "Rejected"
          ? "0.5px solid #f8d7da"
          : "0.5px solid #fff3cd",
      mainBgColor:
        status === "Approved"
          ? "green"
          : status === "Rejected"
          ? "red"
          : "#ffcc80",
    };
  };

  const filteredData = (data?.length > 0 ? data : menuDetails)
    ?.filter((menu) => {
      if (filter === "all") return true;
      return menu.status === filter.charAt(0).toUpperCase() + filter.slice(1);
    })
    .filter((menu) => {
      const nameMatch = menu.restaurant?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const companyNameMatch = menu.restaurant?.companyName
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      return nameMatch || companyNameMatch;
    });

  return (
    <>
      {filteredData?.length > 0 ? (
        filteredData.map((menu, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.categoryInfo}>
                <img
                  src={`https://cdn.blinkdish.com/${menu?.restaurant?.imageUrl}`}
                  alt=""
                  style={{ width: "10rem", height: "10rem" }}
                />
                <div>
                  <h2>{menu.restaurant?.companyName || "Comapany Name"}</h2>
                  <h2>{menu.restaurant?.name || "Owner Name"}</h2>
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
                {menu.status === "Approved"
                  ? "Approved"
                  : menu.status === "Rejected"
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
                <p>{`${menu.restaurant?.addressLine1 || ""} ${
                  menu.restaurant?.city || "Address not found"
                } - ${menu.restaurant?.postalCode || "postalCode not found"}`}</p>
              </div>
              <div>
                <p>Email ID</p> <p>:</p>
                <p>{menu.restaurant?.emailId || "Email not available"}</p>
              </div>
              <div>
                <p>Contact No</p> <p>:</p>
                <p>{menu.restaurant?.contactNumber || "Contact not available"}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noData}>
          <img src={noDataFound} alt="no data found" />
        </div>
      )}

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
