import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RenderDeleteBooking from "./deleteBooking";
import RenderUpdateBooking from "./updateBooking";
import { MdPerson3, MdGroups2 } from "react-icons/md";
import StarRating from "../venues/Ratings";

interface Location {
  city: string;
  country: string;
}
interface Booking {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  title: string;
  venue: {
    id: string;
    name: string;
    media?: { url: string; alt?: string }[];
    price: number;
    location: Location;
    rating: number;
  };
}

interface RenderBookingsProfileProps {
  bookings: Booking[];
  header: string;
  allowEditing?: boolean; // Default is true
}

/**
 * A component that displays a list of user bookings, allowing users to view, update, or delete them.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Booking[]} props.bookings - An array of bookings containing booking details.
 * @param {string} props.header - A title to be displayed above the booking list.
 * @param {boolean} [props.allowEditing=true] - A flag to determine whether editing and deletion are enabled.
 *
 * @description
 * - Displays a grid of booking cards, each showing venue details, check-in and check-out dates, and guest count.
 * - Allows users to update or delete bookings if `allowEditing` is `true`.
 * - Uses `RenderUpdateBooking` for booking updates and `RenderDeleteBooking` for deletion.
 * - Handles local state updates to reflect changes dynamically.
 * - Provides a fallback message if no bookings are available.
 *
 * @example
 * <RenderBookingsProfile bookings={userBookings} header="Your Bookings" allowEditing={true} />
 * ```
 *
 * @returns {JSX.Element} A responsive grid of user bookings with options to update or delete.
 */
function RenderBookingsProfile({
  bookings,
  header,
  allowEditing = true,
}: RenderBookingsProfileProps) {
  const [newBookings, setNewBookings] = useState<Booking[]>([]);

  // Sync state with prop changes
  useEffect(() => {
    setNewBookings(bookings);
  }, [bookings]);

  // Handle deletion of a booking
  const handleDeleteBooking = (id: string) => {
    setNewBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

  // Handle updating a booking
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
      <h1 className="text-2xl border-b border-black mb-2"> {header} </h1>

      {newBookings.length === 0 ? (
        <p>No bookings available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1  xl:grid-cols-2 gap-2">
          {newBookings.map((booking) => {
            const fromDate = new Date(booking.dateFrom);
            const toDate = new Date(booking.dateTo);

            // Format the dates
            const formattedFromDate = fromDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            });

            const formattedToDate = toDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            });

            // Calculate total days
            const totalDays = Math.ceil(
              (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24)
            );

            // Calculate total price
            const totalPrice = booking.venue.price * totalDays;

            return (
              <div
                key={booking.id}
                className="rounded relative bg-color overflow-hidden group border border-gray-300 shadow-md p-2 md:flex gap-3 md:h-72"
              >
                <div className="w-full h-64 md:w-72">
                  <Link to={`/venues/${booking.venue.id}`}>
                    <img
                      className="h-full object-cover object-center w-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all transform overflow-hidden"
                      loading="lazy"
                      src={booking.venue.media?.[0]?.url || "default-image-url"}
                      alt={booking.venue.media?.[0]?.alt || "default alt text"}
                    />
                  </Link>
                </div>
                <div className="p-1 rounded w-full">
                  <div className="flex justify-between  py-2">
                    <h2 className="text-2xl text-primary font-bold">
                      {booking.venue.name}
                    </h2>
                    {allowEditing && (
                      <RenderUpdateBooking
                        id={booking.id}
                        booking={booking}
                        onUpdate={handleUpdateBooking}
                      />
                    )}
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <p>
                      {booking.venue.location.city},{" "}
                      {booking.venue.location.country}
                    </p>
                    <StarRating rating={booking.venue.rating} />
                  </div>
                  <div className="flex flex-col py-2 border-b border-gray-200">
                    <p className="text-lg font-semibold">
                      Check-in:{" "}
                      <span className="text-green-700 font-bold">
                        {formattedFromDate}
                      </span>
                    </p>
                    <p className="text-lg font-semibold">
                      Check-out:{" "}
                      <span className="text-red-700 font-bold">
                        {formattedToDate}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex flex-row">
                      <p className="text-2xl">
                        {booking.guests === 1 ? (
                          <MdPerson3 className="text-primary" />
                        ) : (
                          <MdGroups2 className="text-primary" />
                        )}
                      </p>
                      <p className="text-bold">{booking.guests} </p>
                    </div>
                    <p className="text-primary font-bold">
                      {" "}
                      ${totalPrice} / Total
                    </p>
                  </div>
                  <div className="py-2">
                    <p className="font-bold">
                      Booking ref:
                      <span className="font-normal"> {booking.id} </span>
                    </p>
                  </div>
                  {allowEditing && (
                    <div className="flex justify-end">
                      <div className="absolute top-2 left-2">
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
