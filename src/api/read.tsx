import { useState, useEffect, useMemo } from "react";

function useFetchAPI({
  url,
  options = {},
}: {
  url: string;
  options?: RequestInit;
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [meta, setMeta] = useState(null)

  // Memoize options to avoid unnecessary re-fetching
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        const response = await fetch(url, memoizedOptions); // Use memoized options
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const json = await response.json();
        setData(json.data || json); // Handle cases where json.data might not exist
        setMeta(json.meta || json);
      } catch (error) {
        setIsError(true);
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, memoizedOptions]); // Use memoized options in the dependency array

  return { data, meta, isLoading, isError };
}

export default useFetchAPI;
