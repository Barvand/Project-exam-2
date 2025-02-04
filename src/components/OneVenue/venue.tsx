import { FaWifi } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { Location, Owner } from "../../types/venue.array";
import { Link } from "react-router-dom";

interface Venue {
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  meta: { wifi: boolean; breakfast: boolean; pets: boolean; parking: boolean };
  owner: Owner;
  location: Location;
}

interface VenueProps {
  data: Venue;
}
const RenderVenue: React.FC<VenueProps> = ({ data }) => {
  return (
    <section className="container mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[500px] gap-1 p-1">
        {/* Main Image - Left (Takes 2 columns) */}
        <div className="col-span-2">
          <img
            className="object-cover w-full h-full rounded-lg"
            src={
              data.media && data.media.length > 0
                ? data.media[0].url
                : "/unknown-user.png"
            }
            alt={
              data.media && data.media.length > 0
                ? data.media[0].alt
                : "default alt text"
            }
          />
        </div>

        {/* Right Side Grid (Stacked Images) */}
        <div className="col-span-2 sm:col-span-1 grid grid-rows-2 gap-2">
          {/* Image 1 */}
          <div className="md:h-[245px]">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={
                data.media && data.media.length > 0
                  ? data.media[0].url
                  : "/unknown-user.png"
              }
              alt={
                data.media && data.media.length > 0
                  ? data.media[0].alt
                  : "default alt text"
              }
            />
          </div>
          {/* Image 2 */}
          <div className="sm:h-[245px]">
            <img
              className="object-cover w-full h-full rounded-lg"
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
          </div>
        </div>

        {/* Venue Details Section */}
        <div className="px-6">
          <h2 className="text-2xl font-bold pt-1 text-primary">{data.name}</h2>
          <div className="flex gap-2">
            <img
              className="rounded-full w-12 h-12"
              src={data.owner.avatar.url}
              alt={data.owner.name}
            />
            <Link
              to={`/profiles/${data.owner.name}`}
              className="text-md font-bold py-4 text-gray-600"
            >
              {data.owner.name}
            </Link>
          </div>
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
    </section>
  );
};

export default RenderVenue;
