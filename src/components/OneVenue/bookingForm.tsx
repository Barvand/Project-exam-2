import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/api";
import BookingFormComponent from "./bookingFormComponent";

function BookingForm() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null); // State to store booking data
  const [loading, setLoading] = useState(true); // Loading state to show loading indicator

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingData = await fetchData(
          `holidaze/venues/${id}?_bookings=true`
        );
        setBooking(bookingData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id]); // Re-run when the `id` changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (!booking) {
    return <div>Error: No booking data found.</div>; // Error message if booking data is not found
  }

  return (
    <BookingFormComponent
      bookingPrice={booking.price}
      bookingTitle={booking.name}
    />
  );
}

export default BookingForm;
