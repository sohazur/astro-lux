import React from "react";
import { Link } from "react-router-dom";
import { packageClasses } from "../utils/mockData";

const Packages = () => {
  return (
    <div className="container section">
      <h2>Our Space Travel Packages</h2>
      <p>
        Choose the perfect space travel experience that matches your desires and
        budget. From essential space travel amenities to the ultimate luxury
        experience, we have the perfect package for every space explorer.
      </p>

      <div className="package-grid">
        {packageClasses.map((packageClass) => (
          <div key={packageClass.id} className="package-card slide-up">
            <h3 className="package-title">{packageClass.name}</h3>
            <p>{packageClass.description}</p>
            <p className="package-price">
              {packageClass.priceMultiplier}x Base Price
            </p>

            <ul className="package-features">
              {packageClass.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <Link
              to="/booking"
              className="btn-primary"
              style={{ width: "100%" }}
            >
              Select This Package
            </Link>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "3rem",
          backgroundColor: "rgba(14, 42, 71, 0.7)",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h3>Custom Space Travel Experiences</h3>
        <p>
          Looking for something even more exclusive? AstroLux offers bespoke
          space travel experiences tailored to your specific requirements. From
          private space stations to extended lunar stays, our team can create
          the ultimate space adventure.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/contact" className="btn-primary">
            Inquire About Custom Packages
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <h3>Ready to Make History?</h3>
        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            marginBottom: "1.5rem",
          }}
        >
          Join the exclusive group of space travelers who have ventured beyond
          Earth's atmosphere. Your journey to the stars begins with selecting
          the perfect package.
        </p>
        <Link to="/booking" className="btn-primary">
          Book Your AstroLux Journey
        </Link>
      </div>
    </div>
  );
};

export default Packages;
