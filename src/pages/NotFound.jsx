import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container section" style={{ textAlign: "center" }}>
      <h2>404 - Lost in Space</h2>
      <div style={{ margin: "2rem 0" }}>
        <span style={{ fontSize: "5rem" }}>🚀</span>
      </div>
      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "600px",
          margin: "0 auto",
          marginBottom: "2rem",
        }}
      >
        It seems your spacecraft has ventured into uncharted territory. The page
        you're looking for has drifted beyond our reach.
      </p>
      <Link to="/" className="btn-primary">
        Return to Mission Control
      </Link>
    </div>
  );
};

export default NotFound;
