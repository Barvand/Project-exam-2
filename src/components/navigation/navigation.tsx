import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/AuthProvider";
import { BsHouses } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiHomeHeartLine } from "react-icons/ri";

function Navigation(): JSX.Element {
  const { isLoggedIn, userProfile, logout } = useAuth();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-white shadow-md p-4">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/holidazelogo.png" className="h-12" alt="Holidaze Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
              Holidaze
            </span>
          </Link>
        </div>
        <ul className="space-y-4 font-bold">
          <div className="link flex items-center hover:bg-gray-200">
            <div>
              <BsHouses className="text-2xl" />
            </div>
            <li>
              <Link to="/venues" className="block py-2 px-3 rounded-md ">
                Venues
              </Link>
            </li>
          </div>

          {!isLoggedIn ? (
            <>
              <div className="link flex items-center hover:bg-gray-200">
                <div>
                  <CiLogin className="text-2xl" />
                </div>
                <li>
                  <Link to="/login" className="block py-2 px-3 rounded-md">
                    Login
                  </Link>
                </li>
              </div>
              <div className="link flex items-center hover:bg-gray-200">
                <div>
                  <IoPersonAddOutline className="text-2xl" />
                </div>
                <li>
                  <Link to="/register" className="block py-2 px-3 rounded-md">
                    Register
                  </Link>
                </li>
              </div>
            </>
          ) : (
            <>
              <div className="link flex items-center">
                <div>
                  <BsHouses className="text-2xl" />
                </div>
                <li>
                  <Link
                    to={`profiles/${userProfile.name}/bookings/`}
                    className="block py-2 px-3 rounded-md hover:bg-gray-200"
                  >
                    Your bookings
                  </Link>
                </li>
              </div>
              <li>
                <Link
                  to={`profiles/${userProfile.name}`}
                  className="block py-2 px-3 rounded-md hover:bg-gray-200"
                >
                  Your Venues
                </Link>
              </li>
              <li>
                <Link
                  to={`profiles/${userProfile.name}`}
                  className="block py-2 px-3 rounded-md hover:bg-gray-200"
                >
                  Create a venue
                </Link>
              </li>
              <li>
                <Link
                  to={`profiles/${userProfile.name}`}
                  className="block py-2 px-3 rounded-md hover:bg-gray-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={`profiles/${userProfile.name}`}
                  className="block py-2 px-3 rounded-md hover:bg-gray-200"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block py-2 px-3 rounded-md hover:bg-gray-200"
                >
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
