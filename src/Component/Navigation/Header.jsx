import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../Styles/SidebarHeader.module.css";
import { useData } from "../../Context/DataProvider";
import { MdMenu } from "react-icons/md";
import { SidebarContext } from "../../Context/SidebarContext";
import { HiOutlineBell } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import NavNotification from "./NavNotification";
const Header = ({ heading, subTitle }) => {
  const { adminName } = useData();
  //   const { showAlert } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const { collapseSidebar, setCollapseSidebar } = useContext(SidebarContext);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`${collapseSidebar ? styles.collapseHeader : styles.header}`}
    >
      <button
        className={styles.hamburger}
        onClick={() => setCollapseSidebar(!collapseSidebar)}
        style={{ zIndex: "999" }}
      >
        <MdMenu className={`${styles.hamburgerIcon}`} />
      </button>

      <div className={styles.heading_div}>
        <span className={styles.headerText}>{heading}</span>
        <span>{subTitle}</span>
      </div>
        
        <div className={styles.notification_div}>
          <NavNotification />
          <div><FaRegUserCircle />{adminName || "Hello Admin"}</div>
        </div>
    </header>
  );
};

export default Header;
