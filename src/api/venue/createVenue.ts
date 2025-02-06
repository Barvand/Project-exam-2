import { apiRequest } from "../fetchAPI";

/**
 * Function to create a new venue.
 * @param body - The venue data to be sent in the request body.
 * @returns A promise that resolves with the API response.
 */
async function createVenue(body: object) {
  try {
    // Await the apiRequest call to get the actual response
    const response = await apiRequest("/venues", "POST", body);

    // Check if the response is empty (i.e., no content) but still successful
    if (response === null) {
      return { success: true }; // Handle 204 No Content response
    }

    return response; // Return the response data
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error; // Rethrow error for further handling in the component or elsewhere
  }
}

export default createVenue;
