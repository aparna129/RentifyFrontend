import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../SharedComponents/Header";
import Footer from "../SharedComponents/Footer";

function Login() {
  const navigate = useNavigate();
  const handleCreateAccountText = () => {
    navigate("/signup");
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setLoginData({ ...loginData, [field]: value });
  };

  const [continueBtnClicked, setContinueBtnClicked] = useState(false);

  const [error, setError] = useState(false);

  const handleContinueBtn = () => {
    if (loginData.email.length === 0 || loginData.password.length === 0) {
      setError(true);
    } else {
      setError(false);
      setContinueBtnClicked(true);
      setLoading(true);
      handleLogin();
    }
  };

  const [loading, setLoading] = useState(true);

  const baseUrl = localStorage.getItem("baseUrl");

  const [backendError, setBackendError] = useState("");

  const handleLogin = () => {
    axios
      .post(`${baseUrl}login`, loginData)
      .then((response) => {
        const {
          message,
          jwttoken,
          userId,
          firstName,
          lastName,
          email,
          mobile,
        } = response.data;
        setLoading(false);
        setError("");
        toast.success(message);
        localStorage.setItem("jwttoken", jwttoken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
        navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setBackendError(error.response.data.error);
        } else {
          setBackendError("Oops! An error occurred.Try again after some time");
        }
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.loginSection}>
        <div className={styles.welcomeText}>Welcome to Rentify!</div>
        <p className={styles.loginHere}>Login here</p>

        <form className={styles.form}>
          <p>
            <span className={styles.fields}>Enter Your Email :</span>
            
            <input  className={styles.inputBox}
              type="text"
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
            ></input>
          </p>

          {error && loginData.email.length === 0 && (
            <p className={styles.error}>* Email is required</p>
          )}

          <p>
            <span className={styles.fields}>Enter Your Password :</span>
            <input  className={styles.inputBox}
              type="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter your password"
            ></input>
          </p>

          {error && loginData.password.length === 0 && (
            <p className={styles.error}>* Password is required</p>
          )}

          {backendError && !error && (
            <p className={styles.error}>{backendError}</p>
          )}
        </form>

        <button className={styles.loginBtn} onClick={handleContinueBtn}>Login</button>

        <p className={styles.dontHaveAccountText}>
          Don't have an Account ? {" "}
          <u>
            <span className={styles.createAccount} onClick={handleCreateAccountText}>Create Account Here</span>
          </u>
        </p>

        {loading && continueBtnClicked && (
          <div className={styles.loaderContainer}>
            <div className={styles.loaderBackground} />
            <ClipLoader color={"black"} loading={loading} />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
