import { GiVerticalBanner } from "react-icons/gi";

// Define the interface for the banner object
interface Banner {
  url: string;
  alt: string;
}

interface Profile {
  name: string;
  banner: Banner;
}

// Define the interface for the props
interface ProfileBannerProps {
  profile: Profile;
  localStorageName: string;
  setState: (state: boolean) => void;
  state: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  onSubmit: () => void;
}

/**
 * A component that displays a user's profile banner with an optional edit feature.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Profile} props.profile - The user's profile data containing the banner URL and alt text.
 * @param {string} props.localStorageName - The username stored in local storage to determine edit permissions.
 * @param {Function} props.setState - Function to update the edit mode state.
 * @param {boolean} props.state - Boolean value indicating whether the edit mode is active.
 * @param {Function} props.onChange - Function to handle banner URL input changes.
 * @param {Function} props.onSubmit - Function to handle submitting the updated banner.
 *
 * @description
 * - Displays a banner as a background image.
 * - If the logged-in user matches the profile name, an edit icon appears, allowing them to update the banner.
 * - Clicking the edit icon toggles an input field where users can enter a new banner URL.
 * - Submitting the form updates the banner and exits edit mode.
 *
 * @example
 * ```tsx
 * <ProfileBanner
 *   profile={{ name: "JohnDoe", banner: { url: "https://example.com/banner.jpg", alt: "Profile Banner" } }}
 *   localStorageName="JohnDoe"
 *   setState={setEditMode}
 *   state={editMode}
 *   onChange={(e, field) => handleInputChange(e, field)}
 *   onSubmit={handleBannerSubmit}
 * />
 * ```
 *
 * @returns {JSX.Element} A profile banner component with an edit feature for the owner.
 */

function ProfileBanner({
  profile,
  localStorageName,
  setState,
  state,
  onChange,
  onSubmit,
}: ProfileBannerProps) {
  return (
    <>
      <div
        className="h-64 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${profile.banner.url})` }}
        aria-label={profile.banner.alt}
      >
        {localStorageName === profile.name && (
          <div
            onClick={() => setState(!state)}
            className="bg-white absolute rounded-full p-2 right-0 top-0 cursor-pointer m-2"
          >
            <GiVerticalBanner className="text-3xl" />
          </div>
        )}
      </div>
      {state && localStorageName === profile.name && (
        <div className="flex flex-col">
          <input
            type="text"
            value={profile.banner.url}
            onChange={(e) => onChange(e, "banner")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Enter banner image URL"
          />
          <button
            onClick={() => {
              onSubmit(); // Call the onSubmit function
              setState(!state); // Toggle the state
            }}
            className="p-2 bg-blue-500 text-white rounded self-start"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileBanner;
