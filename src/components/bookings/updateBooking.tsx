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
 * A component that allows users to update booking details including check-in/check-out dates and the number of guests.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.id - The unique identifier of the booking.
 * @param {Object} props.booking - The booking details.
 * @param {Date} props.booking.dateFrom - The current check-in date of the booking.
 * @param {Date} props.booking.dateTo - The current check-out date of the booking.
 * @param {number} props.booking.guests - The number of guests for the booking.
 * @param {Object} props.booking.venue - The venue associated with the booking.
 * @param {string} props.booking.venue.id - The unique identifier of the venue.
 * @param {string} props.booking.venue.name - The name of the venue.
 * @param {Function} props.onUpdate - A callback function to update the booking data in the parent component.
 *
 * @description
 * - Displays an "Edit" button that opens a modal for updating the booking details.
 * - Uses `Formik` for form handling and validation.
 * - Fetches booked dates using `useBookedDates` to prevent overlapping bookings.
 * - Updates the booking via an API call (`updateData`).
 * - Displays a success message when the update is successful.
 *
 * @example
 * ```tsx
 * <RenderUpdateBooking
 *   id="12345"
 *   booking={{
 *     dateFrom: new Date("2024-06-15"),
 *     dateTo: new Date("2024-06-20"),
 *     guests: 2,
 *     title: "Seaside Resort",
 *     venue: { id: "6789", name: "Seaside Resort" }
 *   }}
 *   onUpdate={(id, updatedData) => console.log("Updated Booking:", id, updatedData)}
 * />
 * ```
 *
 * @returns {JSX.Element} A booking update form inside a modal.
 */
function RenderUpdateBooking({
  id,
  booking,
  onUpdate,
}: RenderUpdateBookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const bookedDates = useBookedDates(id);

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
