import React from "react";
import styles from "../../Styles/Auth.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const nav = useNavigate();

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
            className={styles.inputField}
            placeholder="Admin"
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
            className={styles.inputField}
            placeholder="Admin@123"
            aria-label="Password"
          />
        </div>
      </div>
      <button
        type="submit"
        className={styles.loginButton}
        onClick={() => nav("/dashboard")}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
