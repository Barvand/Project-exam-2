import { GetHeaders } from "../../api/headers";

async function venueManager(profile): Promise<void> {
  if (!profile || !profile.name) {
    console.error("Error: Invalid profile data.");
    return;
  }

  try {
    // Toggle the current venueManager value
    const updatedProfile = {
      venueManager: !profile.venueManager, // Toggle the boolean value
    };

    // Make the API request with only the updated venueManager value
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/profiles/${profile.name}`,
      {
        method: "PUT",
        headers: GetHeaders("PUT"),
        body: JSON.stringify(updatedProfile), // Send only the toggled venueManager
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Profile updated:", data);
    return data; // Return the updated data
  } catch (error) {
    console.error("Error updating venue manager status:", error);
    throw error;
  }
}

export default venueManager;
