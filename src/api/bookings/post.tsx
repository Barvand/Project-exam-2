import { useParams } from "react-router-dom";
import { GetHeaders } from "../headers";

interface CreateBookingProps {
  value: {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string;
  };
}

async function CreateBooking({ value }: CreateBookingProps) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/bookings/`,
      {
        method: "POST",
        headers: GetHeaders(),
        body: JSON.stringify(value), // Send the booking data in the request body
      }
    );
    return response;
  } catch (error) {
    console.error("Network error:", error);
  }
}

export default CreateBooking;
