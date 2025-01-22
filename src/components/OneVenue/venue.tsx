import { FaWifi } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { Location } from "../../types/venue.array";

interface Venue {
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  meta: { wifi: boolean; breakfast: boolean; pets: boolean; parking: boolean };
  owner: string;
  location: Location;
}

interface VenueProps {
  data: Venue;
}
const RenderVenue: React.FC<VenueProps> = ({ data }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-2">
        <img
          className="bg-cover bg-center w-full px-6"
          src={
            data.media && data.media.length > 0
              ? data.media[0].url
              : "default-image-url"
          }
          alt={
            data.media && data.media.length > 0
              ? data.media[0].alt
              : "default alt text"
          }
        />
        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold py-4">{data.name}</h2>
          <p className="text-md">{data.description}</p>
          <div className="py-4 w-96 bg-slate-50">
            <p className="flex gap-2 align-center">
              <FaWifi className="text-3xl text-green-500" />
              {data.meta.wifi ? "Available" : "Not Available"}
            </p>
            <p className="flex gap-2 align-center">
              <IoFastFoodSharp className="text-3xl text-green-500" />
              {data.meta.breakfast ? "Available" : "Not Available"}
            </p>
            <p className="flex gap-2 align-center">
              <MdOutlinePets className="text-3xl text-green-500" />
              {data.meta.pets ? "Pets: Available" : "Pets: Not Available"}
            </p>
            <p className="flex gap-2 align-center">
              <FaParking className="text-3xl text-green-500" />
              {data.meta.parking
                ? "Parking: Available"
                : "Parking: Not Available"}
            </p>
            <div className="">
              <p> Address: {data.location.address} </p>
              <p> City: {data.location.city} </p>
              <p> Country: {data.location.country} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderVenue;
