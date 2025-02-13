import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import RenderVenue from "../components/OneVenue/venue";
import Loading from "../features/loading";
import { fetchData } from "../api/api";

function VenuePage() {
  const { id } = useParams(); // Get ID from URL params
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    if (!id) return; // Prevent fetching if id is missing

    async function fetchVenue() {
      setIsLoading(true); // Set loading state when fetch begins
      try {
        const venueData = await fetchData(`holidaze/venues/${id}?_owner=true`);

        setData(venueData.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsError(error.message);
        }
      } finally {
        setIsLoading(false); // Always stop loading
      }
    }

    fetchVenue();
  }, [id]); // Re-fetch if ID changes

  if (isLoading) return <Loading />;
  if (isError || !data)
    return <div>Error loading data. Please try again later.</div>;

  return (
    <div>
      <RenderVenue data={data} />
    </div>
  );
}

export default VenuePage;
