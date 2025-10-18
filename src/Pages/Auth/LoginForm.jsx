import React, { useEffect } from "react";
import styles from "../../Styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth/adminAuth";
import { useAlert } from "../../Context/AlertContext";
import { useData } from "../../Context/DataProvider";

const LoginForm = () => {
  const nav = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { showAlert } = useAlert();
  const { setadminName, setIsLoggedIn } = useData();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status == 200) {
        setadminName(username);
        localStorage.setItem("adminName", username);
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        showAlert("success", response.data.message);
        nav("/dashboard");
      } else {
        showAlert("error", "Invalid admin credentials.");
      }
    } catch (error) {
      console.error("Error: ", error);
      showAlert("error", error.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <form className={styles.formWrapper}>
      <h1 className={styles.loginTitle}>Login</h1>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.inputLabel}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
            placeholder="Username"
            aria-label="Username"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            placeholder="Password"
            aria-label="Password"
          />
        </div>
      </div>
      <button
        type="submit"
        className={styles.loginButton}
        onClick={handleSubmit}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
