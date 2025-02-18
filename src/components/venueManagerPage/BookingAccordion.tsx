import { useState } from "react";
import DisplayBookings from "../bookings/displayBookings";
import { Link } from "react-router-dom";
import RenderDeleteVenue from "./deleteVenue";
import UpdateVenue from "./updateVenue";

// Define the types for venue and the data prop
interface Venue {
  id: string;
  name: string;
  _count: {
    bookings: number;
  };
}

interface AccordionProps {
  data: Venue[]; // Array of venue objects
}

function Accordion({ data }: AccordionProps) {
  // State to track which accordion item is active
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // activeIndex can be a number or null

  const toggleAccordion = (index: number) => {
    // Toggle the active accordion by index
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="container">
      {data.map((venue, index) => (
        <div key={venue.id} className="mb-2">
          {/* Accordion Button */}
          <div
            className={`flex flex-row justify-between accordion ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="text-md">
              Property name: <span className="font-bold"> {venue.name} </span>
            </h2>
            <p>Bookings: {venue._count.bookings}</p>
          </div>

          {/* Accordion Panel */}
          <div
            className="panel flex flex-col sm:flex-row sm:justify-between"
            style={{
              maxHeight: activeIndex === index ? "10000px" : "0",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
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
        </div>
      ))}
    </div>
  );
}

export default Accordion;
