import BookingValidation from "../../Validations/BookingValidation";
import Modal from "../modals/Modal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { fetchData, postData } from "../../api/api";
import { calculateDays } from "../../features/calculateDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  bookingPrice: number;
  bookingTitle: string;
}

function BookingForm({ bookingPrice, bookingTitle }: BookingFormProps) {
  const { id } = useParams();
  const today = new Date().toISOString().split("T")[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetchData(
          `holidaze/venues/${id}?_bookings=true`
        );
        const data = response.data;

        // Ensure bookings exist in the response
        if (data && data.bookings && Array.isArray(data.bookings)) {
          const bookedRanges = data.bookings.map((booking) => {
            // Ensure the booking is valid and has dateFrom and dateTo properties
            if (booking && booking.dateFrom && booking.dateTo) {
              const startDate = new Date(booking.dateFrom);
              const endDate = new Date(booking.dateTo);

              // Make sure both start and end dates are valid
              if (startDate.getTime() && endDate.getTime()) {
                let currentDate = new Date(startDate);
                let datesInRange = [];

                // Generate all dates within the range
                while (currentDate <= endDate) {
                  datesInRange.push(new Date(currentDate)); // Add the current date to the range
                  currentDate.setDate(currentDate.getDate() + 1); // Increment the day
                }

                return datesInRange;
              }
            }
            // Return empty array if booking is invalid
            return [];
          });

          // Flatten the array and remove duplicates
          const uniqueBookedDates = [
            ...new Set(bookedRanges.flat().map((date) => date.toISOString())),
          ];

          setBookedDates(uniqueBookedDates.map((dateStr) => new Date(dateStr))); // Convert ISO strings back to Date objects
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      dateFrom: null,
      dateTo: null,
      guests: 1,
      venueId: id,
    },
    validationSchema: BookingValidation,
    onSubmit: async (values, actions) => {
      try {
        await postData("holidaze/bookings/", values);
        actions.resetForm();
        setSuccessMessage("Booking has been successfully made!");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
        setSuccessMessage("");
      }
      setIsModalOpen(false);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
  } = formik;

  useEffect(() => {
    setTotalPrice(calculateDays(values.dateFrom, values.dateTo) * bookingPrice);
  }, [values.dateFrom, values.dateTo, bookingPrice]);

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (isValid && dirty) setIsModalOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Date From */}
      <label>Check-in date</label>
      <DatePicker
        selected={formik.values.dateFrom}
        onChange={(dates) => {
          const [start, end] = dates;
          formik.setFieldValue("dateFrom", start);
          formik.setFieldValue("dateTo", end);
        }}
        minDate={today}
        startDate={formik.values.dateFrom} // Corrected
        endDate={formik.values.dateTo} // Added for range selection
        excludeDates={bookedDates}
        dateFormat="yyyy-MM-dd"
        className="input"
        selectsRange
      />
      {formik.errors.dateFrom && formik.touched.dateFrom && (
        <p className="error">{formik.errors.dateFrom}</p>
      )}

      <label>Max Guests</label>
      <input
        type="number"
        name="guests"
        value={values.guests}
        min="1"
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.guests && touched.guests ? "input-error" : ""}
      />
      {errors.guests && touched.guests && (
        <p className="error">{errors.guests}</p>
      )}

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <button
        type="button"
        onClick={handleOpenModal}
        disabled={!dirty || !isValid}
      >
        Submit
      </button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Booking for ${bookingTitle}`}
        >
          <p>Total Days: {calculateDays(values.dateFrom, values.dateTo)}</p>
          <p>Total Price: ${totalPrice}</p>
          <div className="flex justify-between mt-1">
            <button
              className="p-2 bg-green-500 rounded font-bold text-white"
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <button
              className="p-2 bg-red-500 rounded font-bold text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </form>
  );
}

export default BookingForm;
