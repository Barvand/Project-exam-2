import { Link } from "react-router-dom";
import { Owner } from "../../types/venue.array";
import StarRating from "./Ratings";
import SearchBar from "../index/searchBar";

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  meta: { wifi: boolean; breakfast: boolean };
  owner: Owner;
  rating: number;
  price: number;
  location: {
    city: string;
    country: string;
  };
}

export interface Meta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  pageCount: number;
}

interface VenuesProps {
  data: Venue[];
  page: number;
  meta: Meta;
  setPage: (page: number) => void;
}

/**
 * RenderVenues Component
 *
 * Renders a grid of venue cards along with a "Load More" button for pagination.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Venue[]} props.data - Array of venue objects to display.
 * @param {number} props.page - Current page number.
 * @param {Meta} props.meta - Metadata from the API response for pagination.
 * @param {(page: number) => void} props.setPage - Function to update the page number.
 *
 * @returns {JSX.Element} A container with the venue cards and pagination controls.
 *
 * @example
 * <RenderVenues data={venues} page={1} setPage={setPage} meta={meta} />
 */
export function RenderVenues({ data, meta, page, setPage }: VenuesProps) {
  return (
    <div className="container">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {data.map((venue) => (
          <div
            key={venue.id}
            className="rounded relative bg-color overflow-hidden group"
          >
            <Link to={`/venues/${venue.id}`}>
              <img
                className="h-72 object-cover object-center w-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all transform" // Added group-hover for scaling effect
                loading="lazy"
                src={
                  venue.media && venue.media.length > 0
                    ? venue.media[0].url
                    : "placeholder.png"
                }
                alt={
                  venue.media && venue.media.length > 0
                    ? venue.media[0].alt
                    : "picture of a villa"
                }
              />
              <div
                className="text-white p-2 py-2 rounded absolute w-full bottom-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                  color: "white",
                }}
              >
                <div className="flex justify-between">
                  <StarRating rating={venue.rating} />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {venue.name.length > 40
                      ? venue.name.slice(0, 25) + "..."
                      : venue.name}
                  </h2>
                  <p className="text-2xl font-bold"> ${venue.price}</p>
                </div>
                <div className="flex">
                  <p>
                    {venue.location.city},{" "}
                    <span> {venue.location.country} </span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        {!meta.isLastPage && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded m-4"
            onClick={() => setPage(page + 1)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default RenderVenues;
