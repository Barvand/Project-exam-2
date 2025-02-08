import { useState } from "react";
import { FaWifi } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { Link } from "react-router-dom";
import BookingForm from "./bookingForm";
import { useAuth } from "../../authentication/AuthProvider";

interface Venue {
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  meta: { wifi: boolean; breakfast: boolean; pets: boolean; parking: boolean };
  owner: { name: string; avatar: { url: string } };
  location: { address?: string; zip?: string; city?: string; country?: string };
}

interface VenueProps {
  data: Venue;
}

const RenderVenue: React.FC<VenueProps> = ({ data }) => {
  const { isLoggedIn } = useAuth();

  // State for currently displayed image
  const [selectedImage, setSelectedImage] = useState(
    data.media.length > 0 ? data.media[0].url : "/placeholder.png"
  );

  return (
    <section className="container mt-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Image - Takes up two-thirds of the width */}
        <div className="col-span-3 lg:col-span-2 h-[500px]">
          <img
            className="object-cover object-center w-full h-full rounded-lg"
            src={selectedImage}
            alt="Main venue image"
          />
        </div>

        {/* Thumbnails - Takes up one-third of the width */}
        <div className="col-span-3 lg:col-span-1 h-[500px] flex lg:flex-col gap-2 overflow-x-auto lg:overflow-hidden">
          <div className="grid grid-cols-5 lg:grid-cols-1 gap-2 w-full">
            {data.media.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image.url)}
                className={`w-full h-[95px] rounded-lg overflow-hidden border-2 ${
                  selectedImage === image.url
                    ? "border-customPurple-500"
                    : "border-transparent"
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
        </div>
      </div>

      {/* Venue Details Section */}
      <div className="mt-4 p-4 bg-customPurple-100 rounded-lg">
        <h2 className="text-2xl font-bold text-customPurple-800 capitalize">
          {data.name}
        </h2>
        <p className="text-gray-700 text-sm">Information about the property:</p>
        <p className="text-md normal-case text-black">{data.description}</p>
      </div>

      {/* Amenities */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-customPurple-100 rounded-lg flex items-center gap-2">
          <FaWifi className="text-xl text-customPurple-900" />
          {data.meta.wifi ? "WiFi Available" : "No WiFi"}
        </div>
        <div className="p-4 bg-customPurple-100 rounded-lg flex items-center gap-2">
          <IoFastFoodSharp className="text-xl text-customPurple-900" />
          {data.meta.breakfast ? "Breakfast Included" : "No Breakfast"}
        </div>
        <div className="p-4 bg-customPurple-100 rounded-lg flex items-center gap-2">
          <MdOutlinePets className="text-xl text-customPurple-900" />
          {data.meta.pets ? "Pets Allowed" : "No Pets"}
        </div>
        <div className="p-4 bg-customPurple-100 rounded-lg flex items-center gap-2">
          <FaParking className="text-xl text-customPurple-900" />
          {data.meta.parking ? "Parking Available" : "No Parking"}
        </div>
      </div>

      {/* Address */}
      <div className="mt-4 p-4 bg-customPurple-200 rounded-lg">
        <h2 className="text-2xl font-bold text-customPurple-800">Address</h2>
        <p className="text-md">
          {data.location.address || "No address provided"}
        </p>
        <p className="text-md">{data.location.city || "No city provided"}</p>
        <p className="text-md">
          {data.location.country || "No country provided"}
        </p>
      </div>

      {/* Booking Form */}
      <div className="mt-4 p-4 bg-customPurple-300 rounded-lg flex items-center justify-center">
        {!isLoggedIn ? (
          <div className="text-center">
            <p className="font-bold">Log in to book this venue.</p>
            <Link
              className="mt-2 inline-block px-4 py-2 bg-customPurple-50 text-customPurple-900 rounded"
              to="/login"
            >
              Login here
            </Link>
          </div>
        ) : (
          <BookingForm />
        )}
      </div>

      {/* Owner Information */}
      <div className="mt-4 flex items-center gap-2">
        <img
          className="rounded-full w-12 h-12"
          src={data.owner.avatar.url}
          alt={data.owner.name}
        />
        <Link
          to={`/profiles/${data.owner.name}`}
          className="text-md font-bold text-customPurple-800"
        >
          {data.owner.name}
        </Link>
      </div>
    </section>
  );
};

export default RenderVenue;
