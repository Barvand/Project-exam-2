import BookingValidation from "../../Validations/BookingValidation";
import Modal from "../modals/Modal";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { fetchData, postData } from "../../api/api";
import { calculateDays } from "../../features/calculateDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../authentication/AuthProvider";

interface BookingFormProps {
  venuePrice: number;
  venueTitle: string;
}

interface Booking {
  dateFrom: Date;
  dateTo: Date;
}

// Define the interface for booked dates
interface UniqueBookedDatesProps {
  date: Date;
}

/**
 * BookingForm component that allows users to make bookings by selecting check-in and check-out dates,
 * number of guests, and calculating the total price based on selected dates and booking price.
 * Displays success or error messages based on the form submission outcome.
 *
 * @component
 * @example
 * const venuePrice = 150;
 * const venueTitle = "Luxury Villa";
 * return <BookingForm venuePrice={venuePrice} venueTitle={venueTitle} />;
 *
 * @param {Object} props - The component's props.
 * @param {number} props.venuePrice - The price per day for booking.
 * @param {string} props.venueTitle - The title or name of the venue being booked.
 *
 * @returns {JSX.Element} The BookingForm component.
 */
function BookingForm({ venuePrice, venueTitle }: BookingFormProps) {
  const { id } = useParams<{ id: string }>(); // Ensure `id` is correctly typed as a string
  const today = new Date();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bookedDates, setBookedDates] = useState<UniqueBookedDatesProps[]>([]);
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  /**
   * Fetches booked dates for the venue.
   * This function is called on mount (via useEffect) and retrieves the booking data from the API.
   *
   * @async
   * @function fetchBookings
   * @returns {Promise<void>}
   */
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetchData(
          `holidaze/venues/${id}?_bookings=true`
        );
        const data = response.data;

        // Ensure bookings exist in the response
        if (data && data.bookings && Array.isArray(data.bookings)) {
          const bookedRanges = data.bookings.map((booking: Booking) => {
            const startDate = new Date(booking.dateFrom);
            const endDate = new Date(booking.dateTo);

            // Generate all dates within the range
            const datesInRange: Date[] = [];
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
              datesInRange.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1); // Increment the day
            }

            return datesInRange;
          });

          // Flatten the array of date ranges and remove duplicates
          const uniqueBookedDates = Array.from(
            new Map(
              bookedRanges.flat().map((date: Date) => [
                date.toISOString(),
                { date: new Date(date) }, // Corrected syntax
              ]) // Correct the map method
            ).values()
          );

          setBookedDates(uniqueBookedDates as UniqueBookedDatesProps[]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, [id]);
  /**
   * Formik setup for managing form state and validation.
   * This function handles form submission, validation, and resetting form values.
   */
  const formik = useFormik({
    initialValues: {
      dateFrom: null as Date | null,
      dateTo: null as Date | null,
      guests: 1,
      venueId: id,
    },
    validationSchema: BookingValidation,
    onSubmit: async (values, actions) => {
      try {
        await postData("holidaze/bookings/", values);
        actions.resetForm();
        setSuccessMessage(
          "Booking has been successfully made, you will be redirected to your bookings."
        );
        setErrorMessage("");
        navigate(`/profiles/${userProfile.name}/bookings`);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message || "An unexpected error occurred.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        setSuccessMessage("");
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
    dirty,
  } = formik;

  /**
   * Updates the total price based on the selected date range.
   * This effect runs whenever the dates change and recalculates the total price.
   */
  useEffect(() => {
    if (values.dateFrom && values.dateTo) {
      setTotalPrice(calculateDays(values.dateFrom, values.dateTo) * venuePrice);
    }
  }, [values.dateFrom, values.dateTo, venuePrice]);

  /**
   * Handles opening the modal when the user clicks the submit button, only if the form is valid and dirty.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The event triggered by the submit button click.
   */
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValid && dirty) setIsModalOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Date From */}
      <label>Check-in date</label>
      <DatePicker
        selected={values.dateFrom}
        onChange={(dates) => {
          if (dates) {
            const [start, end] = dates;
            setFieldValue("dateFrom", start);
            setFieldValue("dateTo", end);
          } else {
            setFieldValue("dateFrom", null);
            setFieldValue("dateTo", null);
          }
        }}
        startDate={values.dateFrom}
        endDate={values.dateTo}
        selectsRange
        minDate={today}
        excludeDates={bookedDates.map((booking) => booking.date)}
        dateFormat="MM/dd/yyyy"
        className="p-1 rounded"
      />
      {errors.dateFrom && touched.dateFrom && (
        <p className="error">{errors.dateFrom}</p>
      )}
      <label>Max Guests</label>
      <input
        type="number"
        name="guests"
        value={values.guests}
        min="1"
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.guests && touched.guests ? "input-error" : "p-1 rounded"
        }
      />
      {errors.guests && touched.guests && (
        <p className="error">{errors.guests}</p>
      )}
      {successMessage && (
        <p
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p
          className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {errorMessage}
        </p>
      )}
      <button
        type="button"
        onClick={handleOpenModal}
        disabled={!dirty || !isValid}
        className="p-2 rounded bg-accentColor mt-3 font-bold hover:bg-orange-600"
      >
        Book now
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Booking for: ${venueTitle}`}
        >
          <p className="font-bold">
            Please verify the booking details, Don't worry. You can always edit
            your booking later.
          </p>

          <p className="text-md py-2">
            Total Days:{" "}
            <span className="font-bold">
              {values.dateFrom && values.dateTo
                ? calculateDays(values.dateFrom, values.dateTo)
                : 0}
            </span>
          </p>

          <p className="text-md">
            Total Price: <span className="font-bold"> ${totalPrice} </span>
          </p>
          <div className="flex justify-between mt-1">
            <button
              className="p-2 bg-red-500 rounded font-bold text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>

            <button
              className="p-2 bg-green-600 rounded font-bold text-white"
              onClick={(e) => {
                e.preventDefault(); // I had to do this to prevent typeScript errors? Am I missing something?
                handleSubmit();
                setIsModalOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </form>
  );
}

export default BookingForm;
