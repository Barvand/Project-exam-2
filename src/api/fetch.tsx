import { useState, useEffect, useMemo } from "react";

export default function useFetchAPI({
  url,
  options = {},
}: {
  url: string;
  options?: RequestInit;
}) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add state for error message

  // Memoize options to avoid unnecessary re-fetching
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        const response = await fetch(url, memoizedOptions);

        const data = await response.json();

        // If there is an error in the response
        if (data.errors && data.errors.length > 0) {
          setIsError(true);
          setErrorMessage(data.errors[0].message);
        } else {
          setData(data.data || data); // Handle cases where json.data might not exist
          setMeta(data.meta || null); // Handle cases where json.meta might not exist
        }
      } catch (error: any) {
        setIsError(true);
        setErrorMessage(
          error.message || "An error occurred while fetching data"
        );
        console.error(error); // Optional: log the error for debugging
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, memoizedOptions]); // Use memoized options in the dependency array

  return { data, isLoading, isError, meta, errorMessage }; // Return the error message
}
