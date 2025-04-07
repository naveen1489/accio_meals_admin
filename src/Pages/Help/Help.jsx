import React, { useState } from "react";
import styles from "../../Styles/Help.module.css";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import { FiSearch } from "react-icons/fi";
import { Button, Dropdown, Menu } from "antd"; 
import MenuDetails from "./MenuDetails";
import { IoFilterSharp } from "react-icons/io5";
import HelpCards from "./Cards";

const Help = () => {
  const [newCategory, setnewCategory] = useState(false);
  const [openPopup, setOpenpopup] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all"); 

  const handleMenuClick = (e) => {
    setSelectedFilter(e.key); 
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="pending">Pending</Menu.Item>
      <Menu.Item key="approved">Approved</Menu.Item>
      <Menu.Item key="rejected">Rejected</Menu.Item>
    </Menu>
  );

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

          <Dropdown overlay={menu} trigger={['click']}>
            <Button className={styles.category_button}>
              <IoFilterSharp /> Filter
            </Button>
          </Dropdown>
        </div>

        <div className={styles.cards_details}>
          <HelpCards filter={selectedFilter} />
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
