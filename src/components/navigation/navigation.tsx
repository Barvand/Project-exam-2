import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { BsHouses } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoPersonAddOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { useState } from "react";
import LogoutConfirmModal from "../modals/logoutModal";
import HamburgerMenu from "./hamburgerMenu";

function Navigation(): JSX.Element {
  const { isLoggedIn, userProfile, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Prevent accessing userProfile if it's null
  if (isLoggedIn && !userProfile) {
    return null; // or return a loading state
  }

  console.log(userProfile);

  return (
    <nav className="bg-primary text-white shadow-md relative">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex gap-2">
          <img src="/airplanelogo.png" className="h-12" alt="Holidaze-Logo" />
          <h1 className="text-4xl font-bold">Holidaze</h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link
              to="/venues"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <BsHouses className="text-xl" /> Venues
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <CiLogin className="text-xl" /> Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <IoPersonAddOutline className="text-xl" /> Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={`/profiles/${userProfile.name}/bookings`}
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <MdOutlineEventAvailable className="text-xl" /> Your Bookings
                </Link>
              </li>
              <li>
                <Link
                  to={`/profiles/${userProfile.name}`}
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <IoPersonCircleOutline className="text-xl" /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to={`/profiles/${userProfile.name}/venueManager`}
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <FaUserTie className="text-xl" /> Venue Manager
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  <FaSignOutAlt className="text-xl" />
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Navigation (Hamburger Menu) */}
        <HamburgerMenu
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          onLogout={() => setShowLogoutConfirm(true)}
        />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutConfirmModal
          onCancel={() => setShowLogoutConfirm(false)}
          onLogout={() => {
            logout();
            setShowLogoutConfirm(false);
          }}
        />
      )}
    </nav>
  );
}

export default Navigation;
