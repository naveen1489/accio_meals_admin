import React, { useEffect, useState } from "react";
import styles from "../../Styles/Partners.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import noDataFound from "../../assets/Auth/noDatafound.png";
import { getAdminMessage } from "../../api/dashboard/getData";
import { Spin } from "antd";
import { Pagination } from "antd";
import { FALLBACK_IMAGE_URL } from "../../api/Uploads/fileImg";

const HelpCards = ({ data, filter, searchText }) => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedmenu, setSelectedmenu] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await getAdminMessage(page, 10);
        if (response && response.messages) {
          setMessages(response.messages);
          setTotal(response.total || response.totalMessages || 0);
        }
      } catch (error) {
        console.error("Error fetching admin messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [page]);

  const getRoleStyles = (userRole) => {
    return {
      background:
        userRole === "restaurant"
          ? "#36973a2b"
          : userRole === "customer"
          ? "#e3f2fd"
          : "#fff3cd",
      border:
        userRole === "restaurant"
          ? "0.5px solid #36973a2b"
          : userRole === "customer"
          ? "0.5px solid #e3f2fd"
          : "0.5px solid #fff3cd",
      mainBgColor:
        userRole === "restaurant"
          ? "green"
          : userRole === "customer"
          ? "blue"
          : "#ffcc80",
    };
  };

  const filteredData = (data?.length > 0 ? data : messages)
    ?.filter((message) => {
      const nameMatch = message.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const userDetailsNameMatch = message?.userDetails?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const companyNameMatch = message?.userDetails?.companyName
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const emailMatch = message.emailId
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const messageMatch = message.message
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      return nameMatch || userDetailsNameMatch || companyNameMatch || emailMatch || messageMatch;
    });

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.cardsContainer}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : filteredData?.length > 0 ? (
          <>
            {filteredData.map((message, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.header}>
                  <div className={styles.categoryInfo}>
                    <div>
                      <img
                        src={message?.userDetails?.profilePic ? `https://cdn.blinkdish.com/${message?.userDetails?.profilePic}` : FALLBACK_IMAGE_URL}
                        alt="profilepic"
                      />
                    </div>
                    <div>
                      <h2>
                        {message?.userDetails?.companyName ||
                          message?.userDetails?.name}
                      </h2>
                      {message?.userRole == "restaurant" && (
                        <h2>{message?.userDetails?.name || ""}</h2>
                      )}
                    </div>
                  </div>
                  <div className={styles.status}>
                    <div
                      style={{
                        background: getRoleStyles(message.userRole).background,
                        border: getRoleStyles(message.userRole).border,
                      }}
                    >
                      <div
                        style={{
                          background: getRoleStyles(message.userRole).mainBgColor,
                          border: getRoleStyles(message.userRole).border,
                        }}
                      ></div>
                    </div>
                    {message.userRole === "restaurant"
                      ? "Restaurant"
                      : message.userRole === "customer"
                      ? "Customer"
                      : message.userRole}
                  </div>
                </div>

                <div className={styles.details}>
                  <h3>Details</h3>
                  <div>
                    <textarea
                      value={message.message || "No message available"}
                      readOnly
                    />
                  </div>
                  <div>
                    <p>Name</p> <p>:</p>
                    <p>{message?.userDetails?.name || "Name not available"}</p>
                  </div>
                  <div>
                    <p>Mobile</p> <p>:</p>
                    <p>{message?.userDetails?.mobile || ""}</p>
                  </div>
                  <div>
                    <p>Email ID</p> <p>:</p>
                    <p>{message?.userDetails?.email || "Email not available"}</p>
                  </div>
                  <div>
                    <p>Created At</p> <p>:</p>
                    <p>
                      {message.createdAt 
                        ? new Date(message.createdAt).toLocaleDateString('en-GB')
                        : "Date not available"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.noData}>
            <img src={noDataFound} alt="no data found" />
          </div>
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          current={page}
          pageSize={10}
          total={total}
          onChange={p => setPage(p)}
          showSizeChanger={false}
        />
      </div>
      {openDeletePopup && (
        <ConformationPopup
          route={"help"}
          menuId={selectedmenu}
          onClose={() => setOpenDeletePopup(false)}
          icon={<RiDeleteBin6Line />}
          text={
            <>
              You are about to delete a{" "}
              <span style={{ color: "#F15A5C" }}>Message</span>
            </>
          }
          leftBtn={true}
          rightBtn={true}
        />
      )}
    </div>
  );
};

export default HelpCards;
