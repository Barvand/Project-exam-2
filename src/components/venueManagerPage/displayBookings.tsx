import { useState, useEffect } from "react";
import { fetchData } from "../../api/api";

// Define the interface for each booking object
interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  customer: Customer;
}

interface Customer {
  name: string;
}

interface DisplayBookingsProps {
  venueId: string;
}

/**
 * Component to display upcoming bookings for a specific venue on the VenueManager Page.
 *
 * @param {object} props - the props for the component -- see above
 * @param {string} props.venueID the unique ID of the specific venue.
 * @returns {JSX.Element} the JSX element returns the bookings for a venue.
 * The data has been filtered to only display bookings in the future to avoid cluttering.
 * Good idea to implement past bookings as well but haven't got there yet.
 */
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

        setVenueBookings(response.data.bookings);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    renderData(); // Call the function to fetch data
  }, [venueId]);
  /**
   * Filters and sorts upcoming bookings.
   * @type {Booking[]}
   */

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {venueBookings.length > 0 ? (
        <>
          <h2 className="font-bold">Upcoming bookings</h2>
          {venueBookings.map((booking) => (
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
