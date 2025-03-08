import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { accommodations, destinations } from "../utils/mockData";

const Accommodations = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destinationFilter = queryParams.get("destination");

  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(
    destinationFilter || "all"
  );

  // Filter accommodations based on selected destination
  useEffect(() => {
    if (selectedDestination === "all") {
      setFilteredAccommodations(accommodations);
    } else {
      setFilteredAccommodations(
        accommodations.filter((acc) => acc.destination === selectedDestination)
      );
    }
  }, [selectedDestination]);

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container section">
      <h2>Space Accommodations</h2>
      <p>
        Experience luxury beyond Earth with our exclusive space accommodations.
        From orbital hotels to lunar habitats, we offer the most extraordinary
        places to stay in the cosmos.
      </p>

      <div style={{ marginBottom: "2rem" }}>
        <label htmlFor="destination-filter" style={{ marginRight: "1rem" }}>
          Filter by Destination:
        </label>
        <select
          id="destination-filter"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          style={{ maxWidth: "300px" }}
        >
          <option value="all">All Destinations</option>
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      {filteredAccommodations.length === 0 ? (
        <p>No accommodations available for the selected destination.</p>
      ) : (
        <div className="accommodations-grid">
          {filteredAccommodations.map((accommodation) => {
            const destination = destinations.find(
              (d) => d.id === accommodation.destination
            );

            return (
              <div
                key={accommodation.id}
                className="accommodation-card fade-in"
              >
                <img
                  src={`/images/${accommodation.image}`}
                  alt={accommodation.name}
                  className="accommodation-image"
                />
                <div className="accommodation-content">
                  <h3 className="accommodation-title">{accommodation.name}</h3>
                  <p className="accommodation-location">
                    Location: {destination?.name}
                  </p>
                  <p className="accommodation-price">
                    {formatPrice(accommodation.pricePerNight)} per night
                  </p>
                  <p>{accommodation.description}</p>

                  <h4 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                    Amenities
                  </h4>
                  <ul className="accommodation-amenities">
                    {accommodation.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "1.5rem" }}>
                    <Link
                      to="/booking"
                      className="btn-primary"
                      style={{ width: "100%" }}
                    >
                      Book a Stay
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h3>Experience Luxury in Zero Gravity</h3>
        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            marginBottom: "1.5rem",
          }}
        >
          Our space accommodations redefine luxury with breathtaking views of
          Earth, the Moon, and the cosmos. Book your space journey today and
          experience the ultimate getaway.
        </p>
        <Link to="/booking" className="btn-primary">
          Book Your Space Journey
        </Link>
      </div>
    </div>
  );
};

export default Accommodations;
