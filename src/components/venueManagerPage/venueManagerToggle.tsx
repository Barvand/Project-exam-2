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

/**
 * Toggles the `venueManager` status of a user profile and updates the state accordingly.
 *
 * @param {Profile | null} profile - The current profile of the user. If `null`, the function returns early.
 * @param {SetProfileState} setProfileState - A state setter function for updating the profile state.
 *
 * @description
 * - Sends an API request to update the `venueManager` status for the given profile.
 * - If successful, updates the state with the new `venueManager` value from the response.
 * - If the API call fails, it reverts the state change to maintain UI consistency.
 *
 * @example
 * ```tsx
 * const [profile, setProfile] = useState<Profile | null>(null);
 *
 * // Call the function to toggle venue manager status
 * VenueManagerToggle(profile, setProfile);
 * ```
 *
 * @returns {Promise<void>} A promise that resolves when the function completes.
 */
async function VenueManagerToggle(
  profile: Profile | null,
  setProfileState: SetProfileState
) {
  if (!profile) return;

  try {
    // Toggle the current venueManager value
    const updatedProfile = {
      venueManager: !profile.venueManager, // Toggle the boolean value
    };

    const response = await updateData(
      `holidaze/profiles/${profile.name}`,
      updatedProfile
    );

    const data = response.data;

    setProfileState((prevState) =>
      prevState
        ? {
            ...prevState,
            venueManager: data.venueManager,
          }
        : null
    );
  } catch (error) {
    console.error("Failed to toggle venue manager status:", error);
    setProfileState((prevState) =>
      prevState
        ? {
            ...prevState,
            venueManager: !prevState.venueManager,
          }
        : null
    );
  }
}

export default VenueManagerToggle;
