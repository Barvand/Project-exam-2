import GetVenue from "../api/venue/getVenue";
import RenderVenue from "../components/OneVenue/venue";
import RenderDeleteVenue from "../components/profile/deleteVenue";
import Loading from "../features/loading";

function VenuePage() {
  const { data, isLoading, isError } = GetVenue();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div>
      <RenderVenue data={data} />
      <RenderDeleteVenue id={data.id} />
    </div>
  );
}

export default VenuePage;
