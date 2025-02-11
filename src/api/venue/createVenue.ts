import { GetHeaders } from "../headers"; // Assuming GetHeaders is properly configured to handle authentication/headers

interface VenueFormData {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating?: number;
  media: { url: string; alt: string }[];
  meta: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
}

/**
 * Function to create a new venue.
 * @param data - The venue data to be sent in the request body.
 * @returns A promise that resolves with the API response.
 */
const createVenue = async (data: VenueFormData): Promise<any> => {
  try {
    const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
      method: "POST",
      headers: GetHeaders(), // Ensure this method handles authorization or other necessary headers
      body: JSON.stringify(data), // Send the venue data as JSON
    });

    // Handle response status
    if (!response.ok) {
      throw new Error(`Failed to create venue. Status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse the response body as JSON
    return responseData; // Return the response data
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error; // Rethrow error for further handling in the component or elsewhere
  }
};

export default createVenue;
