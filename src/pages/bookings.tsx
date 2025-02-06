import RenderBookingsProfile from "../components/profile/BookingsByUser";
import GetBookings from "../api/bookings/read";
import Loading from "../features/loading";

function BookingsPage() {
  const { data, isLoading, isError } = GetBookings();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div>
      <RenderBookingsProfile bookings={data} />
    </div>
  );
}

export default BookingsPage;
