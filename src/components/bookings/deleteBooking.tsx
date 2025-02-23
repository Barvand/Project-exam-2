import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteData } from "../../api/api";

interface RenderDeleteBookingProps {
  id: string;
  onDelete: (id: string) => void;
}

/**
 * Component to render a delete booking button with confirmation modal.
 * Handles the deletion process, success/error messages, and modal visibility.
 *
 * @component
 * @param {RenderDeleteBookingProps} props - The props for the component.
 * @param {string} props.id - The unique ID of the booking to be deleted.
 * @param {function} props.onDelete - Callback function to handle the deletion action after a successful delete.
 * @returns {JSX.Element} A button for deleting the booking and a confirmation modal.
 *
 * @example
 * <RenderDeleteBooking
 *   id="123"
 *   onDelete={(id) => console.log(`Deleted booking with ID: ${id}`)}
 * />
 */
function RenderDeleteBooking({
  id,
  onDelete,
}: RenderDeleteBookingProps): JSX.Element {
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  /**
   * Handles the delete action when the user confirms.
   * It sends a request to delete the booking, updates the state for success/error,
   * and triggers the `onDelete` callback after a delay to refresh the state to match the new array.
   *
   * @async
   */
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteData(`holidaze/bookings/${id}`);
      setSuccessMessage("Booking deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        onDelete(id);
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error)
        setErrorMessage("Failed to delete booking. Please try again later.");
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <div>
      {/* Button to open the confirmation modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 bg-opacity-30 hover:bg-opacity-100 p-2 rounded text-white"
      >
        {isDeleting ? (
          "Deleting..."
        ) : (
          <MdOutlineDeleteOutline className="text-2xl" />
        )}
        <span className="sr-only">delete</span>
      </button>

      {/* Display error message if there is one */}
      {errorMessage && (
        <p className="fixed bottom-5 right-5 bg-red-500 text-white mt-2">
          {errorMessage}
        </p>
      )}

      {/* Display success message if available */}
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
          <div className="bg-white p-6 rounded-lg w-full sm:w-[500px] m-1">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this booking?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RenderDeleteBooking;
