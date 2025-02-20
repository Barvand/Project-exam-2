import { FaPencilAlt } from "react-icons/fa";

// Define the interface for the profile object
interface Profile {
  name: string;
  bio: string;
}

// Define the interface for the props
interface ProfileBioProps {
  profile: Profile;
  localStorageName: string;
  setState: (state: boolean) => void;
  state: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

/**
 * A component that displays a user's profile bio with an optional edit feature.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Profile} props.profile - The user's profile data containing the name and bio.
 * @param {string} props.localStorageName - The username stored in local storage to determine edit permissions.
 * @param {Function} props.setState - Function to toggle the edit mode state.
 * @param {boolean} props.state - Boolean value indicating whether the edit mode is active.
 * @param {Function} props.onChange - Function to handle bio input changes.
 * @param {Function} props.onSubmit - Function to handle submitting the updated bio.
 *
 * @description
 * - Displays a user's name and bio.
 * - If the logged-in user matches the profile name, an edit button appears, allowing them to update their bio.
 * - Clicking the edit button toggles an input field where users can modify their bio.
 * - Users can cancel the edit or save changes.
 *
 * @example
 * ```tsx
 * <ProfileBio
 *   profile={{ name: "JohnDoe", bio: "Welcome to my profile!" }}
 *   localStorageName="JohnDoe"
 *   setState={setEditMode}
 *   state={editMode}
 *   onChange={(e) => handleBioChange(e)}
 *   onSubmit={handleBioSubmit}
 * />
 * ```
 *
 * @returns {JSX.Element} A profile bio component with an edit feature for the owner.
 */
function ProfileBio({
  profile,
  localStorageName,
  setState,
  state,
  onChange,
  onSubmit,
}: ProfileBioProps) {
  return (
    <>
      <div className="p-5 border rounded shadow-md relative">
        {state ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={onChange}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Enter bio"
          />
        ) : (
          <>
            <h1 className="text-5xl text-primary">{profile.name}</h1>
            <p className="text-1xl">{profile.bio}</p>
          </>
        )}
        {/* Toggle Edit Mode and Save */}
        {localStorageName === profile.name && (
          <div className="flex justify-between p-5">
            <button
              onClick={() => setState(!state)}
              className={`absolute bg-primary right-2 bottom-2 text-white rounded-full p-3 border hover:border-white hover:bg-secondary ${
                state
                  ? "py-2 px-6 rounded-lg bg-indigo-600 text-white border-none"
                  : ""
              }`}
            >
              {state ? "Cancel" : <FaPencilAlt />}
            </button>
            {state && localStorageName === profile.name && (
              <button
                onClick={onSubmit}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
              >
                Save Changes
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileBio;
