import { GetHeaders } from "../headers";
import { postData } from "../api";

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
    const response = await postData(
      `https://v2.api.noroff.dev/holidaze/bookings/`,
      value
    );
    return response;
  } catch (error) {
    console.error("Network error:", error);
  }
}

export default CreateBooking;
