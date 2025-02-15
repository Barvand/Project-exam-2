import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";
import Loading from "../features/loading";
import RenderBookingsProfile from "../components/bookings/RenderBookingsUser";
import { useAuth } from "../authentication/AuthProvider";
import NotFoundPage from "./404";

function BookingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const { username } = useParams();
  const { userProfile } = useAuth();

  useEffect(() => {
    if (!username) return;

    const fetchBookingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData(
          `holidaze/profiles/${username}/bookings/?_venue=true&sort=dateFrom&sortOrder=asc`
        );
        const data = response.data;

        const currentDate = new Date();

        // Filter bookings into upcoming and past
        const upcoming = data.filter((booking: any) => {
          const bookingDate = new Date(booking.dateFrom);
          return bookingDate >= currentDate; // Future bookings
        });

        const past = data.filter((booking: any) => {
          const bookingDate = new Date(booking.dateFrom);
          return bookingDate < currentDate; // Past bookings
        });
        setUpcomingBookings(upcoming);
        setPastBookings(past);
      } catch (error: any) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingData();
  }, [username]);

  if (!userProfile) {
    return <Loading />;
  }

  if (userProfile.name !== username) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mt-20 mb-20">
      <RenderBookingsProfile
        bookings={upcomingBookings}
        header="Upcoming Bookings"
      />
      <RenderBookingsProfile bookings={pastBookings} header="Past Bookings" />

      {errorMessage && (
        <div
          className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
