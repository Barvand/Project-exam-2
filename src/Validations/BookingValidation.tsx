import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0); // Normalize time to avoid issues

const BookingSchema = yup.object().shape({
  dateFrom: yup
    .date()
    .min(today, "Your arrival date cannot be in the past")
    .required("Your arrival date is required"),
  dateTo: yup
    .date()
    .required("A departure date is required")
    .test(
      "is-after-start",
      "Checkout date must be after the arrival date",
      function (value) {
        return value > this.parent.dateFrom; // Corrected to `dateFrom`
      }
    ),
  guests: yup
    .number()
    .typeError("Max guests should be a number.")
    .integer("Max guests must be a whole number")
    .min(1, "Max guests cannot be lower than 1")
    .required("Max guests is required."),
});

export default BookingSchema;
