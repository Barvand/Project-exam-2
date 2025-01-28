import useFetchAPI from "../../api/read";
import { GetHeaders } from "../../api/headers";
import { Link } from "react-router-dom";
import { FaWifi } from "react-icons/fa";

interface BookingsByUserProps {
  username: string;
}

function BookingsByUser({ username }: BookingsByUserProps) {
  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/profiles/${username}/bookings?_venue=true`,
    options: {
      headers: GetHeaders("GET"),
    },
  });

  const bookingFromDate = new Date("2025-01-08T23:00:00.000Z");
  const formattedFromDate = bookingFromDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const bookingToDate = new Date("2025-01-08T23:00:00.000Z");
  const formattedToDate = bookingToDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(data);
  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-2xl font-bold py-5">Upcoming bookings</h1>
        {data.length === 0 ? (
          <p>No bookings available at the moment.</p> // Display this message if there are no bookings
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.map((booking) => (
              <div key={booking.id}>
                <Link to={`/venues/${booking.venue.id}`}>
                  <img
                    className="h-56 bg-cover bg-center w-full"
                    loading="lazy"
                    src={
                      booking.venue.media && booking.venue.media.length > 0
                        ? booking.venue.media[0].url
                        : "default-image-url"
                    }
                    alt={
                      booking.venue.media && booking.venue.media.length > 0
                        ? booking.venue.media[0].alt
                        : "default alt text"
                    }
                  />
                </Link>
                <div className="flex">
                  <h1 className="text-2xl font-bold text-secondary">
                    {booking.venue.name}
                  </h1>
                </div>
                <p className="text-md">
                  Check-in
                  <span className="text-green-500 font-bold">
                    {formattedFromDate}
                  </span>
                   til
                  <span> {formattedToDate} </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingsByUser;
