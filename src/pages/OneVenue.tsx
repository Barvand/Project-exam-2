import useFetchAPI from "../api/read";
import RenderVenue from "../components/OneVenue/venue";
import { useParams } from "react-router-dom";
import DeleteVenue from "../components/profile/deleteVenue";

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

  console.log(data.id)
  return (
    <div>
      <RenderVenue data={data} />
      <DeleteVenue id={data.id} />
    </div>
  );
}

export default VenuePage;
