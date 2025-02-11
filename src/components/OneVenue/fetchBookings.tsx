import { useEffect, useState } from "react";
import { fetchData } from "../../api/api"; 

function useFetchBookings(id) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const response = await fetchData(
          `holidaze/venues/${id}?_bookings=true`
        );
        setBookings(response.data.bookings); 

        console.log(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookingsData();
    }
  }, [id]); 

  return { bookings, loading };
}

export default useFetchBookings;
