import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/api";
import RenderVenues from "./RenderVenues";

function ManageVenues() {
  const { username } = useParams();
  const [venues, setVenues] = useState([]); // Store multiple venues
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetchData(
          `holidaze/profiles/${username}/venues/?_bookings?_venues`
        );

        setVenues(response.data); // Ensure response is an array
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="container">
      <RenderVenues venues={venues} />
    </div>
  );
}

export default ManageVenues;
