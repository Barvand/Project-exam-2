import RenderDeleteVenue from "./deleteVenue";

interface VenueMedia {
  url: string;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  created: string;
  media: VenueMedia[];
  _count?: {
    bookings: number;
  };
}

interface RenderVenueProps {
  venues: Venue[];
}

function RenderVenues({ venues }: RenderVenueProps) {
  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold mt-5">
          Welcome to the venue managers page
        </h1>
        <p> Here you can add and manage all your properties. </p>
      </div>
      {venues.map((venue) => (
        <details
          key={venue.id}
          className="venue-dropdown bg-customPurple-900 rounded-lg shadow-md overflow-hidden mb-2 hover:bg-customPurple-500 "
        >
          <summary className="venue-summary text-white p-4 cursor-pointer flex justify-between items-center bg-customPurple-900 hover:bg-customPurple-500 transition-all duration-300">
            <span className="font-semibold">{venue.name}</span>
            <span className=" text-sm">
              {venue._count?.bookings ?? 0} Bookings
            </span>
            <p className="">
              Posted at{" "}
              {new Date(venue.created).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </summary>
          <div className="flex justify-start">
            <img
              src={venue.media[0].url}
              alt={`Venue: ${venue.name}`}
              className="h-48 object-contain rounded-md border border-gray-700"
            />
            <div className="venue-details p-4 bg-gray-900 text-white border-t border-gray-700">
              <h2 className="text-xl"> Description: </h2>
              <p className="mb-3 text-gray-300">{venue.description}</p>
            </div>
            <RenderDeleteVenue id={venue.id} />
          </div>
        </details>
      ))}
    </div>
  );
}

export default RenderVenues;
