import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { addBooking } from "../utils/firebaseUtils";
import {
  destinations,
  packageClasses,
  calculatePrice,
} from "../utils/mockData";

const Booking = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destinationId: "",
    packageClassId: "",
    departureDate: "",
    passengers: 1,
    specialRequests: "",
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Calculate price when destination or package class changes
  useEffect(() => {
    if (formData.destinationId && formData.packageClassId) {
      const calculatedPrice = calculatePrice(
        formData.destinationId,
        formData.packageClassId
      );
      setPrice(calculatedPrice);
    } else {
      setPrice(null);
    }
  }, [formData.destinationId, formData.packageClassId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (
      !formData.destinationId ||
      !formData.packageClassId ||
      !formData.departureDate
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Ensure departure date is in the future
    const departureDate = new Date(formData.departureDate);
    const today = new Date();
    if (departureDate <= today) {
      setError("Departure date must be in the future");
      setLoading(false);
      return;
    }

    // Create booking object
    const bookingData = {
      ...formData,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      price: price,
      status: "confirmed",
      bookedAt: new Date(),
    };

    // Add booking to Firestore
    const { id, error } = await addBooking(bookingData);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Success
    setSuccess("Your space journey has been booked successfully!");
    setLoading(false);

    // Reset form
    setFormData({
      destinationId: "",
      packageClassId: "",
      departureDate: "",
      passengers: 1,
      specialRequests: "",
    });

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

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
      <h2 className="form-title">Book Your AstroLux Journey</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="booking-form fade-in">
        <div className="form-group">
          <label htmlFor="destinationId" className="form-label">
            Destination
          </label>
          <select
            id="destinationId"
            name="destinationId"
            value={formData.destinationId}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">Select a destination</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name} - {destination.distance} from Earth
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="packageClassId" className="form-label">
            Travel Package
          </label>
          <select
            id="packageClassId"
            name="packageClassId"
            value={formData.packageClassId}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">Select a package class</option>
            {packageClasses.map((packageClass) => (
              <option key={packageClass.id} value={packageClass.id}>
                {packageClass.name} - {packageClass.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="departureDate" className="form-label">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} // Set min date to today
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="passengers" className="form-label">
            Number of Passengers
          </label>
          <input
            type="number"
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            min="1"
            max="5"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests" className="form-label">
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any special requirements or medical conditions we should know about?"
            rows="4"
            disabled={loading}
          ></textarea>
        </div>

        {price !== null && (
          <div className="price-display">
            <p>Total Price:</p>
            <p className="price-amount">
              {formatPrice(price * formData.passengers)}
            </p>
            <p>For {formData.passengers} passenger(s)</p>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%" }}
          disabled={loading || !price}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
