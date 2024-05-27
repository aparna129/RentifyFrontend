import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "../PropertyList.module.css";
import useAuthentication from "../../Authentication";
import { useNavigate } from "react-router-dom";
import hearticondislike from "../../../images/heart-icon-dislike.png";
import hearticonlike from "../../../images/heart-icon-like.png";

function PropertyList() {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sellers, setSellers] = useState({});

  const baseUrl = localStorage.getItem("baseUrl") || "";
  if (!baseUrl) {
    toast.error("Base URL is missing. Please set it in localStorage.");
  }

  const [selectedFilters, setSelectedFilters] = useState({
    state: "",
    city: "",
    price: "",
  });

  const updateSelectedFilters = (field, value) => {
    setSelectedFilters({ ...selectedFilters, [field]: value });
  };

  useEffect(() => {
    const fetchProperties = () => {
      setLoading(true);
      axios
        .post(`${baseUrl}getAllProperties`, selectedFilters)
        .then((response) => {
          if (response.data && response.data.properties) {
            const { properties } = response.data;
            setLoading(false);
            setProperties(properties);
          }
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

    fetchProperties();
    // eslint-disable-next-line
  }, [selectedFilters]);

  const token = localStorage.getItem("jwttoken");
  const isLoggedIn = useAuthentication(token);

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const [currentSeller, setCurrentSeller] = useState(null);

  const handleInterestedBtn = (property) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const userId = property && property.userId;

    axios
      .get(`${baseUrl}getUserDetails/${userId}`)
      .then((response) => {
        const { user } = response.data;
        setCurrentSeller(user);
        setSellers((prevSellers) => ({
          ...prevSellers,
          [property && property._id]: user,
        }));
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
      });

    const emailData = {
      buyerEmail: email,
      sellerEmail: currentSeller && currentSeller.email,
      sellerContact: currentSeller && currentSeller.contact,
      propertyDetails: property ? property : null,
    };

    axios
      .post(`${baseUrl}sendEmail`, emailData)
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
          toast.success(error.response.data.error);
        } else {
          toast.error("Oops! An error occurred. Try again after some time");
        }
        console.log(error);
      });
  };

  const [likeBtnClicked, setLikeBtnClicked] = useState(false);

  const handleLikeBtn = (propertyId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setLikeBtnClicked(!likeBtnClicked);

    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};

    const status = storedLikes[propertyId] === "like" ? "dislike" : "like";

    const updatedLikes = { ...storedLikes, [propertyId]: status };

    localStorage.setItem("likes", JSON.stringify(updatedLikes));

    const updatedProperties = properties && properties.map((property) =>
      property._id === propertyId
        ? {
            ...property,
            likes: status === "like" ? property.likes + 1 : property.likes - 1,
          }
        : property
    );
    setProperties(updatedProperties);

    const url = `${baseUrl}${status}Property/${propertyId}`;
    axios
      .post(url)
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
          toast.error("Oops! An error occurred. Try again after some time");
        }
        console.log(error);

        setProperties(properties);
        const rolledBackLikes = {
          ...storedLikes,
          [propertyId]: status === "like" ? "dislike" : "like",
        };
        localStorage.setItem("likes", JSON.stringify(rolledBackLikes));
      });
  };

  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 1;

  const indexOfLastProperty = currentPage * propertiesPerPage;

  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

  const currentProperties =
    properties && properties.slice(indexOfFirstProperty, indexOfLastProperty);

  /*const totalPages = Math.ceil(
    properties ? properties.length / propertiesPerPage : 0
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);*/

  return (
    <div>
      <div className={styles.filterSection}>
        <div style={{ marginTop: "0.4vh" }}>Refine Your Search!</div>
        <div>
          <select
            className={styles.selectBtn}
            onChange={(e) => {
              updateSelectedFilters("state", e.target.value);
            }}
          >
            <option disabled selected style={{ display: "none" }}>
              State
            </option>
            <option value="AndhraPradesh">AndhraPradesh</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="MadhyaPradesh">MadhyaPradesh</option>
            <option value="TamilNadu">TamilNadu</option>
            <option value="Telangana">Telangana</option>
          </select>
        </div>
        <div>
          <select
            className={styles.selectBtn}
            onChange={(e) => {
              updateSelectedFilters("city", e.target.value);
            }}
          >
            <option disabled selected style={{ display: "none" }}>
              City
            </option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
          </select>
        </div>
        <div>
          <select
            className={styles.selectBtn}
            onChange={(e) => {
              updateSelectedFilters("price", e.target.value);
            }}
          >
            <option disabled selected style={{ display: "none" }}>
              Price
            </option>
            <option value="1000-5000">1,000-5,000</option>
            <option value="5000-10000">5,000-10,000</option>
            <option value="10000-15000">10,000-15,000</option>
            <option value="15000-20000">15,000-20,000</option>
            <option value="20000-25000">20,000-25,000</option>
            <option value="25000-30000">25,000-30,000</option>
            <option value=">30000">Greater than 30,000</option>
          </select>
        </div>
      </div>

      {currentProperties &&
        currentProperties.map((property) => (
          <div className={styles.property} key={property._id}>
            <div>
              <p className={styles.fieldLine}>
                <span className={styles.field}>State:</span> {property.state}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>City:</span> {property.city}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>Area: </span>
                {property.area}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>Number of Bedrooms:</span>{" "}
                {property.noOfBedrooms}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>Number of Bathrooms: </span>
                {property.noOfBathrooms}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>Number of Balconies: </span>
                {property.noOfBalconies}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>
                  Number of Hospitals Nearby:
                </span>{" "}
                {property.noOfHospitalsNearby}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>Square Footage:</span>{" "}
                {property.squareFootage}
              </p>
              <p className={styles.fieldLine}>
                <span className={styles.field}>Price:</span> {property.price}
              </p>
            </div>

            <div>
              <button
                className={styles.btn}
                onClick={() => handleInterestedBtn(property)}
              >
                I'm interested
              </button>

              {sellers[property && property._id] && (
                <div style={{ marginTop: "2vh" }}>
                  <p>
                    <span className={styles.field}>Seller:</span>{" "}
                    {sellers[property && property._id].firstName}{" "}
                    {sellers[property && property._id].lastName}
                  </p>
                  <p style={{ marginTop: "0.5vh" }}>
                    <span className={styles.field}>Email: </span>
                    {sellers[property._id].email}
                  </p>
                </div>
              )}
            </div>

            <div>
              <img
                onClick={() => handleLikeBtn(property && property._id)}
                src={
                  JSON.parse(localStorage.getItem("likes"))[
                    property && property._id
                  ] === "like"
                    ? hearticonlike
                    : hearticondislike
                }
                style={{ height: "6vh", width: "3.5vw", cursor: "pointer" }}
                alt="Like Icon"
              ></img>

              <p style={{ marginLeft: "1.2vw" }}>{property.likes || 0}</p>
            </div>
          </div>
        ))}

{/*<div style={{ textAlign: "center" }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span key={index}>
            <button
              className={styles.pageNumber}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          </span>
        ))}
      </div>*/}

      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loaderBackground} />
          <ClipLoader color={"black"} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default PropertyList;
