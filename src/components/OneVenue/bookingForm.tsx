import { Formik, Field, Form, ErrorMessage } from "formik";
import BookingValidation from "../../Validations/BookingValidation";
import { postData } from "../../api/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookingModal from "../modals/bookingConfirmation";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const formattedToday = today.toISOString().split("T")[0];
const formattedTomorrow = tomorrow.toISOString().split("T")[0];

function BookingForm() {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [daysCount, setDaysCount] = useState(1); // Default to 1 day
  const [totalCost, setTotalCost] = useState(100); // Example fixed price per night

  // Calculate the number of days between DateFrom and DateTo
  const calculateDays = (dateFrom, dateTo) => {
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const timeDiff = end - start;
    const days = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
    return days;
  };

  // Calculate the cost based on the number of days
  const calculateCost = (days) => {
    return days * 100; // Assuming 100 is the cost per night, adjust accordingly
  };

  useEffect(() => {
    const days = calculateDays(formattedToday, formattedTomorrow);
    setDaysCount(days);
    setTotalCost(calculateCost(days));
  }, [formattedToday, formattedTomorrow]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const bookingData = {
        dateFrom: values.DateFrom,
        dateTo: values.DateTo,
        guests: values.MaxGuests,
        venueId: id,
      };

      await postData("holidaze/bookings/", bookingData);
      setSuccessMessage("Booking has been submitted");
      setIsModalOpen(false); // Close modal on successful submission
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        DateFrom: formattedToday,
        DateTo: formattedTomorrow,
        MaxGuests: 1,
      }}
      validationSchema={BookingValidation}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue, setSubmitting }) => {
        // Update the days count and total cost whenever DateFrom or DateTo changes
        const dateFrom = values.DateFrom;
        const dateTo = values.DateTo;

        // Update daysCount and totalCost whenever DateFrom or DateTo change
        useEffect(() => {
          const days = calculateDays(dateFrom, dateTo);
          setDaysCount(days);
          setTotalCost(calculateCost(days));
        }, [dateFrom, dateTo]);

        const handleModalConfirm = () => {
          handleSubmit(values, { setSubmitting, resetForm: () => {} });
        };

        return (
          <Form>
            {/* Arrival Date */}
            <div className="flex flex-col relative">
              <label className="block text-sm font-medium text-gray-700">
                Arrival Date:
              </label>
              <Field
                type="date"
                name="DateFrom"
                min={formattedToday}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              />
              <ErrorMessage
                name="DateFrom"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Checkout Date */}
            <div className="flex flex-col mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Checkout Date:
              </label>
              <Field
                type="date"
                name="DateTo"
                min={values.DateFrom}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              />
              <ErrorMessage
                name="DateTo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Max Guests */}
            <div className="flex flex-col mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Max Guests:
              </label>
              <Field
                type="number"
                name="MaxGuests"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
              />
              <ErrorMessage
                name="MaxGuests"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              className="bg-customPurple-800 p-2 w-full mt-5 text-customPurple-50 font-bold"
              type="button"
              onClick={() => setIsModalOpen(true)} // Show modal when clicked
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book now"}
            </button>

            {/* Success Message */}
            {successMessage && (
              <div
                className="mt-3 p-2 text-green-600 font-semibold absolute bottom-15 right-50"
                aria-live="polite"
              >
                {successMessage}
              </div>
            )}

            {/* API Error Message */}
            {errorMessage && (
              <div
                className="absolute bottom-15 right-50 bg-red-50 border rounded error mt-3 p-2 text-red-500 font-semibold"
                aria-live="polite"
              >
                {errorMessage}
              </div>
            )}

            {/* Modal for Confirmation */}
            <BookingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)} // Close modal
              onConfirm={handleModalConfirm} // Confirm booking
              totalCost={totalCost}
              daysCount={daysCount}
              dateFrom={values.DateFrom}
              dateTo={values.DateTo}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default BookingForm;
