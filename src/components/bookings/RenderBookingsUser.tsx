import { Link } from "react-router-dom";
import RenderDeleteBooking from "./deleteBooking";
import RenderUpdateBooking from "./updateBooking";
import { useState } from "react";
import { MdGroups2, MdPerson3 } from "react-icons/md";

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
  header: string;
}

function RenderBookingsProfile({
  bookings,
  header,
}: RenderBookingsProfileProps) {
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
        <h1 className="text-2xl pb-4 pt-4"> {header} </h1>

        {newBookings.length === 0 ? (
          <p>No bookings available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {newBookings.map((booking) => {
              const bookingFromDate = new Date(booking.dateFrom);
              const formattedFromDate = bookingFromDate.toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "numeric",
                }
              );

              const bookingToDate = new Date(booking.dateTo);
              const formattedToDate = bookingToDate.toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "numeric",
                }
              );

              return (
                <div
                  key={booking.id}
                  className="rounded relative bg-color overflow-hidden group"
                >
                  <Link to={`/venues/${booking.venue.id}`}>
                    <img
                      className="h-56 object-cover object-center w-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all transform overflow-hidden"
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
                  <div className="flex flex-col border bg-shadeVenues p-2 rounded">
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-bold">
                        {booking.venue.name}
                      </h2>
                      <RenderUpdateBooking
                        id={booking.id}
                        booking={booking}
                        onUpdate={handleUpdateBooking} // Pass handleUpdateBooking here
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">Check-in</p>
                        <p className="text-successText font-bold">
                          {formattedFromDate}
                        </p>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">Check-out</p>
                        <p className="text-red-500 font-bold">
                          {formattedToDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl">
                        {booking.guests === 1 ? (
                          <MdPerson3 className="text-primary" />
                        ) : (
                          <MdGroups2 className="text-primary" />
                        )}
                      </p>
                      <p className="text-bold">{booking.guests}</p>
                    </div>
                    <div className="flex justify-end">
                      <div className="absolute top-0 right-0">
                        <RenderDeleteBooking
                          id={booking.id}
                          onDelete={handleDeleteBooking}
                        />
                      </div>
                    </div>
                  </div>
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
