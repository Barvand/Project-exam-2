import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const cachedData = localStorage.getItem("allVenues");

        if (cachedData) {
          setData(JSON.parse(cachedData)); // If data exists in localStorage, use it
          setIsLoading(false);
          return;
        }

        let allData = [];
        let page = 1;
        const limit = 100;

        while (true) {
          const url = `https://v2.api.noroff.dev/holidaze/venues?page=${page}&limit=${limit}`;
          const response = await fetch(url);
          const results = await response.json();

          if (results.data && results.data.length > 0) {
            allData = [...allData, ...results.data];
            page += 1;
          } else {
            break; // Exit the loop if no more data is available
          }
        }

        // Store the fetched data in localStorage for future use
        localStorage.setItem("allVenues", JSON.stringify(allData));

        setData(allData); // Set all the data from all pages
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    };

    fetchAllProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Oops, something went wrong: {error}</div>;
  }

  // Filter products based on the search term (case-insensitive)
  const filteredVenues = data.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center relative text-black">
        <div className="flex flex-col border-1 p-1 border-white overflow-hidden w-full md:w-1/2">
          {/* Search input */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Find your dream destination"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm text-black rounded"
            />
            <div className="p-3 bg-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="fill-white"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </div>
          </div>

          {/* Only display search results if there is a search term */}
          {search && (
            <div className="absolute bg-primary w-full md:w-1/2 top-full border-blue-500 rounded-md mt-1 z-10">
              {filteredVenues.length > 0 ? (
                filteredVenues.map((venue) => (
                  <div
                    key={venue.id}
                    className="w-full px-4 py-2 hover:bg-gray-800"
                  >
                    <Link
                      to={`/venues/${venue.id}`}
                      onClick={() => setSearch("")}
                      className="flex items-center gap-2"
                    >
                      {venue.media[0] && venue.media[0] ? (
                        <img
                          src={venue.media[0].url}
                          alt={venue.media[0].alt}
                          className="h-10 w-10 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-300"></div> // Add a placeholder if no image exists
                      )}
                      <p className="font-bold text-white">{venue.name}</p>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-white">No venues found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
