import React, { useState } from "react";
import { updateData } from "../../api/api"; // Ensure this is the correct path to your API functions
import { GiVerticalBanner } from "react-icons/gi";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useAuth } from "../../authentication/AuthProvider";

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

const RenderProfileInfo: React.FC<RenderProfileInfoProps> = ({
  profile,
  onToggleVenueManager,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editModeBanner, setEditModeBanner] = useState(false);
  const [editModeAvatar, setEditModeAvatar] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile);
  const { userProfile } = useAuth();
  const profileName = userProfile.name;

  // Handle input change for bio and name
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "banner" | "avatar"
  ) => {
    const { value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [field]: { url: value, alt: "" }, // You can set alt as an empty string or let the user input it as well.
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
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Banner with edit option */}
      <div
        className="h-64 w-full bg-cover bg-center drop-shadow-md relative"
        style={{ backgroundImage: `url(${updatedProfile.banner.url})` }}
        aria-label={updatedProfile.banner.alt}
      >
        {profileName === updatedProfile.name && (
          <div
            onClick={() => setEditModeBanner(!editModeBanner)}
            className="bg-white absolute rounded-full p-2 right-0 top-0 cursor-pointer m-2"
          >
            <GiVerticalBanner className="text-3xl" />
          </div>
        )}
      </div>
      {editModeBanner && profileName === updatedProfile.name && (
        <input
          type="text"
          value={updatedProfile.banner.url}
          onChange={(e) => handleImageUrlChange(e, "banner")}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Enter banner image URL"
        />
      )}

      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 transform py-2 rounded">
          {/* Avatar with edit option */}
          <div className="p-5 rounded bg-customPurple-200 border-customPurple-300 border items-center flex justify-center shadow-md relative">
            <img
              className="h-64 w-64 rounded-full object-cover border-4 border-white shadow-lg"
              src={updatedProfile.avatar.url}
              alt={updatedProfile.avatar.alt}
            />
            {profileName === updatedProfile.name && (
              <div
                onClick={() => setEditModeAvatar(!editModeAvatar)}
                className="bg-white absolute rounded-full p-2 right-[50px] top-50 cursor-pointer m-2"
              >
                <FaCamera className="text-2xl" />
              </div>
            )}
            {editModeAvatar && profileName === updatedProfile.name && (
              <input
                type="text"
                onChange={(e) => handleImageUrlChange(e, "avatar")}
                className="w-full mb-3 p-2 border rounded absolute bottom-0"
                placeholder="Enter an image url"
              />
            )}
          </div>

          {/* Profile Info with edit fields */}
          <div className="p-5 bg-customPurple-300 border-customPurple-300 border rounded shadow-md">
            {editMode ? (
              <textarea
                name="bio"
                value={updatedProfile.bio}
                onChange={handleInputChange}
                className="w-full mb-3 p-2 border rounded"
                placeholder="Enter bio"
              />
            ) : (
              <>
                <h1 className="text-5xl text-customPurple-950">
                  {updatedProfile.name}
                </h1>
                <p className="text-1xl">{updatedProfile.bio}</p>
              </>
            )}
            {/* Toggle Edit Mode and Save */}
            {profileName === updatedProfile.name && (
              <div className="flex justify-between p-4">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
                >
                  {editMode ? "Cancel" : <FaPencilAlt />}
                </button>
                {editMode && profileName === updatedProfile.name && (
                  <button
                    onClick={handleSave}
                    className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Venue Manager Toggle */}
          {profileName === updatedProfile.name && (
            <div className="toggle bg-customPurple-400 border-customPurple-300 rounded flex flex-col justify-evenly gap-2 p-5 shadow-md">
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
