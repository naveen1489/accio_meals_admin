import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../Styles/ViewDetails.module.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import { Button, Dropdown, Input, Menu } from "antd";
import SubscriberTable from "./SubscriberTable";
import RevenueData from "./RevenueData";
import { getPartnerById } from "../../api/partners/getPartners";
import ViewDetails from "./ViewDetails";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import { IoFilterSharp } from "react-icons/io5";

const PartnerDetails = () => {
  const [activeTab, setActiveTab] = useState("subscribers");
  const location = useLocation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [data, setData] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await getPartnerById(id);
      setData(response);
    } catch (error) {
      console.error("Error fetching partner details:", error);
    }
  };

  useEffect(() => {
    setActiveTab("subscribers");
    fetchRestaurantDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditable(true);
    setEditPopup(true);
  };

  const handleMenuClick = (e) => {
    setSelectedFilter(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="Inactive">Inactive</Menu.Item>
      <Menu.Item key="Pending">Pending</Menu.Item>
      <Menu.Item key="Completed">Completed</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <SidebarHeader
        headingText="Partner Details"
        subTitle="Details of the partner"
      >
        <div style={{ margin: "auto", marginTop: "2rem", width: "90%" }}>
          <div className={styles.upperDiv}>
            <div className={styles.card}>
              <div className={styles.header}>
                <div className={styles.user_info}>
                  <img
                    src={`https://cdn.blinkdish.com/${data.imageUrl}`}
                    alt="Partner"
                  />
                </div>

                <div>
                  <div className={styles.inputGroup}>
                    <label>Company Name</label>
                    <Input
                      placeholder="Company Name"
                      className={styles.inputField}
                      value={data.companyName || ""}
                      readOnly
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Name</label>
                    <Input
                      placeholder="Name"
                      className={styles.inputField}
                      value={`${data.nameTitle || ""} ${data.name || ""}`}
                      readOnly
                    />
                  </div>
                  <div>
                    <span>{data.subscriber || 0}</span>
                    <span>Subscriber</span>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <BiEdit className={styles.icon} onClick={handleEditClick} />
                <RiDeleteBin6Line
                  className={styles.icon}
                  onClick={() => setOpenDeletePopup(true)}
                />
              </div>
            </div>

            <div className={styles.dates}>
              <span>Addon date</span>
              <span>{new Date(data.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className={styles.details}>
            <h3>Personal Details</h3>
            <div>
              <p>Address </p> <p>:</p>
              <p>
                {data.addressLine1}, {data.addressLine2 || ""}, {data.city},{" "}
                {data.state} - {data.postalCode}, {data.country}
              </p>
            </div>
            <div>
              <p>Email ID </p> <p>:</p>
              <p>{data.emailId}</p>
            </div>
            <div>
              <p>Contact No </p> <p>:</p>
              <p>
                {data.countryCode} {data.contactNumber}
              </p>
            </div>
            <div>
              <p>Status </p> <p>:</p>
              <p>{data.status}</p>
            </div>
          </div>

          <div className={styles.tabContainer}>
            <RevenueData />
            <div className={styles.filter} style={{ marginBottom: "3rem" }}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button className={styles.category_button}>
                  <IoFilterSharp />{" "}
                  {selectedFilter.charAt(0).toUpperCase() +
                    selectedFilter.slice(1)}
                </Button>
              </Dropdown>
            </div>
            <SubscriberTable filter={selectedFilter} />
          </div>
        </div>

        {/* Edit Modal */}
        {editPopup && (
          <ViewDetails
            onClose={(updatedData) => {
              setEditPopup(false);
              if (updatedData) {
                fetchRestaurantDetails();
              }
            }}
            restaurant={data}
            isEditable={isEditable}
          />
        )}

        {/* Delete Modal */}
        {openDeletePopup && (
          <ConformationPopup
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
            route={"partners/view"}
            restaurantId={data}
          />
        )}
      </SidebarHeader>
    </div>
  );
};

export default PartnerDetails;
