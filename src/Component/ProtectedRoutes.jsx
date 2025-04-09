import { Navigate } from "react-router-dom";
import { useData } from "../Context/DataProvider";
import { useAlert } from "../Context/AlertContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useData();
  const {showAlert } = useAlert();

  if (isLoggedIn === false) {
    return null; 
  }
  if (!isLoggedIn) {
    showAlert("error", "Please login to get access !")
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
