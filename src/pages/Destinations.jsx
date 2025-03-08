import React from "react";
import { Link } from "react-router-dom";
import { destinations } from "../utils/mockData";

const Destinations = () => {
  return (
    <div className="container section">
      <h2>Explore Our Space Destinations</h2>
      <p>
        From low Earth orbit to the lunar surface and beyond, AstroLux offers
        exclusive access to humanity's greatest frontier destinations.
      </p>

      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card fade-in">
            <img
              src={`/images/${destination.image}`}
              alt={destination.name}
              className="destination-image"
            />
            <div className="destination-content">
              <h3 className="destination-title">{destination.name}</h3>
              <p className="destination-info">{destination.description}</p>
              <div className="destination-distance">
                <span>Distance from Earth: {destination.distance}</span>
              </div>
              <div className="destination-time">
                <span>Travel Time: {destination.travelTime}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Link
                  to={`/accommodations?destination=${destination.id}`}
                  className="btn-primary"
                  style={{ marginRight: "0.5rem" }}
                >
                  View Accommodations
                </Link>
                <Link
                  to={`/booking`}
                  className="btn-primary"
                  style={{ marginLeft: "0.5rem" }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h3>Ready to Experience the Final Frontier?</h3>
        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            marginBottom: "1.5rem",
          }}
        >
          Our space travel packages are designed for the discerning explorer.
          Choose your destination and begin your journey to the stars.
        </p>
        <Link to="/booking" className="btn-primary">
          Book Your AstroLux Journey
        </Link>
      </div>
    </div>
  );
};

export default Destinations;
