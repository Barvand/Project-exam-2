import { useState, useEffect } from "react";
import { Venues } from "../types/venue.array";
import RenderVenues from "../components/venues/venues";

function VenuesPage() {
  const [data, setData] = useState<Venues[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues?page=${page}`
        );
        const result = await response.json();
        const venues = result.data as Venues[];
        setData(venues); // Set the fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProfileData();
  }, [page]);

  // Loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return <RenderVenues data={data} page={page} setPage={setPage} />;
}

export default VenuesPage;
