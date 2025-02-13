import { useState } from "react";
import UpdateVenueForm from "./updateVenueForm";
import { fetchData } from "../../api/api";

interface UpdateVenueProps {
  id: string;
}
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

      console.log(venueData);
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
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Update Venue"}
      </button>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Modal */}
      {showModal && venueData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
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
