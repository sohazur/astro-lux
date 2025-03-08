import React from "react";
import { Link } from "react-router-dom";
import { destinations } from "../utils/mockData";

const Home = () => {
  // Display only featured destinations (limit to 3)
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Dubai to the Stars</h1>
          <h2 className="hero-subtitle">
            Experience the frontier of luxury space travel from the world's
            premier launch hub
          </h2>
          <Link to="/booking" className="btn-primary">
            Book Your Journey
          </Link>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section">
        <div className="container">
          <h2>Popular Destinations</h2>
          <p>
            Explore our most sought-after space destinations, from low Earth
            orbit to the lunar surface.
          </p>

          <div className="destinations-grid">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="destination-card slide-up">
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
                  <Link
                    to={`/destinations/${destination.id}`}
                    className="btn-primary"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div
            className="view-all-link"
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            <Link to="/destinations" className="btn-primary">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="section"
        style={{ backgroundColor: "rgba(3, 11, 23, 0.8)" }}
      >
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Why Choose Dubai to the Stars</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              marginTop: "3rem",
            }}
          >
            <div
              className="feature-card slide-up"
              style={{ textAlign: "center" }}
            >
              <div
                className="feature-icon"
                style={{
                  fontSize: "3rem",
                  color: "var(--accent-color)",
                  marginBottom: "1rem",
                }}
              >
                🚀
              </div>
              <h3>Unmatched Experience</h3>
              <p>
                With over 50 successful space flights and partnerships with
                leading aerospace companies, we offer the safest and most
                luxurious space travel experience.
              </p>
            </div>

            <div
              className="feature-card slide-up"
              style={{ textAlign: "center" }}
            >
              <div
                className="feature-icon"
                style={{
                  fontSize: "3rem",
                  color: "var(--accent-color)",
                  marginBottom: "1rem",
                }}
              >
                🏆
              </div>
              <h3>Luxury in Zero Gravity</h3>
              <p>
                Experience the finest accommodations in space, from the ISS
                Harmony Module to the exclusive Lunar Dome Alpha on the Moon's
                surface.
              </p>
            </div>

            <div
              className="feature-card slide-up"
              style={{ textAlign: "center" }}
            >
              <div
                className="feature-icon"
                style={{
                  fontSize: "3rem",
                  color: "var(--accent-color)",
                  marginBottom: "1rem",
                }}
              >
                💫
              </div>
              <h3>Dubai's Gateway to Space</h3>
              <p>
                Launch from the world's most advanced spaceport in Dubai,
                featuring state-of-the-art facilities and a premium pre-flight
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Ready to Make History?</h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              marginBottom: "2rem",
            }}
          >
            Join the exclusive group of space travelers who have ventured beyond
            Earth's atmosphere. Your journey to the stars begins here.
          </p>
          <Link to="/register" className="btn-primary">
            Begin Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
