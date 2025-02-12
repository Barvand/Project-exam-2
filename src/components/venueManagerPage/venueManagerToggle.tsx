import { updateData } from "../../api/api";

// Define the profile interface
interface Profile {
  name: string;
  venueManager: boolean;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  bio: string;
  bookings: any[];
}

type SetProfileState = React.Dispatch<React.SetStateAction<Profile | null>>;

async function VenueManagerToggle(
  profile: Profile | null,
  setProfileState: SetProfileState
) {
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

    // Update the state with the toggled value from the API response
    setProfileState((prevState) =>
      prevState
        ? {
            ...prevState,
            venueManager: data.venueManager, // Use the updated value from the API
          }
        : null
    );
  } catch (error) {
    console.error("Failed to toggle venue manager status:", error);
    // Revert the toggle in case of an error
    setProfileState((prevState) =>
      prevState
        ? {
            ...prevState,
            venueManager: !prevState.venueManager, // Revert the toggle
          }
        : null
    );
  }
}

export default VenueManagerToggle;
