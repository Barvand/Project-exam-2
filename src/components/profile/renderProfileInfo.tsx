import React, { useState } from "react";
import { updateData } from "../../api/api"; // Ensure this is the correct path to your API functions
import { useAuth } from "../../utils/AuthProvider";
import ProfileBanner from "./profileBanner";
import ProfileAvatar from "./profileAvatar";
import ProfileBio from "./profileBio";

// Define types for the profile data
interface Profile {
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  name: string;
  bio: string;
  venueManager: boolean;
}

// Define types for the props
interface RenderProfileInfoProps {
  onToggleVenueManager: () => void;
  profile: Profile;
}

// Define types for the state change handlers
type HandleChangeEvent = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  field: "bio" | "name" | "avatar" | "banner"
) => void;

const RenderProfileInfo: React.FC<RenderProfileInfoProps> = ({
  profile,
  onToggleVenueManager,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editModeBanner, setEditModeBanner] = useState<boolean>(false);
  const [editModeAvatar, setEditModeAvatar] = useState<boolean>(false);
  const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile);
  const { userProfile } = useAuth();
  const profileName = userProfile.name;

  // Handle input change for bio, name, avatar, and banner
  const handleInputChange: HandleChangeEvent = (e, field) => {
    const { value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [field]:
        field === "bio" || field === "name"
          ? value
          : { ...prevState[field], url: value },
    }));
  };

  // Handle save
  const handleSave = async () => {
    try {
      // Make API call to save the updated profile
      await updateData(
        `holidaze/profiles/${updatedProfile.name}`,
        updatedProfile
      );
      setEditMode(false); // Exit edit mode after saving
      setEditModeBanner(false);
      setEditModeAvatar(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Banner with edit option */}
      <ProfileBanner
        profile={updatedProfile}
        localStorageName={profileName}
        state={editModeBanner}
        setState={setEditModeBanner}
        onChange={(e) => handleInputChange(e, "banner")}
        onSubmit={handleSave}
      />

      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 transform py-2 rounded">
          <ProfileAvatar
            profile={updatedProfile}
            localStorageName={profileName}
            state={editModeAvatar}
            setState={setEditModeAvatar}
            onChange={(e) => handleInputChange(e, "avatar")}
            onSubmit={handleSave}
          />

          {/* Profile Info with edit fields */}
          <ProfileBio
            profile={updatedProfile}
            localStorageName={profileName}
            state={editMode}
            setState={setEditMode}
            onChange={(e) => handleInputChange(e, "bio")}
            onSubmit={handleSave}
          />

          {/* Venue Manager Toggle */}
          {profileName === updatedProfile.name && (
            <div className="toggle border-customPurple-300 rounded flex flex-col justify-evenly gap-2 p-5 shadow-md">
              {profile.venueManager ? (
                <div className="text-center flex flex-col">
                  <h2 className="text-2xl text-customPurple-950">
                    You are a Venue Manager
                  </h2>
                  <button
                    className="btn border-customPurple-800 border rounded p-2 bg-customPurple-800 text-customPurple-200 font-bold shadow-md"
                    onClick={onToggleVenueManager}
                  >
                    Click here
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center gap-5">
                  <h2 className="text-2xl">
                    Want to host your own properties? Become a venue manager
                    now!
                  </h2>
                  <button
                    className="btn border-customPurple-800 border rounded p-2 bg-customPurple-800 text-customPurple-200 font-bold shadow-md"
                    onClick={onToggleVenueManager}
                  >
                    Click here
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Fallback content if the logged-in user is not the profile owner */}
          {profileName !== updatedProfile.name && (
            <div className="toggle bg-customPurple-400 border-customPurple-300 rounded flex flex-col justify-evenly gap-2 p-5 shadow-md">
              {/* Add any fallback or informational content for other users */}
              <p className="text-center">
                {profile.venueManager ? "Venue Manager" : "Regular user"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderProfileInfo;
