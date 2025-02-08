import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteData } from "../../api/api";

interface RenderDeleteBookingProps {
  id: string;
  onDelete: (id: string) => void;
}

function RenderDeleteBooking({
  id,
  onDelete,
}: RenderDeleteBookingProps): JSX.Element {
  const handleDelete = async () => {
    try {
      await deleteData(`holidaze/bookings/${id}`); // Call the delete function with the booking ID
      alert("Booking deleted successfully");
      onDelete(id); // Call onDelete after successful deletion
    } catch (error) {
      alert("Failed to delete booking: " + error.message); // Show an error message if it fails
    }
  };

  return (
    <div className="flex justify-between">
      <button
        className="bg-customPurple-500 p-2 rounded text-white"
        onClick={() => alert("Update booking functionality here")}
      >
        Update booking
      </button>
      <button
        className="bg-red-500 p-2 rounded text-white"
        onClick={handleDelete}
      >
        <MdOutlineDeleteOutline className="text-2xl" />
      </button>
    </div>
  );
}

export default RenderDeleteBooking;
