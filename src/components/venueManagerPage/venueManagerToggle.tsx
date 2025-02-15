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
