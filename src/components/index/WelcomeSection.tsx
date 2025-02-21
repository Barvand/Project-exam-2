interface WelcomeSectionProps {
  isLoggedIn: boolean;
}

/** A component that renders the welcome section of the homepage.
 * @component
 * @param {boolean} props.IsLoggedIn - property to determine wether the user is logged or not by checking the localStorage for a token.
 *
 * @description
 * Checks wether the user is logged in and if not, it displays a message for the user.
 * Renders the welcoming header.
 * @returns {JSX.Element}
 */
export default function WelcomeSection({ isLoggedIn }: WelcomeSectionProps) {
  return (
    <>
      {/* Show message if user is not logged in */}
      {!isLoggedIn && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-3 text-center">
          🔒 Log in for a better user experience, personalized recommendations,
          and more!
        </div>
      )}

      <div className="relative w-full h-[500px] bg-black">
        <img
          src="/holidaze-background.jpg"
          className="h-full object-cover w-full"
          alt="Holidazing"
        />

        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to Holidaze
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-accentColor ">
            Get going, Get Holidazing
          </h2>
        </div>
      </div>
    </>
  );
}
