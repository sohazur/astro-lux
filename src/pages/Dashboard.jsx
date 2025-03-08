import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getUserBookings,
  deleteBooking,
  getTravelTips,
} from "../utils/firebaseUtils";
import {
  destinations,
  packageClasses,
  travelTips as mockTravelTips,
} from "../utils/mockData";

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch user bookings and travel tips
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      setLoading(true);

      // Get user bookings
      const { bookings, error: bookingsError } = await getUserBookings();

      if (bookingsError) {
        setError(`Error fetching bookings: ${bookingsError}`);
        setLoading(false);
        return;
      }

      // Enrich booking data with destination and package info
      const enrichedBookings = bookings.map((booking) => {
        const destination = destinations.find(
          (d) => d.id === booking.destinationId
        );
        const packageClass = packageClasses.find(
          (p) => p.id === booking.packageClassId
        );

        return {
          ...booking,
          destination,
          packageClass,
          departureDate: booking.departureDate
            ? new Date(booking.departureDate)
            : null,
        };
      });

      setBookings(enrichedBookings);

      // Try to get travel tips from Firestore, fallback to mock data
      try {
        const { tips, error: tipsError } = await getTravelTips();

        if (tipsError || tips.length === 0) {
          // Use mock data if Firestore fails or returns empty
          setTips(mockTravelTips);
        } else {
          setTips(tips);
        }
      } catch (error) {
        // Fallback to mock data
        setTips(mockTravelTips);
      }

      setLoading(false);
    };

    fetchData();
  }, [currentUser]);

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const { success, error } = await deleteBooking(bookingId);

      if (error) {
        setError(`Error cancelling booking: ${error}`);
        return;
      }

      // Remove the cancelled booking from state
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      setDeleteSuccess("Booking cancelled successfully");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess("");
      }, 3000);
    }
  };

  // Calculate days until departure
  const calculateDaysUntil = (departureDate) => {
    if (!departureDate) return null;

    const today = new Date();
    const timeDiff = departureDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
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

  // Get relevant travel tips based on user's booked destinations
  const getRelevantTips = () => {
    if (!bookings.length || !tips.length) return tips;

    const bookedDestinationIds = bookings.map(
      (booking) => booking.destinationId
    );

    return tips.filter((tip) =>
      tip.destinationRelevance.some((destId) =>
        bookedDestinationIds.includes(destId)
      )
    );
  };

  const relevantTips = getRelevantTips();

  return (
    <div className="container section">
      <h2>Your Space Travel Dashboard</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {deleteSuccess && (
        <div className="alert alert-success">{deleteSuccess}</div>
      )}

      {loading ? (
        <p>Loading your space journey details...</p>
      ) : (
        <div className="dashboard-container">
          <div className="dashboard-sidebar">
            <div className="user-info">
              <img
                src={currentUser.photoURL || "/images/default-avatar.jpg"}
                alt="User Avatar"
                className="user-avatar"
              />
              <h3>{currentUser.displayName || currentUser.email}</h3>
              <p>AstroLux Explorer</p>
            </div>

            <ul className="dashboard-menu">
              <li>
                <a href="#bookings">Your Bookings</a>
              </li>
              <li>
                <a href="#tips">Travel Tips</a>
              </li>
              <li>
                <a href="/booking">Book New Journey</a>
              </li>
              <li>
                <a href="/accommodations">Explore Accommodations</a>
              </li>
            </ul>
          </div>

          <div className="dashboard-content">
            <section id="bookings" className="upcoming-trips">
              <h3>Your Space Journeys</h3>

              {bookings.length === 0 ? (
                <p>
                  You haven't booked any space journeys yet.{" "}
                  <a href="/booking">Book your first trip!</a>
                </p>
              ) : (
                bookings.map((booking) => {
                  const daysUntil = calculateDaysUntil(booking.departureDate);

                  return (
                    <div key={booking.id} className="trip-card fade-in">
                      <div className="trip-details">
                        <h4>{booking.destination?.name}</h4>
                        <p className="trip-info">
                          <strong>Package:</strong> {booking.packageClass?.name}
                        </p>
                        <p className="trip-info">
                          <strong>Departure:</strong>{" "}
                          {booking.departureDate?.toLocaleDateString()}
                        </p>
                        <p className="trip-info">
                          <strong>Passengers:</strong> {booking.passengers}
                        </p>
                        <p className="trip-info">
                          <strong>Total Price:</strong>{" "}
                          {formatPrice(booking.price * booking.passengers)}
                        </p>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="btn-primary"
                          style={{
                            backgroundColor: "var(--error-color)",
                            marginTop: "1rem",
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>

                      <div className="countdown">
                        <p className="countdown-label">Launching in</p>
                        <p className="countdown-value">
                          {daysUntil > 0
                            ? `${daysUntil} days`
                            : "Launching soon!"}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </section>

            <section id="tips" className="travel-tips">
              <h3>Space Travel Tips</h3>

              {relevantTips.length === 0 ? (
                <p>No travel tips available at the moment.</p>
              ) : (
                relevantTips.map((tip) => (
                  <div key={tip.id} className="tip-card slide-up">
                    <h5>{tip.title}</h5>
                    <p>{tip.content}</p>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
