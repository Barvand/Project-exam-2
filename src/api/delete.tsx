// I want to read 3 things

// bookings /holidaze/bookings // /holidaze/bookings/<id> // query parameters _customers _venue

// Profiles / /holidaze/profiles // holidaze/profile<name> //
// Venues /holidaze/venues // holidaze/venue<id> // _owner _bookings

export async function fetchData<T = Array>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    // Perform the fetch request with the merged options
    const response = await fetch(url, { ...options });
    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    // Parse and return the response data as JSON
    const data: T = await response.json();
    return data;
  } catch (error) {
    // Check if the error is an instance of Error and throw with its message
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default fetchData;
