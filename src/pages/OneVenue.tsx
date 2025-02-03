import useFetchAPI from "../api/read";
import RenderVenue from "../components/OneVenue/venue";
import { useParams } from "react-router-dom";
import DeleteVenue from "../components/profile/deleteVenue";
import Loading from "../features/loading";

function VenuePage() {
  const { id } = useParams(); // Extract the 'id' from the route parameter

  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div>
      <RenderVenue data={data} />
      <DeleteVenue id={data.id} />
    </div>
  );
}

export default VenuePage;
