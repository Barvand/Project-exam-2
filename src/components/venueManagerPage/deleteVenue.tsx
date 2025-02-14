import { useState } from "react";
import { deleteData } from "../../api/api"; // Make sure the deleteData function is correctly imported
import { useNavigate } from "react-router-dom";

interface DeleteVenueProps {
  id: string;
}

function RenderDeleteVenue({ id }: DeleteVenueProps): JSX.Element {
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteData(`holidaze/venues/${id}`);
      setSuccessMessage("Venue deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsDeleting(false);
      setShowModal(false); // Close the modal after the delete action is complete
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)} // Show the confirmation modal when the button is clicked
        className="bg-red-500 text-white p-2 rounded"
      >
        {isDeleting ? "Deleting..." : "Delete Venue"}
      </button>

      {/* Error message */}
      {errorMessage && (
        <p
          className="fixed bottom-5 right-5 text-red-500 mt-2"
          style={{ zIndex: 9999 }}
        >
          {errorMessage}
        </p>
      )}

      {/* Success message */}
      {successMessage && (
        <div
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {successMessage}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this venue?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RenderDeleteVenue;
