import React, { useState } from "react";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import styles from "../../Styles/Partners.module.css";
import PartnersCard from "./Cards";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import AddPartners from "./AddPartners";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import { Button } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2Square } from "react-icons/bs";

const Partners = () => {
  const [addCategory, setaddCategory] = useState(false);
  const [openPopup, setOpenpopup] = useState(false);

  return (
    <SidebarHeader
      headingText={"Partners"}
      subTitle={"Here is the information about all your Partners"}
    >
      <div style={{ marginTop: "1rem" }}>
        <div className={styles.search_category}>
          <div>
            <input type="text" placeholder="Search..." />
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
          <PartnersCard /> 
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
            text={<>successfully saved a Change<span style={{color: '#F15A5C'}}>Partner</span></>}
            leftBtn={true}
          />
        )}
      </div>
    </SidebarHeader>
  );
};

export default Partners;
