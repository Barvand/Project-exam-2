import { Link } from "react-router-dom";
import RenderDeleteBooking from "../bookings/deleteBooking";
import { useState } from "react";

function RenderBookingsProfile({ bookings }) {
  const [newBookings, setNewBookings] = useState(bookings);

  const handleDeleteBooking = (id) => {
    // Update the newBookings state after deletion
    setNewBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

  return (
    <div>
      <div className="container">
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold p-3 profile-title bg-customPurple-800 text-customPurple-200 shadow-lg">
            Upcoming bookings
          </h1>
        </div>
        {newBookings.length === 0 ? ( // Use `newBookings` here
          <p>No bookings available at the moment.</p> // Display this message if there are no bookings
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {newBookings.map((booking) => {
              // Use `newBookings` here
              const bookingFromDate = new Date(booking.checkIn);
              const formattedFromDate = bookingFromDate.toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              const bookingToDate = new Date(booking.checkOut);
              const formattedToDate = bookingToDate.toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              return (
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
                    <span className="text-successText font-bold">
                      {formattedFromDate}
                    </span>
                    til
                    <span> {formattedToDate} </span>
                  </p>
                  <RenderDeleteBooking
                    id={booking.id}
                    onDelete={handleDeleteBooking}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RenderBookingsProfile;
