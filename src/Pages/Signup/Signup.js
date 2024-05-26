import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../SharedComponents/Header";
import Footer from "../SharedComponents/Footer";

function Signup() {
  const navigate = useNavigate();
  const handleLoginText = () => {
    navigate("/login");
  };

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setSignupData({ ...signupData, [field]: value });
  };

  const [continueBtnClicked, setContinueBtnClicked] = useState(false);

  const [error, setError] = useState(false);

  const handleContinueBtn = () => {
    if (
      signupData.firstName.length === 0 ||
      signupData.lastName.length === 0 ||
      signupData.email.length === 0 ||
      signupData.mobile.length === 0 ||
      signupData.mobile.length !== 10 ||
      signupData.password.length === 0
    ) {
      setError(true);
    } else {
      setError(false);
      setContinueBtnClicked(true);
      setLoading(true);
      handleSignUp();
    }
  };

  const [loading, setLoading] = useState(true);

  const baseUrl = localStorage.getItem("baseUrl");

  const [backendError, setBackendError] = useState("");

  const handleSignUp = () => {
    axios
      .post(`${baseUrl}signup`, signupData)
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
    <div className={styles.signupPage}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.signupSection}>
        <div className={styles.welcomeText}>Welcome to Rentify!</div>
        <p className={styles.createAccount}>Create your account here</p>

        <form className={styles.form}>
          <p>
            <span className={styles.fields}>Enter Your Firstname :</span>
            <input
              className={styles.inputBox}
              type="text"
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter your first name"
            ></input>
          </p>

          {error && signupData.firstName.length === 0 && (
            <p className={styles.error}>* Firstname is required</p>
          )}

          <p>
            <span className={styles.fields}>Enter Your Lastname : </span>
            <input
              className={styles.inputBox}
              type="text"
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Enter your last name"
            ></input>
          </p>

          {error && signupData.lastName.length === 0 && (
            <p className={styles.error}>* Lastname is required</p>
          )}

          <p>
            <span className={styles.fields}>Enter Your Email : </span>
            <input
              className={styles.inputBox}
              type="text"
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
            ></input>
          </p>

          {error && signupData.email.length === 0 && (
            <p className={styles.error}>* Email is required</p>
          )}

          <p>
            <span className={styles.fields}>Enter Your Mobile : </span>
            <input
              className={styles.inputBox}
              type="text"
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              placeholder="Enter your mobile no"
            ></input>
          </p>

          {error && signupData.mobile.length === 0 && (
            <p className={styles.error}>* Mobile is required</p>
          )}

          {error &&
            signupData.mobile.length !== 0 &&
            signupData.mobile.length !== 10 && (
              <p className={styles.error}>* Mobile no is invalid</p>
            )}

          <p>
            <span className={styles.fields}>Enter Your Password :</span>

            <input
              className={styles.inputBox}
              type="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter your password"
            ></input>
          </p>

          {error && signupData.password.length === 0 && (
            <p className={styles.error}>* Password is required</p>
          )}

          {backendError && !error && (
            <p className={styles.error}>{backendError}</p>
          )}
        </form>

        <button className={styles.btn} onClick={handleContinueBtn}>
          Create Account
        </button>

        <p className={styles.haveAccountText}>
          Already Have Account ?{" "}
          <u>
            <span className={styles.login} onClick={handleLoginText}>
              {" "}
              Login Here
            </span>
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

export default Signup;
