import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api/api";
import { useFormik } from "formik";
import LocationInput from "./VenueFormInputs/locationInput";
import CommoditiesInput from "./VenueFormInputs/commoditiesInput";
import PricingInput from "./VenueFormInputs/pricingInput";
import BasicInfo from "./VenueFormInputs/BasicInfo";
import venueSchema from "../../Validations/VenueValidation";
import React from "react";
import ImageInput from "./VenueFormInputs/ImageInput";

/**
 * A form component for creating a new venue.
 *
 * @component
 *
 * @description
 * - Uses Formik for form management and validation.
 * - Allows users to input venue details, including name, description, price, max guests, and rating.
 * - Users can also specify location details and amenities.
 * - Supports adding multiple images via URLs.
 * - On successful form submission, sends data to the API and navigates to the newly created venue's page.
 * - Displays success and error messages based on the API response.
 *
 * @example
 * ```tsx
 * <CreateVenueForm />
 * ```
 *
 * @returns {JSX.Element} A form for creating a new venue.
 */

function CreateVenueForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState<string[]>([]); // Array to store image URLs
  const [currentImage, setCurrentImage] = useState(""); // State to hold the current input value
  const [error, setError] = React.useState("");

  const handleInputChange = (e: any) => {
    setCurrentImage(e.target.value);
    setError(""); // Clear error on input change
  };

  const addImage = () => {
    if (!currentImage.trim()) {
      setError("Image URL cannot be empty");
      return;
    }

    const urlRegex = /^(https?:\/\/)/;
    if (!urlRegex.test(currentImage)) {
      setError("URL must start with http:// or https://");
      return;
    }

    // If validation passes, add the image and clear the input
    setImages([...images, currentImage]);
    setCurrentImage("");
    setError(""); // Clear error on success

    // If validation passes, add the image and clear the input
    formik.setFieldValue("media", [
      ...formik.values.media,
      { url: currentImage },
    ]);
    setCurrentImage("");
    setError(""); // Clear error on success
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      maxGuests: "",
      rating: "",
      media: images,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
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

        const response = await postData("holidaze/venues/", requestData);

        // Set success message and navigate after a delay
        setSuccessMessage("Your venue has been created successfully!");
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
    <div className="py-8 flex flex-col items-center ">
      <h2 className="text-3xl font-semibold text-center py-4">
        Post Your Venue
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="scrollable-form space-y-6 p-2 w-full"
      >
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
            Post Venue
          </button>
        </div>
      </form>

      {/* Success/Error Messages */}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
}

export default CreateVenueForm;
