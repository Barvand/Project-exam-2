import { Link } from "react-router-dom";
import DisplayBookings from "../bookings/displayBookings";
import RenderDeleteVenue from "./deleteVenue";
import UpdateVenue from "./updateVenue";
import Accordion from "../../features/Accordion";

// Define the types for venue and the data prop
interface Venue {
  id: string;
  name: string;
  _count: {
    bookings: number;
  };
}

interface VenueAccordionListProps {
  data: Venue[]; // Array of venue objects
}

function RenderVenueBookings({ data }: VenueAccordionListProps) {
  return (
    <div className="container">
      {data.map((venue) => (
        <Accordion
          key={venue.id}
          title={`Property name: ${venue.name} (Bookings: ${venue._count.bookings})`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <DisplayBookings venueId={venue.id} />
            <div className="flex flex-col gap-1 justify-evenly">
              <Link to={`/venues/${venue.id}`}>
                <button className="p-2 bg-green-500 rounded text-white inline-block">
                  Visit venue
                </button>
              </Link>
              <RenderDeleteVenue id={venue.id} />
              <UpdateVenue id={venue.id} />
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  );
}

export default RenderVenueBookings;
