import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPartners } from "../api/partners/getPartners";
import { getCategory } from "../api/category/category";
import { getallMenuDetails } from "../api/menu/getMenuDetails";
import { getNotification } from "../api/notification/index";
import { getDashboardData } from "../api/dashboard/getData";

const DataContext = createContext();
export default function DataProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginChecking, setIsLoginChecking] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const hasCheckedLogin = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setadminName] = useState(
    () => localStorage.getItem("adminName") || ""
  );
  const [restaurantData, setRestaurantData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [menuDetails, setmenuDetails] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [notificationCount, setNotificationCount] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [totalMenus, setTotalMenus] = useState(0);
  const [currentMenuPage, setCurrentMenuPage] = useState(1);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

  const checkLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = { status: true, data: { name: "Admin" } };
      if (response?.status) {
        setIsLoggedIn(true);
        setUserDetails(response.data);
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      console.error("Login check failed:", error.message);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
      setIsLoginChecking(false); 
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      if (!hasCheckedLogin.current) {
        hasCheckedLogin.current = true;
        await checkLogin();
      }
    };
    verifyLogin();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !isLoginChecking && 
        isLoggedIn &&
        (location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/signup")
      ) {
        await handleDashboardData();
        await handleGetAllPartnersData();
        await handleGetAllCategoryData();
        await handleGetMenuDetails();
        navigate("/dashboard");
      }
    };
    fetchData();
  }, [isLoggedIn, isLoginChecking, location.pathname]);

  useEffect(() => {
    if (adminName) {
      localStorage.setItem("adminName", adminName);
    }
  }, [adminName]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleDashboardData = async () => {
    try {
      const response = await getDashboardData();
      if (response && typeof response === "object") {
        setDashboardData(response); 
      } else {
        console.log("Unexpected response format", response);
      }
    } catch (error) {
      console.log("Error fetching dashboard data", error);
    }
  };


  const handleGetAllPartnersData = async () => {
    try {
      const response = await getPartners();
      if (Array.isArray(response)) {
        setRestaurantData([...response]);
      } else {
        console.log("Unexpected response format", response);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleGetAllCategoryData = async () => {
    try {
      const response = await getCategory();
      if (Array.isArray(response)) {
        setCategoryData([...response]);
      } else {
        console.log("Unexpected response format", response);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleGetMenuDetails = async (page = 1, limit = 10) => {
    try {
      const response = await getallMenuDetails(page, limit);
      if (response && Array.isArray(response.menus)) {
        setmenuDetails([...response.menus]);
        setTotalMenus(response.totalMenus || response.total || 0);
        setCurrentMenuPage(response.currentPage || page);
        return response;
      } else {
        setTotalMenus(0);
        setCurrentMenuPage(page);
        console.log("Unexpected response format", response);
        return { menus: [], total: 0 };
      }
    } catch (error) {
      setTotalMenus(0);
      setCurrentMenuPage(page);
      console.log("Error fetching menu details", error);
      return { menus: [], total: 0 };
    }
  };

  const handleGetAllNotificationList = async () => {
    try {
      const response = await getNotification();
      if (Array.isArray(response.notifications)) {
        setNotificationData([...response.notifications]);
      } else {
        console.log("Unexpected response format", response);
      }
      if (Array.isArray(response.notificationsCount)) {
        setNotificationCount([...response.notificationsCount]);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        setIsLoggedIn,
        checkLogin,
        userDetails,
        adminName,
        setadminName,
        restaurantData,
        setRestaurantData,
        categoryData,
        setCategoryData,
        menuDetails,
        notificationData,
        setNotificationCount,
        notificationCount,
        setNotificationData,
        handleGetAllNotificationList,
        setmenuDetails,
        handleGetAllPartnersData,
        handleGetAllCategoryData,
        handleGetMenuDetails,
        handleDashboardData,
        dashboardData,
        setDashboardData,
        totalMenus,
        currentMenuPage,
        setCurrentMenuPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
