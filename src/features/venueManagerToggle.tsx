import { updateData } from "../api/api";

async function VenueManagerToggle(profile, setProfileState) {
  if (!profile) return; // Prevents calling API when profile is null

  try {
    // Toggle the current venueManager value
    const updatedProfile = {
      venueManager: !profile.venueManager, // Toggle the boolean value
    };

    // Make the API request with only the updated venueManager value
    const response = await updateData(
      `holidaze/profiles/${profile.name}`,
      updatedProfile
    );

    // Assuming the response contains the updated profile
    const data = response.data;
    // Log the updated profile to ensure it toggled correctly
    console.log("Updated profile:", data);

    // Update the state with the toggled value from the API response
    setProfileState((prevState) => ({
      ...prevState,
      venueManager: data.venueManager, // Use the updated value from the API
    }));
  } catch (error) {
    console.error("Failed to toggle venue manager status:", error);
    // Revert the toggle in case of an error
    setProfileState((prevState) => ({
      ...prevState,
      venueManager: !prevState.venueManager, // Revert the toggle
    }));
  }
}

export default VenueManagerToggle;
