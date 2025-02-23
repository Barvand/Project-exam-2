import React, { useState } from "react";
import { updateData } from "../../api/api"; // Ensure this is the correct path to your API functions
import { useAuth } from "../../utils/useAuth";
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

interface RenderProfileInfoProps {
  onToggleVenueManager: () => void;
  profile: Profile;
}

const RenderProfileInfo: React.FC<RenderProfileInfoProps> = ({
  profile,
  onToggleVenueManager,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editModeBanner, setEditModeBanner] = useState(false);
  const [editModeAvatar, setEditModeAvatar] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { userProfile } = useAuth();
  const profileName = userProfile.name;

  // Handle input change for bio, name, avatar, and banner
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "bio" | "name" | "avatar" | "banner"
  ) => {
    const { value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [field]:
        field === "bio" || field === "name"
          ? value
          : { ...prevState[field], url: value },
    }));
  };

  // Handle Save
  const handleSave = async () => {
    try {
      setErrorMessage(null); // Clear old errors
      setSuccessMessage(null); // Clear old success messages

      await updateData(
        `holidaze/profiles/${updatedProfile.name}`,
        updatedProfile
      );

      setEditMode(false);
      setEditModeBanner(false);
      setEditModeAvatar(false);

      setSuccessMessage("Profile updated successfully!");

      // Automatically clear the success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving profile:", error);
        setErrorMessage(error.message);

        // Automatically clear the error message after 3 seconds
        setTimeout(() => setErrorMessage(null), 3000);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Banner */}
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
          {/* Avatar */}
          <ProfileAvatar
            profile={updatedProfile}
            localStorageName={profileName}
            state={editModeAvatar}
            setState={setEditModeAvatar}
            onChange={(e) => handleInputChange(e, "avatar")}
            onSubmit={handleSave}
          />

          {/* Bio */}
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
            <div className="toggle border-customPurple-300 rounded gap-2 p-5 shadow-md">
              <div className="text-center flex flex-col">
                <h2 className="text-2xl text-customPurple-950">
                  {profile.venueManager
                    ? "You are a Venue Manager"
                    : "Regular User"}
                </h2>

                <p className="text-md">
                  {profile.venueManager
                    ? "You can now host your own venues!"
                    : "Want to host your own properties? Toggle below to become a venue manager!"}
                </p>

                <div className="flex justify-center">
                  <label className="relative cursor-pointer mt-3">
                    <span className="sr-only">Toggle Venue Manager</span>
                    <input
                      type="checkbox"
                      checked={profile.venueManager}
                      onChange={onToggleVenueManager}
                      className="sr-only peer"
                    />
                    <div className="w-16 h-8 bg-gray-400 rounded-full peer-checked:bg-customPurple-800 peer transition-all duration-300"></div>
                    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 peer-checked:bg-customPurple-200 transition-all duration-300"></div>
                  </label>
                </div>

                {profile.venueManager ? (
                  <p className="text-green-800 text-sm font-bold mt-2">
                    Active
                  </p>
                ) : (
                  <p className="text-red-800 text-sm font-bold mt-2">
                    Inactive
                  </p>
                )}

                {!profile.venueManager && (
                  <p className="mt-3 text-sm">
                    If you enable this, the "Venue Manager" tab will appear for
                    you to manage your own venues. You can toggle this **on and
                    off** whenever you like.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="bg-red-500 text-white mt-2 p-3 rounded-lg shadow-lg text-center">
            {errorMessage}
          </p>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded-lg shadow-lg text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderProfileInfo;
