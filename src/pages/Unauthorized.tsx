import { Link } from "react-router-dom";
import { GiAirplaneDeparture } from "react-icons/gi";

function UnAuthorizedPage() {
  return (
    <div className="flex flex-col bg-page items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className=" text-white p-4 rounded">
        <h1 className="text-4xl mt-2">
          Sorry, you can't see this page without logging in!
        </h1>
        <p className="text-lg mt-4">But don't worry!</p>
        <div className="flex justify-center">
          <GiAirplaneDeparture size={120} className="text-accentColor " />
        </div>
        <div className="mt-8 flex gap-2 items-center justify-center">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-xl transition-all hover:bg-blue-600"
          >
            Login here!
          </Link>
          <p className="text-xl font-bold"> Or </p>
          <Link
            to="/register"
            className="bg-accentColor text-black px-6 py-2 rounded-lg text-xl transition-all hover:bg-blue-600"
          >
            Register here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorizedPage;
