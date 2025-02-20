import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface VenueDatePickerProps {
  selectedDates: [Date | null, Date | null];
  onDateChange: (dates: [Date | null, Date | null]) => void;
  bookedDates: Date[];
}

/**
 * A date picker component for selecting a range of available booking dates.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {[Date | null, Date | null]} props.selectedDates - The currently selected date range.
 * @param {Function} props.onDateChange - Callback function to handle changes in the selected date range.
 * @param {Date[]} props.bookedDates - An array of booked dates to be excluded from selection.
 *
 * @description
 * - Uses `react-datepicker` to allow users to select a date range.
 * - Prevents selecting dates that are already booked.
 * - Ensures users can only pick dates from today onward.
 * - Displays the date format as `dd/MM/yyyy`.
 *
 * @example
 * ```tsx
 * const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
 * const bookedDates = [new Date(2024, 1, 15), new Date(2024, 1, 20)];
 *
 * <VenueDatePicker
 *   selectedDates={selectedDates}
 *   onDateChange={setSelectedDates}
 *   bookedDates={bookedDates}
 * />
 * ```
 *
 * @returns {JSX.Element} A date picker for selecting available booking dates.
 */

function VenueDatePicker({
  selectedDates,
  onDateChange,
  bookedDates,
}: VenueDatePickerProps) {
  const today = new Date();

  return (
    <DatePicker
      selected={selectedDates[0]}
      onChange={(dates) => onDateChange(dates as [Date | null, Date | null])}
      startDate={selectedDates[0]}
      endDate={selectedDates[1]}
      selectsRange
      minDate={today}
      excludeDates={bookedDates}
      dateFormat="dd/MM/yyyy"
      className="p-1 rounded"
    />
  );
}

export default VenueDatePicker;
