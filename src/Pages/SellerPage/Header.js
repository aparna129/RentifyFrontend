import React from "react";
import useAuthentication from "../Authentication";
import { useNavigate } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("jwttoken");
  const isLoggedIn = useAuthentication(token);

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <div>
        <p
          style={{
            height: "7vh",
            width: "86vw",
            backgroundColor: "black",
            display: "flex",
            color: "white",
            lineHeight: "7vh",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "1px",
            justifyContent: "space-between",
            paddingLeft: "7vw",
            paddingRight: "7vw",
          }}
        >
          <p>Rentify</p>
          {!isLoggedIn && (
            <p style={{ cursor: "pointer" }} onClick={handleSignup}>
              Signup
            </p>
          )}
          {!isLoggedIn && (
            <p style={{ cursor: "pointer" }} onClick={handleLogin}>
              Login
            </p>
          )}

          {isLoggedIn && (
            <p style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </p>
          )}
        </p>
      </div>
    </div>
  );
}

export default Header;
