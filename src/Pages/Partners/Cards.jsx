import React, { useEffect, useState } from "react";
import styles from "../../Styles/Partners.module.css";
import { Spin } from "antd";
import noDataFound from "../../assets/Auth/noDatafound.png";
import { TbEye } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ViewDetails from "./ViewDetails";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import { useData } from "../../Context/DataProvider";
import { useNavigate } from "react-router-dom";

const PartnersCard = ({ data }) => {
  const [viewPopup, setViewPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { restaurantData, handleGetAllPartnersData } = useData();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.resolve(handleGetAllPartnersData()).finally(() => setLoading(false));
  }, []);

  const handleViewClick = (restaurant) => {
    setIsEditable(false);
    setSelectedRestaurant(restaurant);
    setViewPopup(true);
    navigate(`/partners/view?id=${restaurant.id}`);
  };

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsEditable(true);
    setEditPopup(true);
  };

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.cardsContainer}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : data?.length === 0 ? (
          <div className={styles.noData}>
            <img src={noDataFound} alt="no data found" />
          </div>
        ) : (
          (data?.length > 0 ? data : restaurantData).map((restaurant, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.categoryInfo}>
                  <img
                    src={`https://cdn.blinkdish.com/${restaurant.imageUrl}`}
                    alt=""
                    style={{ width: "10rem", height: "10rem" }}
                  />
                  <div>
                    <h2>{restaurant.companyName || "Restaurant Name"}</h2>
                    <h2>{restaurant.name || "Contact Person Name"}</h2>

                    <div className={styles.subscriber}>
                      <h1>{restaurant.subscriberCount || "0"}</h1>
                      <span>Subscriber</span>
                    </div>
                  </div>
                </div>
                <div className={styles.status}>
                  <div
                    style={{
                      background:
                        restaurant.status == "Active" ? "#36973a2b" : "#fff3cd",
                      border:
                        restaurant.status == "Active"
                          ? "0.5px solid #36973a2b"
                          : "0.5px solid #fff3cd",
                    }}
                  >
                    <div
                      style={{
                        background:
                          restaurant.status == "Active" ? "green" : "#ffcc80",
                        border:
                          restaurant.status == "Active"
                            ? "0.5px solid green"
                            : "0.5px solid #ffcc80",
                      }}
                    ></div>
                  </div>
                  {restaurant.status == "Active"
                    ? "Active"
                    : "Inactive" || "Status"}
                </div>
              </div>

              <div className={styles.actions}>
                <TbEye
                  className={styles.icon}
                  onClick={() => handleViewClick(restaurant)}
                />
                <BiEdit
                  className={styles.icon}
                  onClick={() => handleEditClick(restaurant)}
                />
                <RiDeleteBin6Line
                  className={styles.icon}
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setOpenDeletePopup(true);
                  }}
                />
              </div>

              <div className={styles.details}>
                <h3>Personal Details</h3>
                <div>
                  <p>Address</p> <p>:</p>
                  <p>{`${restaurant.addressLine1 || ""}, ${restaurant.city || ""
                    } - ${restaurant.postalCode || ""}`}</p>
                </div>
                <div>
                  <p>Email ID</p> <p>:</p>
                  <p>{restaurant.emailId || "Email not available"}</p>
                </div>
                <div>
                  <p>Contact No</p> <p>:</p>
                  <p>{restaurant.contactNumber || "Contact not available"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editPopup && (
        <ViewDetails
          onClose={() => setEditPopup(false)}
          restaurant={selectedRestaurant}
          isEditable={isEditable}
        />
      )}

      {/* {viewPopup && (
        <PartnerDetails
          onClose={() => setViewPopup(false)}
          restaurant={selectedRestaurant}
        />
      )} */}

      {openDeletePopup && (
        <ConformationPopup
          route={"partners"}
          restaurantId={selectedRestaurant}
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
    </div>
  );
};

export default PartnersCard;
