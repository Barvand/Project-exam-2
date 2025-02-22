import { useState, useEffect } from "react";
import { fetchData } from "../../api/api";
import { Link } from "react-router-dom";
import RenderDeleteVenue from "./deleteVenue";
import UpdateVenue from "./updateVenue";

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
          `holidaze/venues/${venueId}/?_bookings=true&_customer=true&sort=dateFrom&sortOrder=asc`
        );

        if (response.data && response.data.bookings) {
          response.data.bookings.sort(
            (a: { dateFrom: string }, b: { dateFrom: string }) => {
              return (
                new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
              );
            }
          );
        }

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
          {venueBookings.map((booking) => (
            <div key={booking.id} className="flex flex-col gap-2">
              <h2 className="font-bold text-xl">Booking</h2>
              <div className="border-b border-gray-200">
                <p className="text-md py-1">
                  Customer: {booking.customer.name}
                </p>
              </div>
              <div className="border-b border-black py-2">
                <p className="text-md">
                  <span className="text-green-600 font-bold">Arrival: </span>{" "}
                  {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p className="text-md">
                  <span className="text-red-600 font-bold">Check-out: </span>{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          <div className="flex flex-col py-2">
            <Link to={`/venues/${venueId}`}>Visit venue</Link>
            <RenderDeleteVenue id={venueId} />
            <UpdateVenue id={venueId} />
          </div>
        </>
      ) : (
        <>
          <p>No upcoming bookings available</p>
          <div className="flex flex-col py-2">
            <Link to={`/venues/${venueId}`}>Visit venue</Link>
            <RenderDeleteVenue id={venueId} />
            <UpdateVenue id={venueId} />
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayBookings;
