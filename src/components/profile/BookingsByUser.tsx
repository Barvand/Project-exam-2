import { Link } from "react-router-dom";
import RenderDeleteBooking from "../bookings/deleteBooking";
import RenderUpdateBooking from "../bookings/updateBooking";
import { useState } from "react";

// Define types for the booking object and its properties
interface Booking {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  title: string;
  guests: number;
  venue: {
    id: string;
    name: string;
    media: { url: string; alt: string }[];
  };
}

// Define types for the RenderBookingsProfile props
interface RenderBookingsProfileProps {
  bookings: Booking[];
}

const RenderBookingsProfile: React.FC<RenderBookingsProfileProps> = ({
  bookings,
}) => {
  const [newBookings, setNewBookings] = useState<Booking[]>(bookings);

  const handleDeleteBooking = (id: string) => {
    // Update the newBookings state after deletion
    setNewBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

  const handleUpdateBooking = (
    id: string,
    updatedBooking: Partial<Booking>
  ) => {
    // Update the booking state with the updated booking
    setNewBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      )
    );
  };

  return (
    <div>
      <div className="container">
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold p-3 text-customPurple-600 shadow-lg">
            Upcoming bookings
          </h1>
        </div>

        {newBookings.length === 0 ? (
          <p>No bookings available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {newBookings.map((booking) => {
              const bookingFromDate = new Date(booking.dateFrom);
              const formattedFromDate = bookingFromDate.toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              const bookingToDate = new Date(booking.dateTo);
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
                  <p className="text-successText font-bold">
                    {formattedFromDate}
                  </p>
                  <p className="text-red-500 font-bold">{formattedToDate}</p>
                  <RenderDeleteBooking
                    id={booking.id}
                    onDelete={handleDeleteBooking}
                  />
                  <RenderUpdateBooking
                    id={booking.id}
                    booking={booking}
                    onUpdate={handleUpdateBooking} // Pass handleUpdateBooking here
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderBookingsProfile;
