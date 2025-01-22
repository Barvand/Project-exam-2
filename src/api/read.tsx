import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        const response = await fetch(url, options); // Use options if provided
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const json = await response.json();
        setData(json.data || json); // Handle cases where `json.data` might not exist
      } catch (error) {
        setIsError(true);
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]); // Add `options` to the dependency array

  return { data, isLoading, isError };
}

export default useFetchAPI;
