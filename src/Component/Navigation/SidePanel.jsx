import styles from "../../Styles/SidebarHeader.module.css";
import logo from "../../assets/Auth/logo.png";
import { RiChat3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import tabLogo from "../../assets/Auth/logo.png";
import { SidebarContext } from "../../Context/SidebarContext";
import SidebarMenuBtn from "./SidebarMenuBtn";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsBarChart } from "react-icons/bs";
import { PiSquaresFour } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";

const SidePanel = () => {
  const { showAlert } = useAlert();
  const { setIsLoggedIn } = useData();

  const [activePage, setActivePage] = useState(() => {
    const pathname = window.location.pathname.split("/")[1];
    switch (pathname) {
      case "partners":
        return "partners";
      case "category":
        return "category";
      case "menu":
        return "menu";
      case "help":
        return "help";
      default:
        return "dashboard";
    }
  });

  const { collapseSidebar, setCollapseSidebar, windoWidth } =
    useContext(SidebarContext);
  const navigate = useNavigate();

  const handleItemClick = (pageName, route) => {
    setActivePage(pageName);
    navigate(route);
    if (windoWidth < 1024) {
      setCollapseSidebar(true);
    }
  };

  const handleCollapse = () => {
    if (windoWidth < 1024) {
      setCollapseSidebar(true);
    }
  };

  const handleLogout = () => {
    showAlert("success", "Logout Successfully !");
    setIsLoggedIn(false);
    localStorage.removeItem("adminName");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {windoWidth > 1024 || (!collapseSidebar && windoWidth < 1024) ? (
        <div
          className={styles.res_sidebar_overlay}
          onClick={() => handleCollapse()}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`${styles.side_panel} ${
              collapseSidebar ? styles.collapsed_side_panel : null
            }`}
          >
            <div>
              {!collapseSidebar && (
                <div
                  className={styles.sidebarLogo}
                  onClick={() => navigate("/dashboard")}
                >
                  <img src={logo} alt="logo" />
                </div>
              )}
              {collapseSidebar && (
                <div
                  className={styles.collapsedLogo}
                  onClick={() => navigate("/dashboard")}
                >
                  <img src={tabLogo} alt="logo" />
                </div>
              )}

              <div className={styles.collapsepages}>
                <ul>
                  <SidebarMenuBtn
                    page={"dashboard"}
                    route={"/dashboard"}
                    icon={<BsBarChart />}
                    heading={"Dashboard"}
                    activePage={activePage}
                    handleItemClick={handleItemClick}
                    collapseSidebar={collapseSidebar}
                  />

                  <SidebarMenuBtn
                    page={"category"}
                    route={"/category"}
                    icon={<PiSquaresFour />}
                    heading={"Category"}
                    activePage={activePage}
                    handleItemClick={handleItemClick}
                    collapseSidebar={collapseSidebar}
                  />

                  <SidebarMenuBtn
                    page={"partners"}
                    route={"/partners"}
                    icon={<FaRegUser />}
                    heading={"Partners"}
                    activePage={activePage}
                    handleItemClick={handleItemClick}
                    collapseSidebar={collapseSidebar}
                  />

                  <SidebarMenuBtn
                    page={"menu"}
                    route={"/menu"}
                    icon={<MdOutlineRestaurantMenu />}
                    heading={"Menu Requests"}
                    activePage={activePage}
                    handleItemClick={handleItemClick}
                    collapseSidebar={collapseSidebar}
                  />

                  {/* <SidebarMenuBtn
                    page={"help"}
                    route={"/help"}
                    icon={<RiChat3Line />}
                    heading={"Help Center"}
                    activePage={activePage}
                    handleItemClick={handleItemClick}
                    collapseSidebar={collapseSidebar}
                  /> */}
                </ul>
              </div>
            </div>

            <div className={styles.log_Out} onClick={() => handleLogout()}>
              <FiLogOut />
              <span>Log out</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SidePanel;
