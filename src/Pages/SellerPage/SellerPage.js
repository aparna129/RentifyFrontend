import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./SellerPage.module.css";
import Header from "./Header";
import Footer from "../SharedComponents/Footer";

function SellerPage() {
  const [propertyDetails, setPropertyDetails] = useState({
    state: "",
    city: "",
    area: "",
    noOfBedrooms: "",
    noOfBathrooms: "",
    noOfBalconies: "",
    noOfHospitalsNearby: "",
    squareFootage: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("jwttoken");

  const baseUrl = localStorage.getItem("baseUrl");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handlePostButton = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}addProperty/${userId}`, propertyDetails, { headers })
      .then((response) => {
        const { message } = response.data;
        setLoading(false);
        toast.success(message);
        setPropertyDetails({
          state: "",
          city: "",
          area: "",
          noOfBedrooms: "",
          noOfBathrooms: "",
          noOfBalconies: "",
          noOfHospitalsNearby: "",
          squareFootage: "",
          price: "",
        });
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Oops! An error occurred.Try again after some time");
        }
        console.log(error);
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  const handleMyPostsBtn = () => {
    navigate("/postedProperties");
  };

  const handleHomeBtn = () => {
    navigate("/");
  };

  return (
    <div className={styles.sellerPage}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.innerSection}>
        <div>
          <p className={styles.provideDetails}>
            Please provide the details below to post your property for sale.
          </p>

          <form className={styles.form}>
            <div className={styles.fieldLine}>
              <label className={styles.field}>State: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="state"
                value={propertyDetails.state}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>City: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="city"
                value={propertyDetails.city}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>Area: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="area"
                value={propertyDetails.area}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>Number of Bedrooms: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="noOfBedrooms"
                value={propertyDetails.noOfBedrooms}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>Number of Bathrooms: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="noOfBathrooms"
                value={propertyDetails.noOfBathrooms}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>Number of Balconies: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="noOfBalconies"
                value={propertyDetails.noOfBalconies}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>
                Number of Hospitals Nearby:{" "}
              </label>
              <input
                className={styles.inputBox}
                type="text"
                name="noOfHospitalsNearby"
                value={propertyDetails.noOfHospitalsNearby}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>Square Footage: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="squareFootage"
                value={propertyDetails.squareFootage}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldLine}>
              <label className={styles.field}>Price: </label>
              <input
                className={styles.inputBox}
                type="text"
                name="price"
                value={propertyDetails.price}
                onChange={handleChange}
              />
            </div>
          </form>

          <p style={{ textAlign: "center" }}>
            <button className={styles.btn} onClick={handlePostButton}>
              Post Property
            </button>
          </p>

          <p style={{ textAlign: "center" }}>
            <button className={styles.btn} onClick={handleMyPostsBtn}>
              Your Posted Properties
            </button>
            <button
              style={{ marginLeft: "2vw" }}
              className={styles.btn}
              onClick={handleHomeBtn}
            >
              Back To Home
            </button>
          </p>
        </div>

        {loading && (
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

export default SellerPage;
