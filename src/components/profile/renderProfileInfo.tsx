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

/**
 * A component that displays and allows editing of a user's profile, including
 * the banner, avatar, bio, and venue manager status.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Profile} props.profile - The user's profile data including banner, avatar, name, bio, and venue manager status.
 * @param {Function} props.onToggleVenueManager - Function to toggle the venue manager status.
 *
 * @description
 * - Displays the user's banner, avatar, and bio.
 * - Allows editing of the banner, avatar, and bio for the profile owner.
 * - Uses `ProfileBanner`, `ProfileAvatar`, and `ProfileBio` components for each section.
 * - Handles changes via controlled inputs and updates via an API call.
 * - Allows profile owners to toggle venue manager status.
 * - Provides fallback content for users viewing another person's profile.
 *
 * @example
 * ```tsx
 * <RenderProfileInfo
 *   profile={{
 *     banner: { url: "https://example.com/banner.jpg", alt: "Profile Banner" },
 *     avatar: { url: "https://example.com/avatar.jpg", alt: "Profile Avatar" },
 *     name: "JohnDoe",
 *     bio: "Welcome to my profile!",
 *     venueManager: false,
 *   }}
 *   onToggleVenueManager={toggleVenueManager}
 * />
 * ```
 *
 * @returns {JSX.Element} A profile information component with editable fields.
 */

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

                {/* Toggle Button */}
                <div className="flex justify-center">
                  <label className="relative cursor-pointer mt-3">
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
                  <p className="text-green-600 text-sm font-bold mt-2">
                    Active
                  </p>
                ) : (
                  <p className="text-red-600 text-sm font-bold mt-2">
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

          {/* Fallback content if the logged-in user is not the profile owner */}
          {profileName !== updatedProfile.name && (
            <div className="border border-gray-300 rounded-lg p-5 shadow-md bg-white flex flex-col items-center text-center">
              {/* Profile Role Icon */}
              <div className="text-4xl mb-3">
                {profile.venueManager ? (
                  <span className="text-green-600">🏨</span> // Venue Manager icon
                ) : (
                  <span className="text-gray-500">👤</span> // Regular user icon
                )}
              </div>

              {/* Profile Role Text */}
              <h3 className="text-xl font-semibold text-gray-800">
                {profile.venueManager ? "Venue Manager" : "Regular User"}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2">
                {profile.venueManager
                  ? "This user is a Venue Manager and can host properties."
                  : "This user is a regular member of the platform."}
              </p>

              {/* Subtle separator */}
              <div className="w-full border-t border-gray-300 my-4"></div>

              {/* Additional Message */}
              <p className="text-sm text-gray-500">
                Explore their listings and see what they have to offer!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderProfileInfo;
