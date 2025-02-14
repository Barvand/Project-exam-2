import VenuesPage from "./Venues";
import { useAuth } from "../authentication/AuthProvider";

function IndexPage() {
  const { isLoggedIn } = useAuth(); // Fix: Added parentheses to useAuth()

  return (
    <>
      {/* Show message if user is not logged in */}
      {!isLoggedIn && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-3 text-center">
          🔒 Log in for a better user experience, personalized recommendations,
          and more!
        </div>
      )}

      <div className="relative w-full h-[400px]">
        <img
          src="/holidazing.jpg"
          className="h-full object-cover"
          alt="Holidazing"
        />
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center">
          <h1 className="text-5xl font-bold mb-10">Welcome to Holidaze</h1>
          <h2 className="text-4xl text-accentColor font-semibold">
            Get going, Get Holidazing
          </h2>
        </div>
      </div>
      <VenuesPage />
    </>
  );
}

export default IndexPage;
