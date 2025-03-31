import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../Context/DataProvider";
import { useAlert } from "../Context/AlertContext";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useData();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!isLoggedIn) {
      showAlert("error", "Please login to get access");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;