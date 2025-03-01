import React from "react";
import styles from "../../Styles/Auth.module.css";
import LoginForm from "./LoginForm";
import tiffin_image from "../../assets/Auth/tiffin.png";
import logo from "../../assets/Auth/logo.png";

const Login = () => {
  return (
    <div className={styles.loginDashboard}>
      <div className={styles.auth_container}>
        <div>
          <img src={tiffin_image} alt="tifin image" />
          <img src={logo} alt="logo" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
