import { useState, useEffect } from "react";
import { fetchData } from "../../api/api";
// Define the interface for each booking object
interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
}

interface DisplayBookingsProps {
  venueId: string;
}

function DisplayBookings({ venueId }: DisplayBookingsProps) {
  const [venueBookings, setVenueBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function renderData() {
      try {
        setIsLoading(true); // Start loading
        const response = await fetchData(
          `holidaze/venues/${venueId}/?_bookings=true`
        );
        setVenueBookings(response.data); // Update the state with fetched bookings
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false); // End loading
      }
    }

    renderData(); // Fetch data whenever venueId changes
  }, [venueId]); // Dependency array should only contain venueId

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {Array.isArray(venueBookings.bookings) &&
      venueBookings.bookings.length > 0 ? (
        venueBookings.bookings.map((booking) => (
          <div key={booking.id}>
            <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
            <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
}

export default DisplayBookings;
