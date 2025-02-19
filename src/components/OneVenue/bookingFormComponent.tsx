import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { postData } from "../../api/api";
import { calculateDays } from "../../features/calculateDays";
import VenueDatePicker from "./VenueDatePicker";
import useBookedDates from "../../api/hooks/useBookedDates";
import BookingValidation from "../../Validations/BookingValidation";
import Modal from "../modals/Modal";
import { useAuth } from "../../utils/AuthProvider";

interface BookingFormProps {
  venuePrice: number;
  venueTitle: string;
}

const BookingForm = ({ venuePrice, venueTitle }: BookingFormProps) => {
  const { id } = useParams<{ id: string }>();
  const bookedDates = useBookedDates(id ?? "");
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<{
    success?: string;
    error?: string;
  }>({});

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
        setMessages({ success: "Booking successful! Redirecting..." });
        navigate(`/profiles/${userProfile.name}/bookings`);
      } catch (error) {
        setMessages({
          error:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        });
      }
    },
  });

  const totalPrice =
    formik.values.dateFrom && formik.values.dateTo
      ? calculateDays(formik.values.dateFrom, formik.values.dateTo) * venuePrice
      : 0;

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <label>Check-in date</label>
      <VenueDatePicker
        selectedDates={[formik.values.dateFrom, formik.values.dateTo]}
        onDateChange={(dates) => {
          formik.setFieldValue("dateFrom", dates[0]);
          formik.setFieldValue("dateTo", dates[1]);
        }}
        bookedDates={bookedDates}
      />

      <label>Max Guests</label>
      <input
        type="number"
        name="guests"
        value={formik.values.guests}
        min="1"
        onChange={formik.handleChange}
        className="p-1 rounded"
      />

      <div className="py-2 text-xl font-bold">
        {formik.values.dateFrom &&
          formik.values.dateTo &&
          `$${
            calculateDays(formik.values.dateFrom, formik.values.dateTo) *
            venuePrice
          }`}
      </div>

      {messages.success && (
        <p className="bg-green-500 text-white p-3 rounded-lg">
          {messages.success}
        </p>
      )}
      {messages.error && (
        <p className="bg-red-500 text-white p-3 rounded-lg">{messages.error}</p>
      )}

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={!formik.dirty || !formik.isValid}
        className="p-2 rounded bg-accentColor mt-3"
      >
        Book now
      </button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Booking for: ${venueTitle}`}
        >
          <p className="font-bold">Verify booking details.</p>
          <p className="text-md py-2">
            Total Days:{" "}
            <span className="font-bold">
              {calculateDays(formik.values.dateFrom, formik.values.dateTo)}
            </span>
          </p>
          <p className="text-md">
            Total Price: <span className="font-bold">{`$${totalPrice}`}</span>
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
              onClick={formik.submitForm}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default BookingForm;
