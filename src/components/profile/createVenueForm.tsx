import { useForm } from "react-hook-form";
import createVenue from "../../api/venue/createVenue";
import { VenueFormData } from "../../types/VenueFormTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageField from "../../features/imageField";

// Still have to implement error handling and user feedback

function CreateVenueForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm<VenueFormData>();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for API errors
  const [images, setImages] = useState([{ url: "", alt: "" }]);

  // Add New Image Field
  const addImageField = () => {
    setImages([...images, { url: "", alt: "" }]);
  };

  // Remove Image Field
  const removeImageField = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: VenueFormData) => {
    try {
      data.price = Number(data.price);
      data.maxGuests = Number(data.maxGuests);
      data.rating = Number(data.rating);
      data.location.lat = Number(data.location.lat);
      data.location.lng = Number(data.location.lng);

      const response = await createVenue(data);

      {
        // Handle JSON response (e.g., 201 Created)
        setSuccessMessage("Your venue has been created successfully!");
        navigate(`/venues/${response.data.id}`); // Navigate to the new venue's page
      }
    } catch (error) {
      console.error("Error during venue creation:", error);

      // Handle API errors
      if (error instanceof Error) {
        setErrorMessage(error.message); // Display the error message
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className=" min-h-screen py-8 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-center py-4">
        Post Your Venue
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-2 w-full md:w-[500px]"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold"> Basic information </h2>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Name <span className="text-red-500"> * </span>
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                placeholder="The name of your venue"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Description <span className="text-red-500"> * </span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="w-full border h-52 px-4 py-2 border-gray-300 rounded focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                placeholder="Write something about your venue"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2"> Pricing information </h2>
          <div className="flex flex-row gap-5 justify-between">
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-700">
                Price / night $ <span className="text-red-500"> * </span>
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="number"
                placeholder="Price in $$"
                {...register("price", { required: true, min: 0 })}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-700">
                Max Guests <span className="text-red-500"> * </span>
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                type="number"
                placeholder="The amount of guests"
                {...register("maxGuests", { required: true, min: 1 })}
              />
            </div>
          </div>
        </div>

        {/* Optional Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
            placeholder="The rating of your venue 1 to 5"
            {...register("rating", { min: 1, max: 5 })}
          />
        </div>

        {/* Media */}
        <div>
          <h2 className="text-xl">Add Images of Your Venue</h2>

          {/* Image Fields */}
          <div className="space-y-2">
            {images.map((_, index) => (
              <ImageField
                key={index}
                index={index}
                register={register}
                watch={watch}
                removeImageField={removeImageField}
                addImageField={addImageField}
              />
            ))}
          </div>
        </div>

        {/* Meta */}
        <div>
          <h2 className="text-xl font-bold mb-2"> Commodities </h2>
          <div className="flex justify-between flex-wrap">
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
          <div className="mt-3 text-red-500 font-semibold">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateVenueForm;
