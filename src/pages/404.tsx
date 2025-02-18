import { Link } from "react-router-dom";
import { GiAirplaneDeparture } from "react-icons/gi";

function NotFoundPage() {
  return (
    <div className="flex flex-col bg-page items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className=" text-white p-4 rounded">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-3xl mt-2">Oops! Page Not Found</h2>
        <p className="text-lg mt-4">
          It looks you might have missed your flight.
        </p>
        <div className="flex justify-center">
          <GiAirplaneDeparture size={120} className="text-accentColor " />
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-xl transition-all hover:bg-blue-600"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
