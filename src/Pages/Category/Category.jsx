import React, { useEffect, useState } from "react";
import styles from "../../Styles/Category.module.css";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import { FiSearch } from "react-icons/fi";
import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import CategoryCard from "./Cards";
import AddCategory from "./AddCategory";
import ConformationPopup from "../../Component/Popup/ConformationPopup";
import { BsCheck2Square } from "react-icons/bs";
import { useData } from "../../Context/DataProvider";

const Category = () => {
  const [addCategory, setaddCategory] = useState(false);
  const [openPopup, setOpenpopup] = useState(false);
  const { categoryData, handleGetAllCategoryData } = useData();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    handleGetAllCategoryData();
  }, []);

  const handleSearch = (e) => {
    setSearchData(e.target.value.toLowerCase());
  };

  // Filter restaurantData based on searchData
  const filteredData = categoryData?.filter((item) => {
    return (
      item.categoryName.toLowerCase().includes(searchData) ||
      item.description.toLowerCase().includes(searchData)
    );
  });

  console.log("caregoryData", categoryData);
  return (
    <SidebarHeader
      headingText={"Category"}
      subTitle={"Here is the information about all your Category"}
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
            <AiOutlinePlus /> Category
          </Button>
        </div>

        <div className={styles.cards_details}>
          <CategoryCard data={filteredData}/> 
        </div>

        {addCategory && (
          <AddCategory
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
                successfully saved a Change{" "}
                <span style={{ color: "#F15A5C" }}>Category</span>
              </>
            }
            leftBtn={true}
          />
        )}
      </div>
    </SidebarHeader>
  );
};

export default Category;
