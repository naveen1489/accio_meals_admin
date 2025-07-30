import React, { useState } from "react";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import styles from "../../Styles/Partners.module.css";
import PartnersCard from "./Cards";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import AddPartners from "./AddPartners";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import { Button } from "antd";
import { BsCheck2Square } from "react-icons/bs";
import { useData } from "../../Context/DataProvider";

const Partners = () => {
  const [addCategory, setaddCategory] = useState(false);
  const [openPopup, setOpenpopup] = useState(false);
  const { restaurantData } = useData();
  const [searchData, setSearchData] = useState("");

  const handleSearch = (e) => {
    setSearchData(e.target.value.toLowerCase());
  };

  // Filter restaurantData based on searchData
  const filteredData = restaurantData.filter((item) => {
    return (
      (item.name?.toLowerCase() || "").includes(searchData) ||
      (item.companyName?.toLowerCase() || "").includes(searchData) ||
      (item.emailId?.toLowerCase() || "").includes(searchData) ||
      (item.contactNumber?.toLowerCase() || "").includes(searchData)
    );
  });

  return (
    <SidebarHeader
      headingText={"Partners"}
      subTitle={"Here is the information about all your Partners"}
    >
      <div style={{ marginTop: "1rem" }}>
        <div className={styles.search_category}>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchData}
              onChange={(e) => handleSearch(e)}
            />
            <FiSearch />
          </div>

          <Button
            className={styles.category_button}
            onClick={() => setaddCategory(true)}
          >
            <AiOutlinePlus /> Add Partner
          </Button>
        </div>

        <div className={styles.cards_details}>
          <PartnersCard data={filteredData} />
        </div>

        {addCategory && (
          <AddPartners
            isOpen={addCategory}
            onClose={() => setaddCategory(false)}
            isPopupOpen={setOpenpopup}
          />
        )}
        {openPopup && (
          <ConformationPopup
            onClose={() => setOpenpopup(false)}
            icon={<BsCheck2Square />}
            text={
              <>
                successfully saved a Change
                <span style={{ color: "#F15A5C" }}>Partner</span>
              </>
            }
            leftBtn={true}
          />
        )}
      </div>
    </SidebarHeader>
  );
};

export default Partners;
