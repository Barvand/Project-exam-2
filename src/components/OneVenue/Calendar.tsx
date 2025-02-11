import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ onDateChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelectDate = (dates) => {
    const [start, end] = dates; // Extract the start and end dates from the selected range
    setStartDate(start); // Set start date
    setEndDate(end); // Set end date
    if (onDateChange) {
      onDateChange(start, end); // Pass the selected dates to the parent component
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate} // Start date
        onChange={handleSelectDate} // Update both start and end date
        startDate={startDate} // Required for selecting date range
        endDate={endDate} // Required for selecting date range
        selectsRange // Enable date range selection
        minDate={new Date()} // Optional: prevent selecting past dates
        dateFormat="dd-MM-yy" // Date format
        isClearable // Optional: allow clearing the selection
      />
    </div>
  );
}

export default Calendar;
