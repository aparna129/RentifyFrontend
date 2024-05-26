import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import HomePage from "./Pages/HomePage/HomePage";
import SellerPage from "./Pages/SellerPage/SellerPage";
import SellerProperties from "./Pages/SellerPage/SellerProperties";
import "./App.css";

function App() {
  const baseUrl = "https://rentifybackend-zqes.onrender.com/";
  localStorage.setItem("baseUrl", baseUrl);

  return (
    <div>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sellProperty" element={<SellerPage />} />
        <Route path="/postedProperties" element={<SellerProperties />} />
      </Routes>
    </div>
  );
}

export default App;
