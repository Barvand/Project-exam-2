import { GetHeaders } from "../../api/headers";

async function venueManager(profile): Promise<void> {
  if (!profile || !profile.name) {
    console.error("Error: Invalid profile data.");
    return;
  }

  // Toggle the current `venueManager` value
  const updatedProfile = { venueManager: !profile.venueManager };

  try {
    // Make the API request
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/profiles/${profile.name}`,
      {
        method: "PUT",
        headers: GetHeaders("PUT"),
        body: JSON.stringify(updatedProfile),
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
