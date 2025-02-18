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
          `holidaze/venues/${venueId}/?_bookings=true&_customer=true`
        );

        setVenueBookings(response.data.bookings); // Update the state with fetched bookings
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false); // End loading
      }
    }

    renderData(); // Fetch data whenever venueId changes
  }, [venueId]); // Dependency array should only contain venueId

  const currentDate = new Date();

  const upcomingBookings = venueBookings
    .filter((booking) => new Date(booking.dateFrom) > currentDate) // Filter out past bookings
    .sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
    );

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {upcomingBookings.length > 0 ? (
        <>
          <h2 className="font-bold">Upcoming bookings</h2>
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="p-1">
              <p className="text-sm">Customer: {booking.customer.name}</p>
              <p className="text-sm">
                <span className="text-green-500 font-bold">Arrival: </span>{" "}
                {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="text-red-500 font-bold">Check-out: </span>{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>No upcoming bookings available</p>
      )}
    </div>
  );
}

export default DisplayBookings;
