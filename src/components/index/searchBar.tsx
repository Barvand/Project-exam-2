import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useFetchAPI from "../../api/fetch";
import { useNavigate } from "react-router-dom";
import Loading from "../../features/loading";
import ErrorMessage from "../../error-handling/error";
import { Venues } from "../../types/venue.array"; // Ensure Venues type is defined here

export default function SearchBar() {
  const [data, setData] = useState<Venues[]>([]); 
  const [search, setSearch] = useState<string>(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };

  const {
    data: venues,
    isLoading,
    isError,
  } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/venues/search?q=${search}`,
  });

  useEffect(() => {
    if (!search) {
      setData([]);
      setIsDropdownOpen(false);
      return;
    }

    if (!isLoading && !isError) {
      setData(venues || []);
      setIsDropdownOpen(true);
    }
  }, [venues, search, isLoading, isError]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click is outside the search container
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add the event listener to the document for click events
    document.addEventListener("click", handleClickOutside);

    // Cleanup: Remove the event listener on component unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="container flex justify-end text-black w-full relative"
    >
      <div className="border-1 p-1 border-white overflow-hidden w-[250px] sm:w-[500px]">
        <div className="flex items-center">
          <form className="w-full flex" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find your dream destination"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsDropdownOpen(e.target.value !== "");
              }}
              className="w-full outline-none text-sm text-black rounded"
            />
            <div className="p-3 bg-accentColor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="fill-white"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </div>
          </form>
        </div>

        {isDropdownOpen && (
          <div className="absolute bg-primary top-full border-blue-500 rounded-md mt-1 z-10 w-full sm:w-[500px]">
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="text-sm text-white bg-gray-700 px-2 py-1 rounded absolute right-2 top-2"
            >
              Close
            </button>

            {isLoading ? (
              <Loading />
            ) : isError ? (
              <ErrorMessage message={"Something went wrong"} />
            ) : data.length > 0 ? (
              data.map((venue) => (
                <div
                  key={venue.id}
                  className="w-full px-4 py-2 hover:bg-gray-800"
                >
                  <Link
                    to={`/venues/${venue.id}`}
                    onClick={() => {
                      setSearch("");
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    {venue.media?.[0] ? (
                      <img
                        src={venue.media[0].url}
                        alt={venue.media[0].alt || "Venue image"}
                        className="h-10 w-10 object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-300"></div>
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
  );
}
