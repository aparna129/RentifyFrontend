import React from "react";
import Header from "./Components/Header";
import PropertyList from "./Components/PropertyList";
import Footer from "../SharedComponents/Footer";

function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ height: "7vh", width: "100vw" }}>
        <Header />
      </div>

      <div style={{ height: "86vh", width: "100vw", overflow: "auto" }}>
        <div>
          <p
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "2vh",
            }}
          >
            Welcome to Rentify, the ultimate platform where you can rent, buy,
            or sell properties effortlessly.
          </p>
        </div>

        <PropertyList />
      </div>

      <div style={{ height: "7vh", width: "100vw" }}>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
