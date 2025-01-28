import { useForm, Controller } from "react-hook-form";
import { GetHeaders } from "../../api/headers";
import {VenueFormData } from "../../types/VenueFormTypes"

const CreatePostForm = () => {
  const { register, handleSubmit, control, reset } = useForm<VenueFormData>();

  const onSubmit = async (data) => {
    try {
      data.price = Number(data.price);
      data.maxGuests = Number(data.maxGuests);
      data.rating = Number(data.rating);
      data.location.lat = Number(data.location.lat);
      data.location.lng = Number(data.location.lng);
      console.log("Form Data:", data);

      // Make the API call
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          method: "POST", // Add the method explicitly
          headers: GetHeaders("POST"), // Ensure this returns valid headers
          body: JSON.stringify(data), // Convert data to JSON
        }
      );

      // Check for response status
      if (!response.ok) {
        throw new Error(`Failed to update venue. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      // Reset the form upon successful submission
      reset();
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="container flex">
      <form onSubmit={handleSubmit(onSubmit)} className="px-4">
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name (required)
          </label>
          <input
            {...register("name", { required: true })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description (required)
          </label>
          <textarea
            {...register("description", { required: true })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (required)
          </label>
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            type="number"
            {...register("price", { required: true, min: 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Guests (required)
          </label>
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            type="number"
            {...register("maxGuests", { required: true, min: 1 })}
          />
        </div>

        {/* Optional Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            {...register("rating", { min: 0, max: 5 })}
          />
        </div>

        {/* Media */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Media
          </label>
          <div>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              {...register("media.0.url")}
              placeholder="Image URL"
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <input
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="checkbox"
                {...register("meta.wifi")}
              />
              Wifi
            </label>
            <label className="block text-sm font-medium text-gray-700">
              <input
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="checkbox"
                {...register("meta.parking")}
              />
              Parking
            </label>
            <label className="block text-sm font-medium text-gray-700">
              <input
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="checkbox"
                {...register("meta.breakfast")}
              />
              Breakfast
            </label>
            <label className="block text-sm font-medium text-gray-700">
              <input
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="checkbox"
                {...register("meta.pets")}
              />
              Pets
            </label>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="mb-2">
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              {...register("location.address")}
              placeholder="Address"
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              {...register("location.city")}
              placeholder="City"
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              {...register("location.zip")}
              placeholder="Zip Code"
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              {...register("location.country")}
              placeholder="Country"
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              {...register("location.continent")}
              placeholder="Continent"
            />
          </div>
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            type="number"
            step="0.0001"
            {...register("location.lat")}
            placeholder="Latitude"
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            type="number"
            step="0.0001"
            {...register("location.lng")}
            placeholder="Longitude"
          />
        </div>

        <button type="submit" className="bg-secondary rounded px-4 py-2 mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
