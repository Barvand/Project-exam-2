import { useState } from "react";
import { FaWifi } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { Link } from "react-router-dom";
import BookingForm from "./bookingForm";
import { useAuth } from "../../utils/useAuth";
import { MdHouse } from "react-icons/md";
import { FaMountainCity } from "react-icons/fa6";
import { HiOutlineGlobe } from "react-icons/hi";
import StarRating from "../venues/Ratings";

interface Venue {
  name: string;
  description: string;
  price: string;
  rating: number;
  media: { url: string; alt: string }[];
  meta: { wifi: boolean; breakfast: boolean; pets: boolean; parking: boolean };
  owner: { name: string; avatar: { url: string } };
  location: { address?: string; zip?: string; city?: string; country?: string };
}

interface VenueProps {
  data: Venue;
}

/**
 * A component that displays detailed information about a venue, including images,
 * description, amenities, location, host information, and a booking form.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Venue} props.data - The venue data containing details like name, description, price, rating, media, amenities, owner, and location.
 *
 * @description
 * - Displays a large main image and a gallery of thumbnails for venue images.
 * - Shows venue details such as name, price per night, description, and rating.
 * - Lists available amenities such as WiFi, breakfast, pet-friendliness, and parking.
 * - Provides venue location details including address, city, and country.
 * - Displays the venue owner's name and avatar, with a link to their profile.
 * - If a user is logged in, allows them to book the venue via `BookingForm`.
 * - If a user is not logged in, prompts them to log in before booking.
 * ```
 *
 * @returns {JSX.Element} A detailed venue information page with booking options.
 */
const RenderVenue: React.FC<VenueProps> = ({ data }) => {
  const { isLoggedIn } = useAuth();
  const [selectedImage, setSelectedImage] = useState(
    data.media.length > 0 ? data.media[0].url : "/placeholder.png"
  );

  return (
    <section className="container mt-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Image and Title Section */}
        <div className="space-y-6 lg:col-span-2">
          <div className="w-full h-[500px]">
            <img
              className="object-cover object-center w-full h-full rounded-xl shadow-md"
              src={selectedImage}
              alt="Main venue image"
            />
          </div>
          {/* Gallery Thumbnails */}
          {data.media.length > 1 && (
            <div className="grid grid-cols-4 gap-2 overflow-x-auto">
              {data.media.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  className={`w-full h-[95px] rounded-lg overflow-hidden ${
                    selectedImage === image.url
                      ? "border-2 border-customPurple-500"
                      : "border border-transparent"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || "Gallery thumbnail"}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Venue Details and Price Section */}
        <div className="lg:col-span-1">
          {/* Venue Name and Price */}
          <div className="flex justify-between items-center p-2">
            <h2 className="text-3xl font-semibold text-customPurple-900">
              {data.name}
            </h2>
          </div>
          <div className="border-b p-2 flex">
            <p className="text-xl font-bold text-customPurple-600">
              $ {data.price}{" "}
              <span className="text-black text-medium font-normal">
                / per night
              </span>
            </p>
          </div>
          <div className="border-b p-2">
            {/* Venue Description */}
            {data.description ? (
              <p className="text-gray-700 text-sm">{data.description}</p>
            ) : (
              <p className="text-gray-700 text-sm">
                The Venue Manager forgot a description.
              </p>
            )}
          </div>

          <div className="flex justify-between p-2">
            <StarRating rating={data.rating} />
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-1 text-sm border-b p-2">
            <div className="flex items-center gap-2 p-3 rounded-lg text-wrap">
              <FaWifi
                className={`text-xl ${
                  data.meta.wifi ? "text-customPurple-800" : "text-red-600"
                }`}
              />
              {data.meta.wifi ? "WiFi Available" : "No WiFi"}
            </div>
            <div className="flex items-center gap-2 p-3  rounded-lg">
              <IoFastFoodSharp
                className={`text-xl ${
                  data.meta.breakfast ? "text-customPurple-800" : "text-red-600"
                }`}
              />
              {data.meta.breakfast ? "Breakfast Included" : "No Breakfast"}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg">
              <MdOutlinePets
                className={`text-xl ${
                  data.meta.pets ? "text-customPurple-800" : "text-red-600"
                } `}
              />
              {data.meta.pets ? "Pets Allowed" : "No Pets"}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg">
              <FaParking
                className={`text-xl ${
                  data.meta.parking ? "text-customPurple-800" : "text-red-600"
                }`}
              />
              {data.meta.parking ? "Parking Available" : "No Parking"}
            </div>
          </div>

          {/* Venue Address */}
          <div className="p-4 border-b flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-primary">Address</h3>
            <div className="flex items-center gap-2">
              <MdHouse className="text-xl text-primary" />
              <p className="text-md">
                {data.location.address || "No address provided"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaMountainCity className="text-xl text-primary" />
              <p className="text-md font-bold">
                {data.location.city || "No city provided"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineGlobe className="text-xl text-primary" />
              <p className="text-md font-bold">
                {data.location.country || "No country provided"}
              </p>
            </div>
          </div>
          {/* Owner Information */}
          <h3 className="text-xl font-semibold text-primary">Host</h3>
          <div className="mt-6 flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src={data.owner.avatar.url}
              alt={data.owner.name}
            />
            <Link
              to={`/profiles/${data.owner.name}`}
              className="text-md font-bold text-primary"
            >
              {data.owner.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-4 p-4 bg-gray-200 rounded-lg flex items-center justify-center lg:w-2/3 mb-5">
        {!isLoggedIn ? (
          <div className="text-center">
            <p className="font-bold">Log in to book this venue.</p>
            <Link
              className="mt-2 inline-block px-4 py-2 bg-gray-100 text-customPurple-900 rounded"
              to="/login"
            >
              Login here
            </Link>
          </div>
        ) : (
          <BookingForm />
        )}
      </div>
    </section>
  );
};

export default RenderVenue;
