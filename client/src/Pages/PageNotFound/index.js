import React from "react";
import { Link } from "react-router-dom";
import ErrorImage from "../../Assets/ErrorImage.jpg";

const PageNotFound = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img src={ErrorImage} alt="404" className="error__image" />
      <Link to="/">
        <button
          style={{
            backgroundColor: "#002f34",
            cursor: "pointer",
            border: "none",
            outline: "none",
            maxWidth: "500px",
            padding: "10px 40px",
            color: "#fff",
            fontFamily: "Roboto,sans-serif",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
