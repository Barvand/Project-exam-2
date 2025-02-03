import { useState } from "react";
import useFetchAPI from "../api/read";
import RenderVenues from "../components/venues/venues";
import Loading from "../features/loading";
import VenueFilters from "../features/VenueFilter";

function VenuesPage() {
  const [page, setPage] = useState(1); // Current page
  const [sortOrder, setSortOrder] = useState("desc"); // Sort order (asc/desc)
  const [limit, setLimit] = useState(10); // Number of items per page
  const [sortBy, setSortBy] = useState("created"); // Field to sort by
  const [activeSort, setActiveSort] = useState("created"); // Store the active sort type

  // Construct the URL with dynamic query parameters
  const url = `https://v2.api.noroff.dev/holidaze/venues?page=${page}&limit=${limit}&sort=${sortBy}&sortOrder=${sortOrder}`;

  const { data, isLoading, isError, meta } = useFetchAPI({ url });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  // Function to change the sorting field
  const changeSortBy = (field) => {
    setSortBy(field);
    setActiveSort(field); // Update the active sort state
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Function to change the limit
  const changeLimit = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to the first page when changing the limit
  };

  return (
    <section className="container">
      {/* Use the VenueFilters component */}
      <VenueFilters
        activeSort={activeSort}
        sortOrder={sortOrder}
        changeSortBy={changeSortBy}
        limit={limit}
        changeLimit={changeLimit}
        meta={meta} // Pass meta if needed for totalCount
      />

      {/* Render Venues */}
      <RenderVenues data={data} page={page} setPage={setPage} meta={meta} />
    </section>
  );
}

export default VenuesPage;
