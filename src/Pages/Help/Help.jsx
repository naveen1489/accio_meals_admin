import React, { useState } from "react";
import styles from "../../Styles/Help.module.css";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import { FiSearch } from "react-icons/fi";
import HelpCards from "./Cards";

const Help = () => {
  const [newCategory, setnewCategory] = useState(false);
  const [openPopup, setOpenpopup] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <SidebarHeader
      headingText={"Help Center"}
      subTitle={"Here is the information about all your Help Center."}
    >
      <div style={{ marginTop: "1rem" }}>
        <div className={styles.search_category}>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FiSearch />
          </div>
        </div>

        <div className={styles.cards_details}>
          <HelpCards searchText={searchText} /> 
        </div>

        {newCategory && (
          <MenuDetails
            isOpen={newCategory}
            onClose={() => setnewCategory(false)}
            isPopupOpen={setOpenpopup}
          />
        )}
      </div>
    </SidebarHeader>
  );
};

export default Help;
