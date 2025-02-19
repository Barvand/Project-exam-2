import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useFormik } from "formik";
import { updateData } from "../../api/api";
import Modal from "../modals/Modal";
import VenueDatePicker from "../OneVenue/VenueDatePicker";
import useBookedDates from "../../api/hooks/useBookedDates";

interface RenderUpdateBookingProps {
  id: string;
  booking: {
    dateFrom: Date;
    dateTo: Date;
    guests: number;
    title: string;
    venue: { id: string; name: string };
  };
  onUpdate: (id: string, updatedData: UpdatedBookingProps) => void;
}

interface UpdatedBookingProps {
  dateFrom: Date;
  dateTo: Date;
  guests: number;
}

/**
 * RenderUpdateBooking component - Allows users to update booking details.
 */
function RenderUpdateBooking({
  id,
  booking,
  onUpdate,
}: RenderUpdateBookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const bookedDates = useBookedDates(id);

  console.log(id);


  const formik = useFormik({
    initialValues: {
      dateFrom: booking.dateFrom,
      dateTo: booking.dateTo,
      guests: booking.guests,
    },
    onSubmit: async (values) => {
      try {
        const response = await updateData(`holidaze/bookings/${id}`, values);
        if (!response || response.status >= 400) {
          throw new Error(
            response?.data?.message || "Failed to update booking."
          );
        }

        setSuccessMessage("Booking updated successfully");
        setTimeout(() => setSuccessMessage(""), 3000);

        onUpdate(id, response.data);
        setIsModalOpen(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          formik.setErrors({
            dateFrom:
              error.message || "An error occurred while updating the booking.",
          });
        }
      }
    },
  });

  return (
    <div>
      {/* Update Button */}
      <button
        className="bg-customPurple-500 p-2 rounded text-white flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <MdEdit />
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Update Booking: ${booking.venue.name}`}
        height={"425px"}
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          <label className="block mb-2">Check-in / Check-out Dates:</label>
          <div className="border">
            <VenueDatePicker
              selectedDates={[formik.values.dateFrom, formik.values.dateTo]}
              onDateChange={(dates) => {
                formik.setFieldValue("dateFrom", dates[0]);
                formik.setFieldValue("dateTo", dates[1]);
              }}
              bookedDates={bookedDates}
            />
          </div>

          <label className="block mt-2">Guests:</label>
          <input
            type="number"
            name="guests"
            value={formik.values.guests}
            min="1"
            onChange={formik.handleChange}
            className="border p-2 w-full"
          />

          {formik.errors.dateFrom && (
            <div className="text-red-500 mt-2">
              {String(formik.errors.dateFrom)}
            </div>
          )}

          {/* Modal Footer */}
          <div className="mt-4 flex justify-end">
            <button
              className="bg-gray-500 p-2 rounded text-white mr-2"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 p-2 rounded text-white"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Success Message */}
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
