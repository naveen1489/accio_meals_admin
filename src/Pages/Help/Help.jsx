import React, { useState } from "react";
import styles from "../../Styles/Help.module.css";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import { FiSearch } from "react-icons/fi";
import { Button } from "antd";
import PartnersCard from "../Partners/Cards";
import MenuDetails from "./MenuDetails";
import { IoFilterSharp } from "react-icons/io5";
import HelpCards from "./Cards";

const Help = () => {
  const [newCategory, setnewCategory] = useState(false);
  const [openPopup, setOpenpopup] = useState(false);

  return (
    <SidebarHeader
      headingText={"Help Center"}
      subTitle={"Here is the information about all your Help Center"}
    >
      <div style={{ marginTop: "1rem" }}>
        <div className={styles.search_category}>
          <div>
            <input type="text" placeholder="Search..." />
            <FiSearch />
          </div>

          <Button
            className={styles.category_button}
            onClick={() => setnewCategory(true)}
          >
            <IoFilterSharp /> New Request
          </Button>
        </div>

        <div className={styles.cards_details}>
          <HelpCards/>
        </div>

        {newCategory && (
          <MenuDetails
            isOpen={newCategory}
            onClose={() => setnewCategory(false)}
            isPopupOpen={setOpenpopup}
          />
        )}
        {/* {openPopup && <MenuDetails onClose={() => setOpenpopup(false)} />} */}
      </div>
    </SidebarHeader>
  );
};

export default Help;
