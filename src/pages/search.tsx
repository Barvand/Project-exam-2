import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../features/loading";
import RenderVenues from "../components/venues/venues";
import { fetchData } from "../api/api";
import { Helmet } from "react-helmet-async";

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || ""; // Ensure "q" is the correct query parameter
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      setData([]);
      setMeta([]);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setIsError("");

      try {
        const response = await fetchData(
          `holidaze/venues/search?q=${searchQuery}&page=${page}`
        );

        setData(response.data || []);
        setMeta(response.meta || []);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, page]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading results. Please try again later.</div>;

  return (
    <>
      <Helmet>
        <title>Holidaze - Searched for {searchQuery}</title>
        <meta
          name="description"
          content="holidaze, search, bookings, holiday, sun, beach"
        />
      </Helmet>
      <div className="container">
        <div className="border-b mb-5">
          <h1 className="text-xl py-3">
            You have searched for the following:
            <span className="font-bold capitalize"> {searchQuery} </span>
          </h1>
          {meta.totalCount === 0 ? (
            <p className="py-3 text-gray-600">
              Unfortunately, we did not find a match.
            </p>
          ) : (
            <p>Your search had {meta.totalCount} matches</p>
          )}
        </div>
        <RenderVenues data={data} page={page} setPage={setPage} meta={meta} />
      </div>
    </>
  );
}
