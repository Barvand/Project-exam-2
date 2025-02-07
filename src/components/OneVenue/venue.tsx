import { FaWifi } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { Location, Owner } from "../../types/venue.array";
import { Link } from "react-router-dom";
import BookingForm from "./bookingForm";
import { useAuth } from "../../authentication/AuthProvider";

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
  const { isLoggedIn } = useAuth();

  return (
    <section className="container mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 grid-rows-[auto]">
        {/* Main Image - Takes full width on small screens, spans 2 rows on larger screens */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2 h-[500px]">
          <img
            className="object-cover object-center w-full h-full rounded-lg"
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

        {/* Smaller Images (Second and third images side by side) */}
        <div className="lg:col-span-1 lg:row-span-1">
          {/* Image 1 */}
          <div className="h-[240px]">
            <img
              className="object-fill w-full h-full rounded-lg"
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
        </div>

        <div className="lg:col-span-1 lg:row-span-1">
          {/* Image 2 */}
          <div className="h-[240px]">
            <img
              className="object-fill w-full h-full rounded-lg"
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
        </div>

        {/* Venue Details Section */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-3">
          <div className="flex justify-between bg-customPurple-100 p-2 items-center rounded-lg">
            <div>
              <h2 className="text-2xl font-bold pt-1 text-customPurple-800 capitalize">
                {data.name}
              </h2>
              <p className="text-gray-700 text-sm">
                Information about the property:
              </p>
              <p className="text-md normal-case text-black">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        {/* Amenities, Address, and Booking */}
        <div className="col-span-2 lg:grid lg:grid-cols-3 lg:gap-4 lg:col-span-3 h-[400px]">
          {/* Amenities */}
          <div className="p-4 bg-customPurple-100 rounded-lg mb-4">
            <h2 className="text-2xl font-bold text-customPurple-800">
              Amenities
            </h2>
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 align-center">
                <FaWifi className="text-3xl text-customPurple-200 bg-customPurple-900 rounded-full h-8 w-8 p-1" />
                {data.meta.wifi ? "Available" : "Not Available"}
              </p>
              <p className="flex gap-2 align-center">
                <IoFastFoodSharp className="text-3xl text-customPurple-200 bg-customPurple-900 rounded-full h-8 w-8 p-1" />
                {data.meta.breakfast ? "Included" : "Not included"}
              </p>
              <p className="flex gap-2 align-center">
                <MdOutlinePets className="text-3xl text-customPurple-200 bg-customPurple-900 rounded-full h-8 w-8 p-1" />
                {data.meta.pets ? "Pets: Allowed" : "Pets: Not allowed"}
              </p>
              <p className="flex gap-2 align-center">
                <FaParking className="text-3xl text-customPurple-200 bg-customPurple-900 rounded-full h-8 w-8 p-1" />
                {data.meta.parking
                  ? "Parking: Included"
                  : "Parking: Not included"}
              </p>
              <div className="absolute hidden group-hover:block bg-black text-white text-sm p-2 rounded mt-1 left-0">
                Parking
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="p-4 bg-customPurple-200 rounded-lg mb-4">
            <h2 className="text-2xl font-bold text-customPurple-800">
              Address
            </h2>
            <div>
              <p className="text-xl">Street:</p>
              {data.location.address ? (
                <p className="text-md">
                  {data.location.address}, {data.location.zip}
                </p>
              ) : (
                <p className="text-md">Very strange but, no address provided</p>
              )}
            </div>
            <div>
              <p className="text-xl">City:</p>
              {data.location.city ? (
                <p className="text-md">{data.location.city}</p>
              ) : (
                <p className="text-md">No city provided</p>
              )}
            </div>
            <div>
              <p className="text-xl">Country:</p>
              {data.location.country ? (
                <p className="text-md">{data.location.country}</p>
              ) : (
                <p className="text-md">No country provided</p>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-customPurple-300 rounded-lg flex items-center justify-center mb-4">
            {!isLoggedIn ? (
              <div className="px-4 py-3 text-center flex flex-col gap-2">
                <p className="font-bold">
                  Log in to continue placing a booking.
                </p>
                <Link
                  className="py-1 px-5 rounded w-32 flex justify-evenly items-center bg-customPurple-50 text-customPurple-900 mx-auto"
                  to="/login"
                >
                  Login here
                </Link>
              </div>
            ) : (
              <BookingForm />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <img
          className="rounded-full w-12 h-12"
          src={data.owner.avatar.url}
          alt={data.owner.name}
        />
        <Link
          to={`/profiles/${data.owner.name}`}
          className="text-md font-bold py-4 text-customPurple-800 capitalize"
        >
          {data.owner.name}
        </Link>
      </div>
    </section>
  );
};

export default RenderVenue;
