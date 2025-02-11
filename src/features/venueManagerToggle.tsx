import UpdateVenueManager from "../api/users/updateVenueManager";

async function VenueManagerToggle(profile, setProfileState) {
  if (!profile) return; // Prevents calling API when profile is null

  try {
    await UpdateVenueManager(profile);
    setProfileState((prevState) => ({
      ...prevState,
      venueManager: !prevState.venueManager,
    }));
  } catch (error) {
    console.error("Failed to toggle venue manager status:", error);
  }
}

export default VenueManagerToggle;
