import DisplayBookings from "./displayBookings";
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
  data: Venue[];
}

/**
 * Renders an accordion component listing venues and their bookings.
 * Each venue has controls for viewing, updating, and deleting.
 *
 * @param {Object} props - Component properties.
 * @param {Venue[]} props.data - An array of venue objects containing booking details.
 *
 * @example
 * ```tsx
 * const venues = [
 *   { id: "1", name: "Hotel ABC", _count: { bookings: 5 } },
 *   { id: "2", name: "Resort XYZ", _count: { bookings: 3 } }
 * ];
 *
 * <RenderVenueBookings data={venues} />
 * ```
 *
 * @returns {JSX.Element} A list of venues wrapped in an accordion.
 */
function RenderVenueBookings({ data }: VenueAccordionListProps) {
  return (
    <div className="container">
      {data.map((venue) => (
        <Accordion
          key={venue.id}
          title={`${venue.name} (Bookings: ${venue._count.bookings})`}
        >
          <div className="flex flex-col">
            <DisplayBookings venueId={venue.id} />
          </div>
        </Accordion>
      ))}
    </div>
  );
}

export default RenderVenueBookings;
