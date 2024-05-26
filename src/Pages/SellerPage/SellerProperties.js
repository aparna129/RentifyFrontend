import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./SellerPage.module.css";
import Header from "./Header";
import Footer from "../SharedComponents/Footer";
import { useNavigate } from "react-router-dom";

function SellerProperties() {
  const [properties, setProperties] = useState("");

  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("jwttoken");

  const baseUrl = localStorage.getItem("baseUrl");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}getUserProperties/${userId}`, { headers })
      .then((response) => {
        const properties = response.data;
        console.log(properties);
        setProperties(properties);
        setLoading(false);
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
  });

  const handleDeleteBtn = (productId) => {
    axios
      .delete(`${baseUrl}deleteProperty/${productId}`, { headers })
      .then((response) => {
        const { message } = response.data;
        toast.success(message);
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

  const [editingProperty, setEditingProperty] = useState(null);

  const handleEdit = (property) => {
    setEditingProperty({ ...property });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingProperty(null);
  };

  const handleSaveEdit = () => {
    setLoading(true);
    axios
      .put(`${baseUrl}editProperty/${editingProperty._id}`, editingProperty, {
        headers,
      })
      .then((response) => {
        toast.success(response.data.message);
        setEditingProperty(null);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Oops! An error occurred. Try again after some time");
        }
        console.log(error);
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  const handlePostBtn = () => {
    navigate("/sellProperty");
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
        <h2 style={{ marginTop: "3vh", marginLeft: "7vw" }}>
          Your Properties :{" "}
        </h2>
        <div>
          {properties &&
            properties.map((property, index) => (
              <div className={styles.property} key={property._id}>
                {editingProperty && editingProperty._id === property._id ? (
                  <div>
                    <p className={styles.fields}>
                      <label>State:</label>
                      <input
                        type="text"
                        name="state"
                        value={editingProperty.state}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>City:</label>
                      <input
                        type="text"
                        name="city"
                        value={editingProperty.city}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>Area:</label>
                      <input
                        type="text"
                        name="area"
                        value={editingProperty.area}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>Number of Bedrooms:</label>
                      <input
                        type="text"
                        name="noOfBedrooms"
                        value={editingProperty.noOfBedrooms}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>Number of Bathrooms:</label>
                      <input
                        type="text"
                        name="noOfBathrooms"
                        value={editingProperty.noOfBathrooms}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>Number of Balconies:</label>
                      <input
                        type="text"
                        name="noOfBalconies"
                        value={editingProperty.noOfBalconies}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>Number of Hospitals Nearby:</label>
                      <input
                        type="text"
                        name="noOfHospitalsNearby"
                        value={editingProperty.noOfHospitalsNearby}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>Square Footage:</label>
                      <input
                        type="text"
                        name="squareFootage"
                        value={editingProperty.squareFootage}
                        onChange={handleChange}
                      />
                    </p>

                    <p className={styles.fields}>
                      <label>Price:</label>
                      <input
                        type="text"
                        name="price"
                        value={editingProperty.price}
                        onChange={handleChange}
                      />
                    </p>
                    <button className={styles.btn2} onClick={handleSaveEdit}>
                      Save
                    </button>
                    <button className={styles.btn2} onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className={styles.fields}>
                      <strong> State:</strong> {property.state}
                    </p>
                    <p className={styles.fields}>
                      <strong>City:</strong> {property.city}
                    </p>
                    <p className={styles.fields}>
                      <strong>Area:</strong> {property.area}
                    </p>
                    <p className={styles.fields}>
                      <strong>Number of Bedrooms:</strong>{" "}
                      {property.noOfBedrooms}
                    </p>
                    <p className={styles.fields}>
                      <strong>Number of Bathrooms:</strong>{" "}
                      {property.noOfBathrooms}
                    </p>
                    <p className={styles.fields}>
                      <strong>Number of Balconies:</strong>{" "}
                      {property.noOfBalconies}
                    </p>
                    <p className={styles.fields}>
                      <strong>Number of Hospitals Nearby:</strong>{" "}
                      {property.noOfHospitalsNearby}
                    </p>
                    <p className={styles.fields}>
                      <strong>Square Footage:</strong> {property.squareFootage}
                    </p>
                    <p className={styles.fields}>
                      <strong>Price:</strong> {property.price}
                    </p>

                    <button
                      className={styles.btn2}
                      onClick={() => handleEdit(property)}
                    >
                      Edit Property
                    </button>
                    <button
                      className={styles.btn2}
                      onClick={() => handleDeleteBtn(property._id)}
                    >
                      Delete Property
                    </button>
                  </div>
                )}
              </div>
            ))}

        
        </div>

        <button
            onClick={handlePostBtn}
            style={{
              marginLeft: "7vw",
              marginTop: "3vh",
              paddingBottom: "1.3vh",
            }}
            className={styles.btn2}
          >
            Back To Post Property
          </button>

          <button
            onClick={handleHomeBtn}
            style={{
              marginLeft: "2vw",
              marginTop: "3vh",
              paddingBottom: "1.3vh",
            }}
            className={styles.btn2}
          >
            Back To Home
          </button>
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

export default SellerProperties;
