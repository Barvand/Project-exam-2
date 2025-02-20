import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/api";
import BookingFormComponent from "./bookingFormComponent";

interface BookingProps {
  price: number;
  name: string;
}

/**
 * Fetches venue booking data and renders the `BookingFormComponent` for making a reservation.
 *
 * @component
 * @description
 * - Retrieves booking information from the API based on the venue ID from the URL.
 * - Displays a loading state while fetching data.
 * - If no booking data is found, an error message is shown.
 * - Once data is loaded, it passes the venue price and name to `BookingFormComponent` for booking.
 *
 * @example
 * ```tsx
 * <BookingForm />
 * ```
 *
 * @returns {JSX.Element} A component that fetches and displays booking information, allowing users to book a venue.
 */

function BookingForm() {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingProps | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking) {
    return <div>Error: No booking data found.</div>; // Error message if booking data is not found
  }

  return (
    <BookingFormComponent
      venuePrice={booking.price}
      venueTitle={booking.name}
    />
  );
}

export default BookingForm;
