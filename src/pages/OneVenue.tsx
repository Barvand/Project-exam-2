import useFetchAPI from "../api/read";
import RenderVenue from "../components/OneVenue/venue";
import { useParams } from "react-router-dom";

function VenuePage() {
  const { id } = useParams(); // Extract the 'id' from the route parameter

  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`,
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return <RenderVenue data={data} />;
}

export default VenuePage;
