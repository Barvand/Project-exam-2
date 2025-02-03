import React, { useState, useEffect } from "react";
import { FaWifi } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Owner } from "../../types/venue.array";

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
const RenderVenues: React.FC<VenuesProps> = ({ data, page, setPage, meta }) => {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);

  // Reset `allVenues` when the first page is loaded or when the data source changes
  useEffect(() => {
    if (page === 1) {
      setAllVenues(data); // Reset the list when loading the first page
    } else {
      setAllVenues((prevVenues) => {
        // Filter out duplicates by checking if the venue ID already exists
        const newVenues = data.filter(
          (newVenue) =>
            !prevVenues.some((prevVenue) => prevVenue.id === newVenue.id)
        );
        return [...prevVenues, ...newVenues];
      });
    }
  }, [data, page]);

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {allVenues.map((venue) => (
          <div key={venue.id}>
            <Link to={`/venues/${venue.id}`}>
              <img
                className="h-56 object-cover object-center w-full"
                loading="lazy"
                src={
                  venue.media && venue.media.length > 0
                    ? venue.media[0].url
                    : "default-image-url"
                }
                alt={
                  venue.media && venue.media.length > 0
                    ? venue.media[0].alt
                    : "default alt text"
                }
              />
            </Link>
            <div className="flex">
              <h1 className="text-2xl font-bold text-secondary">
                {venue.name}
              </h1>
            </div>
            <p className="text-md">
              {venue.description.length > 150
                ? venue.description.slice(0, 150) + "..."
                : venue.description}
            </p>
            <p> {venue.price} per night</p>
            <div className="py-4">
              <p className="flex gap-2 align-center">
                <FaWifi /> {venue.meta.wifi ? "Available" : "Not Available"}
              </p>
              <p>
                {venue.meta.breakfast
                  ? "Breakfast: Available"
                  : "Breakfast: Not Available"}
              </p>
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
};

export default RenderVenues;
