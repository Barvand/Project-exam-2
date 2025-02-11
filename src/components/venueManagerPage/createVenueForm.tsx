import { useForm } from "react-hook-form";
import { VenueFormData } from "../../types/VenueFormTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageField from "../../features/imageField";
import { postData } from "../../api/api";

function CreateVenueForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<VenueFormData>();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([{ url: "", alt: "" }]);

  // Add a new image field
  const addImageField = () => {
    setImages([...images, { url: "", alt: "" }]);
  };

  // Remove an image field
  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: VenueFormData) => {
    try {
      // Convert numeric fields from strings to numbers
      data.price = Number(data.price);
      data.maxGuests = Number(data.maxGuests);
      data.rating = Number(data.rating);

      const response = await postData("holidaze/venues/", data);

      // Set success message and navigate after a delay
      setSuccessMessage("Your venue has been created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate(`/venues/${response.data.id}`);
      }, 2000);
    } catch (error: any) {
      console.error("Error during venue creation:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="py-8 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-center py-4">
        Post Your Venue
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2 w-full]">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Basic information</h2>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                placeholder="The name of your venue"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="w-full border h-52 px-4 py-2 border-gray-300 rounded focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                placeholder="Write something about your venue"
              />
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div>
          <h2 className="text-xl font-bold mb-2">Pricing information</h2>
          <div className="flex flex-row gap-5 justify-between">
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-700">
                Price / night $ <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true, min: 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                placeholder="Price in $$"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-700">
                Max Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("maxGuests", { required: true, min: 1 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
                placeholder="The amount of guests"
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
            {...register("rating", { min: 1, max: 5 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none"
            placeholder="The rating of your venue 1 to 5"
          />
        </div>

        {/* Media Section */}
        <div>
          <h2 className="text-xl">Add Images of Your Venue</h2>
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

        {/* Commodities */}
        <div>
          <h2 className="text-xl font-bold mb-2">Commodities</h2>
          <div className="flex justify-between flex-wrap">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("meta.wifi")}
                className="form-checkbox text-indigo-600"
              />
              <span>Wifi</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("meta.parking")}
                className="form-checkbox text-indigo-600"
              />
              <span>Parking</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("meta.breakfast")}
                className="form-checkbox text-indigo-600"
              />
              <span>Breakfast</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("meta.pets")}
                className="form-checkbox text-indigo-600"
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
              {...register("location.address")}
              placeholder="Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            />
            <input
              {...register("location.city")}
              placeholder="City"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            />
            <input
              {...register("location.zip")}
              placeholder="Zip Code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            />
            <input
              {...register("location.country")}
              placeholder="Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            />
            <input
              {...register("location.continent")}
              placeholder="Continent"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      {/* Success Message (Fixed at bottom-right) */}
      {successMessage && (
        <div
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {successMessage}
        </div>
      )}

      {/* Error Message (Inline) */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}

export default CreateVenueForm;
