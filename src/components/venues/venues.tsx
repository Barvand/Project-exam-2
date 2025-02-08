import { Link } from "react-router-dom";
import { Owner } from "../../types/venue.array";
import StarRating from "../../features/Ratings";

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  meta: { wifi: boolean; breakfast: boolean };
  owner: Owner;
}

interface Meta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  pageCount: number;
  totalCount: number;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((venue) => (
          <div key={venue.id} className="border rounded p-2">
            <Link to={`/venues/${venue.id}`}>
              <img
                className="h-48 object-cover object-center w-full opacity-90 hover:opacity-100"
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
            </Link>
            <div className="flex">
              <h1 className="text-2xl font-bold">{venue.name}</h1>
            </div>
            <StarRating rating={venue.rating} />
            <div className="flex justify-end">
              <p className="text-md font-bold"> ${venue.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        {!meta.isLastPage && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
