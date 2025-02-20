import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateData } from "../../api/api";
import { useFormik } from "formik";
import LocationInput from "./VenueFormInputs/locationInput";
import CommoditiesInput from "./VenueFormInputs/commoditiesInput";
import PricingInput from "./VenueFormInputs/pricingInput";
import BasicInfo from "./VenueFormInputs/BasicInfo";
import venueSchema from "../../Validations/VenueValidation";
import React from "react";
import ImageInput from "./VenueFormInputs/ImageInput";

/**
 * A form component for updating an existing venue.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {any} props.initialData - Initial venue data used to prefill the form fields.
 *
 * @description
 * - Uses Formik for form management and validation.
 * - Allows users to update venue details including name, description, price, max guests, rating, and amenities.
 * - Users can also update the venue location and add images via URLs.
 * - On successful submission, the venue is updated in the database via an API call.
 * - Displays success or error messages based on the API response.
 * - Redirects the user to the updated venue page upon success.
 *
 * @example
 * ``
 *   the initial values are gathered from the API and displayed in the form fields.
 *
 * <UpdateVenueForm initialData={initialVenueData} />
 * ```
 *
 * @returns {JSX.Element} A form for updating venue details.
 */

function UpdateVenueForm({ initialData }: any) {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState<string[]>([]); // Array to store image URLs
  const [currentImage, setCurrentImage] = useState(""); // State to hold the current input value
  const [error, setError] = React.useState("");

  // Set images when the component is mounted
  useEffect(() => {
    // Check if initialData and media are provided
    if (initialData?.media && Array.isArray(initialData.media)) {
      const imageUrls = initialData.media.map((media: any) => media.url);
      setImages(imageUrls); // Populate images state with existing media URLs
    }
  }, [initialData]); // Only run this effect when initialData changes

  const handleInputChange = (e: any) => {
    setCurrentImage(e.target.value);
    setError(""); // Clear error on input change
  };

  const addImage = () => {
    if (currentImage.trim() === "") {
      setError("Image URL cannot be empty");
      return;
    }

    const urlRegex = /^(https?:\/\/)/;
    if (!urlRegex.test(currentImage)) {
      setError("URL must start with http:// or https://");
      return;
    }

    // Add valid image URL to the images array
    setImages([...images, currentImage]);
    setCurrentImage(""); // Clear the input field
    setError(""); // Clear error on success
  };

  const formik = useFormik({
    initialValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      price: initialData.price || "",
      maxGuests: initialData.maxGuests || "",
      rating: initialData.rating || "",
      meta: {
        wifi: initialData.meta?.wifi || false,
        parking: initialData.meta?.parking || false,
        breakfast: initialData.meta?.breakfast || false,
        pets: initialData.meta?.pets || false,
      },
      location: {
        address: initialData.location?.address || "",
        city: initialData.location?.city || "",
        zip: initialData.location?.zip || "",
        country: initialData.location?.country || "",
        continent: initialData.location?.continent || "",
      },
    },
    validationSchema: venueSchema,
    onSubmit: async (data) => {
      try {
        const requestData = {
          ...data,
          media: images.map((image) => ({
            url: image,
            alt: "Image of a Venue",
          })),
        };

        const response = await updateData(
          `holidaze/venues/${initialData.id}`,
          requestData
        );

        // Set success message and navigate after a delay
        setSuccessMessage("Your venue has been updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate(`/venues/${response.data.id}`);
        }, 2000);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  return (
    <div className="py-8 flex flex-col items-center h-full">
      <h2 className="text-3xl font-semibold text-center py-4">
        Update Your Venue
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6 p-2 w-full">
        <BasicInfo formik={formik} />
        {/* Pricing Information */}
        <PricingInput formik={formik} />
        {/* Media Section */}
        <ImageInput
          currentImage={currentImage}
          handleInputChange={handleInputChange}
          error={error}
          addImage={addImage}
          images={images}
        />

        {/* Commodities */}
        <CommoditiesInput formik={formik} />

        {/* Location */}
        <LocationInput formik={formik} />

        {/* Submit Button */}
        <div className="space-y-4 py-8 flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
          >
            Update Venue
          </button>
        </div>
      </form>

      {/* Success/Error Messages */}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
}

export default UpdateVenueForm;
