import React from "react";

function Footer() {
  return (
    <div>
      <div
        style={{
          height: "7vh",
          width: "100vw",
          backgroundColor: "black",
          color: "white",
          lineHeight: "7vh",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          letterSpacing: "1px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <p>Contact Us:</p>
        <p>rentify@gmail.com</p>
        <p>+91 7873427890</p>
        <p>@rentify_123</p>
      </div>
    </div>
  );
}

export default Footer;
