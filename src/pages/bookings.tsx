import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";
import Loading from "../features/loading";
import RenderBookingsProfile from "../components/bookings/RenderBookingsUser";
import { useAuth } from "../utils/useAuth";
import NotFoundPage from "./404";
import Accordion from "../features/Accordion";
import { Helmet } from "react-helmet-async";
import InformationIcon from "../features/icons/Information";

/**
 * A page that displays a user's upcoming and past bookings.
 *
 * @component
 * @description
 * - Fetches booking data for the logged-in user from the API.
 * - Categorizes bookings into upcoming and past bookings.
 * - Displays bookings in an accordion format using `RenderBookingsProfile`.
 * - Shows a loading indicator while fetching data.
 * - Redirects to the `NotFoundPage` if the user tries to access another profile's bookings.
 *
 * @returns {JSX.Element} A page displaying categorized bookings for the authenticated user.
 *
 * @example
 * ```tsx
 * <BookingsPage />
 * ```
 */
function BookingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const { username } = useParams();
  const { userProfile } = useAuth();

  useEffect(() => {
    if (!username) return;

    const fetchBookingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData(
          `holidaze/profiles/${username}/bookings/?_venue=true&sort=dateFrom&sortOrder=asc`
        );
        const data = response.data;

        const currentDate = new Date();

        // Filter bookings into upcoming and past
        const upcoming = data.filter((booking: any) => {
          const bookingDate = new Date(booking.dateFrom);
          return bookingDate >= currentDate; // Future bookings
        });

        const past = data.filter((booking: any) => {
          const bookingDate = new Date(booking.dateFrom);
          return bookingDate < currentDate; // Past bookings
        });
        setUpcomingBookings(upcoming);
        setPastBookings(past);
      } catch (error: any) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingData();
  }, [username]);

  if (!userProfile) {
    return <Loading />;
  }

  if (userProfile.name !== username) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Holidaze - See all your bookings</title>
        <meta
          name="description"
          content="Bookings page, all bookings, customers, holidays"
        />
      </Helmet>
      <div>
        <div className="mb-2 pb-2 bg-accentColor p-4">
          <h1 className="text-center text-3xl py-5 text-primary font-bold">
            Your bookings
          </h1>
        </div>
      </div>
      <div className="container px-3">
        <div className="text-white bg-primary font-bold py-4 p-2 my-5 flex gap-2 items-center">
          <InformationIcon />
          <h2 className="text-sm sm:text-md">
            Here you can find all your upcoming and past bookings. Manage your
            reservations, view venue details, and plan your next trip with ease.
          </h2>
        </div>
        <div className="container mb-5">
          <Accordion title="Upcoming Bookings" open={true}>
            <RenderBookingsProfile
              bookings={upcomingBookings}
              header="Upcoming Bookings"
              allowEditing={true}
            />
          </Accordion>
          <div className="mt-4">
            <Accordion title="Past Bookings" open={false}>
              <RenderBookingsProfile
                bookings={pastBookings}
                header="Past Bookings"
                allowEditing={false}
              />
            </Accordion>
          </div>

          {errorMessage && (
            <div
              className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-lg shadow-lg"
              style={{ zIndex: 9999 }}
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookingsPage;
