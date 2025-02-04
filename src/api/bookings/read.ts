import useFetchAPI from "../fetch";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { GetHeaders } from "../headers";

function GetBookings() {
  const { username } = useParams(); // Get the 'username' from the route parameters

  // Memoize headers to prevent unnecessary recalculations
  const headers = useMemo(() => GetHeaders(), []);

  // Fetch user data
  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/profiles/${username}/bookings?_venue=true`,
    options: {
      method: "GET",
      headers,
    },
  });

  return { data, isLoading, isError };
}

export default GetBookings;
