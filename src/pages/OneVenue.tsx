import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import getVenue from "../api/venue/getVenue";
import RenderVenue from "../components/OneVenue/venue";
import RenderDeleteVenue from "../components/profile/deleteVenue";
import Loading from "../features/loading";

function VenuePage() {
  const { id } = useParams(); // Get ID from URL params
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return; // Prevent fetching if id is missing

    async function fetchVenue() {
      try {
        const venueData = await getVenue(id);

        setData(venueData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
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
      <RenderDeleteVenue id={data.id} />
    </div>
  );
}

export default VenuePage;
