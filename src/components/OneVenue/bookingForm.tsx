import { Formik, Field, Form, ErrorMessage } from "formik";
import BookingValidation from "../../Validations/BookingValidation";
import CreateBooking from "../../api/bookings/post";
import { useParams } from "react-router-dom";
import { useState } from "react";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const formattedToday = today.toISOString().split("T")[0];

function BookingForm() {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for API errors

  return (
    <Formik
      initialValues={{
        DateFrom: formattedToday,
        DateTo: tomorrow.toISOString().split("T")[0],
        MaxGuests: 1,
      }}
      validationSchema={BookingValidation}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSuccessMessage(""); // Reset success message
        setErrorMessage(""); // Reset error message

        try {
          const bookingData = {
            dateFrom: values.DateFrom,
            dateTo: values.DateTo,
            guests: values.MaxGuests,
            venueId: id,
          };

          const response = await CreateBooking({ value: bookingData });

          if (!response.ok) {
            const errorData = await response.json(); // Convert response to JSON

            // Extract error messages from API response
            const errorMessages = errorData.errors
              ? errorData.errors.map((err) => err.message).join(" ") // Join all error messages
              : "An unknown error occurred.";

            setErrorMessage(errorMessages);
          } else {
            setSuccessMessage("Your order has been submitted successfully!");
            resetForm();
          }
        } catch (err) {
          console.error("Error:", err);
          setErrorMessage("Something went wrong. Please try again."); // ✅ Show a general error
        } finally {
          setSubmitting(false); // ✅ Ensure submitting state is updated
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* Arrival Date */}
          <div className="flex flex-col">
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
              min={formattedToday}
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
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book now"}
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-3 text-green-600 font-semibold">
              {successMessage}
            </div>
          )}

          {/* API Error Message */}
          {errorMessage && (
            <div className="mt-3 text-red-500 font-semibold">
              {errorMessage}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default BookingForm;
