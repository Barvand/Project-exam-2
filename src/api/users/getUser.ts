import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchAPI from "../fetch";
import { GetHeaders } from "../headers";

export default function GetProfile() {
  const { username } = useParams(); // Get the 'username' from the route parameters

  // Memoize headers to prevent unnecessary recalculations
  const headers = useMemo(() => GetHeaders(), []);

  // Fetch user data
  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`,
    options: {
      method: "GET",
      headers,
    },
  });

  return { data, isLoading, isError };
}
