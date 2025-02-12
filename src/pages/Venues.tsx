import { useState, useEffect } from "react";
import RenderVenues from "../components/venues/venues";
import Loading from "../features/loading";
import VenueFilters from "../features/VenueFilter";
import GetVenues from "../api/venues/getVenues";
import { Venue } from "../types/venue";

function VenuesPage() {
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [limit, setLimit] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>("created");
  const [activeSort, setActiveSort] = useState<string>("created");
  const [accumulatedData, setAccumulatedData] = useState<any>([]); // Correctly typing accumulatedData as Venue[]

  const { data, isLoading, isError, meta } = GetVenues({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  // Accumulate data when new data is fetched, avoiding duplicates
  useEffect(() => {
    if (data && data.length > 0) {
      setAccumulatedData((prevData: Venue[]) => {
        const newData = data.filter(
          (
            item: Venue // Use the correct type (Venue) here instead of any
          ) => !prevData.some((existingItem) => existingItem.id === item.id) // Check for duplicates
        );
        return [...prevData, ...newData]; // Add only unique items
      });
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data. Please try again later.</div>;

  const changeSortBy = (field: string) => {
    setSortBy(field);
    setActiveSort(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setAccumulatedData([]); // Reset accumulated data when sorting changes
    setPage(1); // Reset to the first page
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setAccumulatedData([]); // Reset accumulated data when limit changes
  };

  return (
    <div>
      <VenueFilters
        activeSort={activeSort}
        sortOrder={sortOrder}
        changeSortBy={changeSortBy}
        limit={limit}
        changeLimit={changeLimit}
      />
      <RenderVenues
        data={accumulatedData}
        page={page}
        setPage={setPage}
        meta={meta}
      />
    </div>
  );
}

export default VenuesPage;
