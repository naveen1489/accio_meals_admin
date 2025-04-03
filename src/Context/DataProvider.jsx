import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPartners } from "../api/partners/getPartners";
import { getCategory } from "../api/category/category";

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
  console.log("categoryData", categoryData);
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
        handleGetAllPartnersData,
        handleGetAllCategoryData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
