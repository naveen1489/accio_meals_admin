import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPartners } from "../api/partners/getPartners";
import { getCategory } from "../api/category/category";
import { getallMenuDetails } from "../api/menu/getMenuDetails";
import { getNotification } from "../api/notification/index";

const DataContext = createContext();
export default function DataProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false; 
  });
  const [isLoading, setIsLoading] = useState(true); 
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
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
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      if (!hasCheckedLogin.current) {
        hasCheckedLogin.current = true;
        await checkLogin();
        if (
          isLoggedIn &&
          (location.pathname === "/" ||
            location.pathname === "/login" ||
            location.pathname === "/signup")
        ) {
          await handleGetAllPartnersData(); 
          await handleGetAllCategoryData();
          await handleGetMenuDetails();
          navigate("/dashboard");
        }
      }
    };
    verifyLogin();
  }, [isLoggedIn, location.pathname]);

  useEffect(() => {
    if (adminName) {
      localStorage.setItem("adminName", adminName);
    }
  }, [adminName]);

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

  const handleGetMenuDetails = async () => {
    try {
      const response = await getallMenuDetails();
      console.log("Menu Details Response:", response);
      if (response && Array.isArray(response.menus)) {
        setmenuDetails([...response.menus]); 
      } else {
        console.log("Unexpected response format", response);
      }
    } catch (error) {
      console.log("Error fetching menu details", error);
    }
  };

  const handleGetAllNotificationList = async () => {
      try {
        const response = await getNotification();
        if (Array.isArray(response.notifications)) {
          console.log("Notification Response:", response);
          setNotificationData([...response.notifications]);
        } else {
          console.log("Unexpected response format", response);
        }
        if(Array.isArray(response.notificationsCount)){
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
