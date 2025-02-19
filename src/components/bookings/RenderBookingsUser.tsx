import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RenderDeleteBooking from "./deleteBooking";
import RenderUpdateBooking from "./updateBooking";
import { MdPerson3, MdGroups2 } from "react-icons/md";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: {
    id: string;
    name: string;
    media?: { url: string; alt?: string }[];
  };
}

interface RenderBookingsProfileProps {
  bookings: Booking[];
  header: string;
  allowEditing?: boolean; // Default is true
}

function RenderBookingsProfile({
  bookings,
  header,
  allowEditing = true,
}: RenderBookingsProfileProps) {
  const [newBookings, setNewBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setNewBookings(bookings); // Sync state with prop changes
  }, [bookings]);

  const handleDeleteBooking = (id: string) => {
    setNewBookings((prevBookings) => {
      const updatedBookings = prevBookings.filter(
        (booking) => booking.id !== id
      );
      return [...updatedBookings];
    });
  };

  const handleUpdateBooking = (
    id: string,
    updatedBooking: Partial<Booking>
  ) => {
    setNewBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      )
    );
  };

  return (
    <div className="container">
      <h1 className="text-2xl pb-4 pt-4"> {header} </h1>

      {newBookings.length === 0 ? (
        <p>No bookings available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {newBookings.map((booking) => {
            const formattedFromDate = new Date(
              booking.dateFrom
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "numeric",
            });

            const formattedToDate = new Date(booking.dateTo).toLocaleDateString(
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
                    src={booking.venue.media?.[0]?.url || "default-image-url"}
                    alt={booking.venue.media?.[0]?.alt || "default alt text"}
                  />
                </Link>
                <div className="flex flex-col border bg-shadeVenues p-2 rounded">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">{booking.venue.name}</h2>
                    {allowEditing && (
                      <RenderUpdateBooking
                        id={booking.id}
                        booking={booking}
                        onUpdate={handleUpdateBooking}
                      />
                    )}
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
                  <div className="">
                    <p className="font-bold">
                      Booking ref:
                      <span className="font-normal"> {booking.id} </span>
                    </p>
                  </div>
                  {allowEditing && (
                    <div className="flex justify-end">
                      <div className="absolute top-0 right-0">
                        <RenderDeleteBooking
                          id={booking.id}
                          onDelete={handleDeleteBooking}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RenderBookingsProfile;
