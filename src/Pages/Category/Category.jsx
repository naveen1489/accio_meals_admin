import React, { useState } from "react";
import styles from "../../Styles/Category.module.css";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import { FiSearch } from "react-icons/fi";
import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import CategoryCard from "./Cards";
import AddCategory from "./AddCategory";
import ConformationPopup from "../../Component/Popup/ConformationPopup";

const Category = () => {
  const [addCategory, setaddCategory] = useState(false);
  const [openPopup, setOpenpopup] = useState(false);

  return (
    <SidebarHeader
      headingText={"Category"}
      subTitle={"Here is the information about all your Category"}
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
            <AiOutlinePlus /> Category
          </Button>
        </div>

        <div className={styles.cards_details}>
          <CategoryCard /> <CategoryCard />
        </div>

        {addCategory && (
          <AddCategory
            isOpen={addCategory}
            onClose={() => setaddCategory(false)}
            isPopupOpen={setOpenpopup}
          />
        )}
        {openPopup && <ConformationPopup onClose={() => setOpenpopup(false)} />}
      </div>
    </SidebarHeader>
  );
};

export default Category;
