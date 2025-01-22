import { useState } from "react";
import useFetchAPI from "../api/read";
import RenderVenues from "../components/venues/venues";

function VenuesPage() {
  const [page, setPage] = useState(1); // Initialize as a number
  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/venues?page=${page}&sort=created&sortOrder=desc`,
  });

  console.log(data)

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return <RenderVenues data={data} page={page} setPage={setPage} />;
}

export default VenuesPage;
