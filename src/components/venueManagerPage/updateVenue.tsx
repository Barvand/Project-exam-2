import { useState } from "react";
import UpdateVenueForm from "./updateVenueForm";
import { fetchData } from "../../api/api";

interface UpdateVenueProps {
  id: string;
}

/**
 * A component for fetching and updating venue details within a modal.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.id - The unique identifier of the venue to be updated.
 *
 * @description
 * - Fetches venue details by ID when the user clicks "Update Venue."
 * - Displays a modal containing the `UpdateVenueForm` component.
 * - Allows users to update venue details and submit the changes.
 * - Handles loading and error states.
 * - Enables closing the modal after updating the venue.
 *
 * @example
 * ```tsx
 * <UpdateVenue id="123" />
 * ```
 *
 * @returns {JSX.Element} A button that triggers a modal containing the update form.
 */

function UpdateVenue({ id }: UpdateVenueProps) {
  const [showModal, setShowModal] = useState(false);
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = async () => {
    setLoading(true);
    try {
      // Fetch venue data by ID
      const response = await fetchData(`holidaze/venues/${id}`);

      setVenueData(response.data);
      setShowModal(true);
    } catch (error: unknown) {
      if (error instanceof Error)
        setErrorMessage("Failed to load venue data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="text-blue-800 font-bold"
        disabled={loading}
      >
        {loading ? "Loading..." : "Update Venue"}
      </button>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Modal */}
      {showModal && venueData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative scrollable-form ">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Update Venue Form */}
            <UpdateVenueForm
              initialData={venueData} // Pass data as props
              closeModal={closeModal} // Allow form to close the modal on success
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateVenue;
