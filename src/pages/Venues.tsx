import { useState, useEffect } from "react";
import RenderVenues from "../components/venues/venues";
import VenueFilters from "../features/VenueFilter";
import { Venue } from "../types/venue";
import { fetchData } from "../api/api";

function VenuesPage() {
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [sortBy, setSortBy] = useState<string>("created");
  const [activeSort, setActiveSort] = useState<string>("created");
  const [accumulatedData, setAccumulatedData] = useState<Venue[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [metaData, setMetaData] = useState<any>([]);

  // Fetch venues on component mount
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetchData(
          `holidaze/venues/?sort=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=32`
        );
        const data = response.data;
        const meta = response.meta;
        setMetaData(meta);
        setVenues(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, [sortBy, sortOrder, page]);

  // Accumulate data and filter duplicates
  useEffect(() => {
    if (venues && venues.length > 0) {
      setAccumulatedData((prevData) => {
        const newData = venues.filter(
          (venue) =>
            !prevData.some((existingItem) => existingItem.id === venue.id)
        );
        return [...prevData, ...newData];
      });
    }
  }, [venues]);

  // Change the sorting field and reset accumulated data
  const changeSortBy = (field: string) => {
    setSortBy(field);
    setActiveSort(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setAccumulatedData([]); // Reset accumulated data when sorting changes
    setPage(1); // Reset to the first page
  };

  // Toggle sort order and reset accumulated data
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setAccumulatedData([]); // Reset accumulated data when sorting order changes
    setPage(1); // Reset to the first page
  };

  return (
    <div>
      <VenueFilters
        activeSort={activeSort}
        sortOrder={sortOrder}
        changeSortBy={changeSortBy}
        toggleSortOrder={toggleSortOrder}
      />
      <RenderVenues
        data={accumulatedData}
        page={page}
        setPage={setPage}
        meta={metaData}
      />
    </div>
  );
}

export default VenuesPage;
