import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetchAPI from "../api/read";
import Loading from "../features/loading";
import RenderVenues from "../components/venues/venues";

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState([]);

  const {
    data: venues,
    isLoading,
    isError,
    meta: metaData,
  } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/venues/search?q=${searchQuery}&page=${page}`,
  });

  useEffect(() => {
    if (!searchQuery) {
      setData([]);
      return;
    }
    setMeta(meta);
    setData(venues || []);
  }, [venues, searchQuery, meta]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading results. Please try again later.</div>;

  return (
    <div className="container">
      <div className="border-b mb-5">
        <h1 className="text-xl py-3">
          You have searched for the following:
          <span className="font-bold capitalize"> {searchQuery} </span>
        </h1>
        {metaData.totalCount === 0 ? (
          <p className="py-3 text-gray-600">
            Unfortunately we did not find a match.
          </p>
        ) : (
          <p>Your search had {metaData.totalCount} matches</p>
        )}
      </div>
      <RenderVenues data={data} page={page} setPage={setPage} meta={metaData} />
    </div>
  );
}
