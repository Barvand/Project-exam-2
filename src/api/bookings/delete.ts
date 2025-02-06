import { GetHeaders } from "../headers";

interface DeleteProps {
  id: string;
}

async function DeleteBooking({ id }: DeleteProps) {
  if (!id) {
    console.error("Error: Booking ID is required.");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/bookings/${id}`,
      {
        method: "DELETE",
        headers: GetHeaders(),
      }
    );

    if (response.status === 204) {
      console.log("Booking successfully deleted.");
    } else {
      throw new Error(`Failed to delete booking: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

export default DeleteBooking;
