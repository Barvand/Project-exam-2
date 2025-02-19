import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface VenueDatePickerProps {
  selectedDates: [Date | null, Date | null];
  onDateChange: (dates: [Date | null, Date | null]) => void;
  bookedDates: Date[];
}

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
