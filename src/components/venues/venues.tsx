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

interface VenuesProps {
  data: Venue[];
  page: number;
  setPage: (page: number) => void;
}

const RenderVenues: React.FC<VenuesProps> = ({ data, page, setPage }) => {

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {data.map((venue) => (
          <div key={venue.id}>
            <Link to={`/venues/${venue.id}`}>
              <img
                className="h-56 bg-cover bg-center w-full"
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
              <h1 className="text-2xl font-bold text-secondary">{venue.name}</h1>
            </div>
            <p className="text-md">
              {venue.description.length > 150
                ? venue.description.slice(0, 150) + "..."
                : venue.description}
            </p>
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
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setPage(page + 1)}
      >
        Increase
      </button>
    </div>
  );
};

export default RenderVenues;
