import { FaCamera } from "react-icons/fa";

interface Avatar {
  url: string;
  alt: string;
}

interface Profile {
  name: string;
  avatar: Avatar;
}

interface ProfileAvatarProps {
  profile: Profile;
  localStorageName: string;
  setState: (state: boolean) => void;
  state: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  onSubmit: () => void;
}
/**
 * A component that displays a user's profile avatar with an optional edit feature.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Profile} props.profile - The user's profile data containing the avatar URL and alt text.
 * @param {string} props.localStorageName - The username stored in local storage to determine edit permissions.
 * @param {Function} props.setState - Function to update the edit mode state.
 * @param {boolean} props.state - Boolean value indicating whether the edit mode is active.
 * @param {Function} props.onChange - Function to handle avatar URL input changes.
 * @param {Function} props.onSubmit - Function to handle submitting the updated avatar.
 *
 * @description
 * - Displays a circular avatar image.
 * - If the logged-in user matches the profile name, a camera icon appears, allowing them to edit their avatar.
 * - Clicking the camera icon toggles an input field where users can enter a new avatar URL.
 * - Submitting the form updates the avatar and exits edit mode.
 *
 * @example
 * ```tsx
 * <ProfileAvatar
 *   profile={{ name: "JohnDoe", avatar: { url: "https://example.com/avatar.jpg", alt: "Profile Avatar" } }}
 *   localStorageName="JohnDoe"
 *   setState={setEditMode}
 *   state={editMode}
 *   onChange={(e, field) => handleInputChange(e, field)}
 *   onSubmit={handleAvatarSubmit}
 * />
 * ```
 *
 * @returns {JSX.Element} A profile avatar component with an edit feature for the owner.
 */

function ProfileAvatar({
  profile,
  localStorageName,
  setState,
  state,
  onChange,
  onSubmit,
}: ProfileAvatarProps) {
  return (
    <div>
      {/* Avatar with edit option */}
      <div className="p-5 rounded border items-center flex justify-center shadow-md flex-col relative">
        <img
          className="h-32 w-32 sm:h-64 sm:w-64 rounded-full object-cover border-4 border-white shadow-lg"
          src={profile.avatar.url}
          alt={profile.avatar.alt}
        />

        {/* Camera icon on top of the image */}
        {localStorageName === profile.name && (
          <div
            onClick={() => setState(!state)}
            className="absolute rounded-full p-2 right-2 bottom-2 cursor-pointer border border-black bg-primary hover:bg-secondary hover:border-white"
          >
            <FaCamera className="text-2xl text-white" />
          </div>
        )}
      </div>
      {state && localStorageName === profile.name && (
        <div className="flex flex-col w-full">
          <label htmlFor="profileAvatar">
            <span className="sr-only"> Avatar </span>
          </label>
          <input
            id="profileAvatar"
            type="text"
            value={profile.avatar.url}
            onChange={(e) => onChange(e, "avatar")}
            className="p-2 border rounded"
            placeholder="Enter an image url"
          />
          <button
            onClick={() => {
              onSubmit(); // Call the onSubmit function
              setState(!state); // Toggle the state
            }}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileAvatar;
