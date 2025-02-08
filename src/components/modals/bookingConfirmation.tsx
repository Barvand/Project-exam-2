// Modal.js (or Modal.tsx)
import React from "react";

function BookingModal({
  isOpen,
  onClose,
  onConfirm,
  totalCost,
  daysCount,
  dateFrom,
  dateTo,
}) {
  if (!isOpen) return null; // Do not render modal if not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-lg font-semibold">Booking Confirmation</h3>
        <p>Arrival Date: {dateFrom}</p>
        <p>Checkout Date: {dateTo}</p>
        <p>Number of Days: {daysCount}</p>
        <p>Total Cost: ${totalCost}</p>

        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 p-2 text-white font-bold"
            onClick={onConfirm} // Confirm booking action
          >
            Confirm Booking
          </button>

          <button
            className="bg-red-500 p-2 text-white font-bold"
            onClick={onClose} // Close modal action
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
