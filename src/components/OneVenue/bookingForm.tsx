import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/api";
import BookingFormComponent from "./bookingFormComponent";

interface BookingProps {
  price: number;
  name: string;
}

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
