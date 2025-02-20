import { useState, useEffect, useRef } from "react";
import { fetchData } from "../api";

/**
 *
 * @param venueId id a specific venue
 * @returns bookedDates =
 */
const useBookedDates = (venueId: string) => {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const hasFetched = useRef(true);

  useEffect(() => {
    if (!venueId || hasFetched.current) return;

    const fetchBookings = async () => {
      try {
        const response = await fetchData(
          `holidaze/venues/${venueId}?_bookings=true`
        );
        const data = response.data;

        if (data?.bookings) {
          const dates: Date[] = data.bookings.flatMap(
            (booking: { dateFrom: string; dateTo: string }) => {
              const startDate = new Date(booking.dateFrom);
              const endDate = new Date(booking.dateTo);
              const range: Date[] = [];
              for (
                let d = new Date(startDate);
                d <= endDate;
                d.setDate(d.getDate() + 1)
              ) {
                range.push(new Date(d));
              }
              return range;
            }
          );

          const uniqueDates = Array.from(
            new Set(dates.map((date) => date.toISOString()))
          ).map((dateString) => new Date(dateString));

          setBookedDates(uniqueDates);
          hasFetched.current = true;
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [venueId]);

  return bookedDates;
};

export default useBookedDates;
