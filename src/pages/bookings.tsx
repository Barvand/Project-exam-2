import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";
import Loading from "../features/loading";
import RenderBookingsProfile from "../components/profile/BookingsByUser";

function BookingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookings, setBookings] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    if (!username) return;

    const fetchBookingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData(
          `holidaze/profiles/${username}/bookings/?_venue=true`
        );
        const data = response.data;
        setBookings(data);
      } catch (error: any) {
        const errMsg = error.message || "Something went wrong with placing a booking";
        setErrorMessage(errMsg);
        // Clear the error message after 5 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingData();
  }, [username]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Fixed Error Message (Bottom-Right) */}
      {errorMessage && (
        <div
          className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {errorMessage}
        </div>
      )}

      <RenderBookingsProfile bookings={bookings} />
    </div>
  );
}

export default BookingsPage;
