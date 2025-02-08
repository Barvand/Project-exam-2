import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/api";
import CreateVenueForm from "../profile/createVenueForm";
import RenderVenues from "./RenderVenues";

function ManageVenues() {
  const { username } = useParams();
  const [venues, setVenues] = useState([]); // Store multiple venues
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetchData(
          `holidaze/profiles/${username}/venues/?_bookings?_venues`
        );

        setVenues(response.data); // Ensure response is an array

        console.log(response.data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (venues.length === 0) return <p>You do not have any venues yet.</p>;

  return (
    <div className="container">
      <RenderVenues venues={venues} />
      <CreateVenueForm />
    </div>
  );
}

export default ManageVenues;
