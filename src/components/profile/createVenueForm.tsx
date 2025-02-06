import { useForm } from "react-hook-form";
import createVenue from "../../api/venue/createVenue";
import { VenueFormData } from "../../types/VenueFormTypes";
import { useState } from "react";

// Still have to implement error handling and user feedback

function CreateVenueForm() {
  const { register, handleSubmit, reset } = useForm<VenueFormData>();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for API errors

  const onSubmit = async (data: VenueFormData) => {
    try {
      // Format data if needed (e.g., convert price, rating, etc.)
      data.price = Number(data.price);
      data.maxGuests = Number(data.maxGuests);
      data.rating = Number(data.rating);
      data.location.lat = Number(data.location.lat);
      data.location.lng = Number(data.location.lng);

      // Use the API function to create the venue
      const response = await createVenue(data);

      if (!response.ok) {
        const errorData = await response.json(); // Convert response to JSON
        // Extract error messages from API response
        const errorMessages = errorData.errors

        setErrorMessage(errorMessages); // ✅ Display error messages
      } else {
        setSuccessMessage("Your order has been submitted successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error during venue creation:", error);
    }
  };

  return (
    <div className="bg-customPurple-50 min-h-screen py-8">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-customPurple-600 py-4">
          Post Your Venue
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-96">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name (required)
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description (required)
              </label>
              <textarea
                {...register("description", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (required)
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="number"
                {...register("price", { required: true, min: 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Guests (required)
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="number"
                {...register("maxGuests", { required: true, min: 1 })}
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              {...register("rating", { min: 0, max: 5 })}
            />
          </div>

          {/* Media */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Media
            </label>
            <div className="space-y-2">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                {...register("media.0.url")}
                placeholder="Image URL"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                {...register("media.0.alt")}
                placeholder="Alt Text"
              />
            </div>
          </div>

          {/* Meta */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meta
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  className="form-checkbox text-indigo-600"
                  type="checkbox"
                  {...register("meta.wifi")}
                />
                <span>Wifi</span>
              </label>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  className="form-checkbox text-indigo-600"
                  type="checkbox"
                  {...register("meta.parking")}
                />
                <span>Parking</span>
              </label>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  className="form-checkbox text-indigo-600"
                  type="checkbox"
                  {...register("meta.breakfast")}
                />
                <span>Breakfast</span>
              </label>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  className="form-checkbox text-indigo-600"
                  type="checkbox"
                  {...register("meta.pets")}
                />
                <span>Pets</span>
              </label>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="space-y-2">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                {...register("location.address")}
                placeholder="Address"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                {...register("location.city")}
                placeholder="City"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                {...register("location.zip")}
                placeholder="Zip Code"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                {...register("location.country")}
                placeholder="Country"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                {...register("location.continent")}
                placeholder="Continent"
              />
            </div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              type="number"
              step="0.0001"
              {...register("location.lat")}
              placeholder="Latitude"
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              type="number"
              step="0.0001"
              {...register("location.lng")}
              placeholder="Longitude"
            />
          </div>
          {/* Success Message */}
          {successMessage && (
            <div className="mt-3 text-green-600 font-semibold">
              {successMessage}
            </div>
          )}

          {/* API Error Message */}
          {errorMessage && (
            <div className="mt-3 text-red-500 font-semibold">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVenueForm;
