import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { updateData } from "../../api/api"; // Import update function
import Modal from "../modals/Modal";

interface RenderUpdateBookingProps {
  id: string;
  booking: {
    dateFrom: Date;
    dateTo: Date;
    guests: number;
    title: string;
    venue: { name: string };
  };
  onUpdate: (id: string, updatedData: UpdatedBookingProps) => void;
}

interface UpdatedBookingProps {
  dateFrom: Date;
  dateTo: Date;
  guests: number;
}

function RenderUpdateBooking({
  id,
  booking,
  onUpdate,
}: RenderUpdateBookingProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedBooking, setUpdatedBooking] = useState({
    dateFrom: booking.dateFrom,
    dateTo: booking.dateTo,
    guests: booking.guests,
  });

  const handleUpdate = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await updateData(
        `holidaze/bookings/${id}`,
        updatedBooking
      );

      if (!response || response.status >= 400) {
        throw new Error(
          response?.data?.message ||
            "Failed to update booking. Please try again."
        );
      }

      setSuccessMessage("Booking updated successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      onUpdate(id, response.data);
      setIsModalOpen(false);
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message ||
            "An error occurred while updating the booking."
        );
      } else if (error.request) {
        setErrorMessage(
          "No response from the server. Please check your network connection."
        );
      } else {
        setErrorMessage(
          error.message || "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div>
      {/* Update Button */}
      <button
        className="bg-customPurple-500 p-2 rounded text-white flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <MdEdit className="mr-2" />
        Update Booking
      </button>

      {/* Modal for Updating Booking */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`You are updating the following booking: ${booking.venue.name}`}
      >
        <label className="block mb-2">Check-in Date:</label>
        <input
          type="date"
          value={updatedBooking.dateFrom.split("T")[0]}
          onChange={(e) =>
            setUpdatedBooking({ ...updatedBooking, dateFrom: e.target.value })
          }
          className="border p-2 w-full"
        />

        <label className="block mt-2">Check-out Date:</label>
        <input
          type="date"
          value={updatedBooking.dateTo.split("T")[0]}
          onChange={(e) =>
            setUpdatedBooking({ ...updatedBooking, dateTo: e.target.value })
          }
          className="border p-2 w-full"
        />

        <label className="block mt-2">Guests:</label>
        <input
          type="number"
          value={updatedBooking.guests}
          onChange={(e) =>
            setUpdatedBooking({
              ...updatedBooking,
              guests: parseInt(e.target.value),
            })
          }
          className="border p-2 w-full"
        />

        {/* Modal Footer */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 p-2 rounded text-white mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 p-2 rounded text-white"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
        <div>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
      </Modal>
      {successMessage && (
        <div
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default RenderUpdateBooking;
