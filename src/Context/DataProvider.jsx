import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPartners } from "../api/partners/getPartners";

const DataContext = createContext();
export default function DataProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userDetails, setUserDetails] = useState({});
  const hasCheckedLogin = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setadminName] = useState(() => localStorage.getItem("adminName") || "");
  const [restaurantData, setRestaurantData] = useState([]);

  const checkLogin = async () => {
    try {
        const response = "";
    //   const response = await getUserDetails();
      if (response?.status) {
        setIsLoggedIn(true);
        setUserDetails(response.data);
      } else {
        throw new Error("User not logged in");
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };


  useEffect(() => {
    const verifyLogin = async () => {
      if (!hasCheckedLogin.current) {
        hasCheckedLogin.current = true;
        await checkLogin();
        if (
          isLoggedIn &&
          (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup")
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

    const handleGetAllData = async () => {
      try {
        const response = await getPartners();
        console.log("Fetched Data:", response);
  
        if (Array.isArray(response)) {
          setRestaurantData([...response]);
        } else {
          console.log("Unexpected response format", response);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
  

  return (
    <DataContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        checkLogin,
        userDetails,
        adminName,
        setadminName,
        restaurantData,
        setRestaurantData,
        handleGetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
