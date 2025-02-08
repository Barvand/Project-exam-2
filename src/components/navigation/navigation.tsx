import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/AuthProvider";
import { BsHouses } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { Spiral as Hamburger } from "hamburger-react";
import { useState } from "react";
import LogoutConfirmModal from "../modals/logoutModal";

function Navigation(): JSX.Element {
  const { isLoggedIn, userProfile, logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout(); // Perform logout
    setShowLogoutConfirm(false); // Close the logout confirmation modal
    closeMenu(); // Close the mobile menu if open
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 flex items-center justify-between py-4 relative">
        {/* Logo */}
        <Link to="/" className="flex gap-2">
          <img src="/holidazelogo.png" className="h-12" alt="Holidaze-Logo" />
          <span className="self-center text-2xl font-semibold text-customPurple-800">
            Holidaze
          </span>
        </Link>

        {/* Hamburger Button */}
        <div className="relative">
          <Hamburger toggled={isMenuOpen} toggle={toggleMenu} size={30} />

          {/* Mobile Menu (Only appears when open) */}
          {isMenuOpen && (
            <div className="bg-white border shadow-md absolute right-0 top-full w-64 md:w-80 z-50 rounded-lg mt-2">
              <ul className="flex flex-col space-y-3 p-4">
                <li className="hover:bg-customPurple-800 p-1 rounded hover:text-customPurple-50">
                  <Link to="/venues" className="block py-2" onClick={closeMenu}>
                    <BsHouses className="inline-block mr-1" /> Venues
                  </Link>
                </li>

                {!isLoggedIn ? (
                  <>
                    <li className="hover:bg-customPurple-800 p-1 rounded hover:text-customPurple-50">
                      <Link
                        to="/login"
                        className="block py-2"
                        onClick={closeMenu}
                      >
                        <CiLogin className="inline-block mr-1" /> Login
                      </Link>
                    </li>
                    <li className="hover:bg-customPurple-800 p-1 rounded hover:text-customPurple-50">
                      <Link
                        to="/register"
                        className="block py-2"
                        onClick={closeMenu}
                      >
                        <IoPersonAddOutline className="inline-block mr-1" />{" "}
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="hover:bg-customPurple-800 p-1 rounded hover:text-customPurple-50">
                      <Link
                        to={`/profiles/${userProfile.name}/bookings`}
                        className="block py-2"
                        onClick={closeMenu}
                      >
                        Your Bookings
                      </Link>
                    </li>
                    <li className="hover:bg-customPurple-800 p-1 rounded hover:text-customPurple-50">
                      <Link
                        to={`/profiles/${userProfile.name}`}
                        className="block py-2"
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="hover:bg-customPurple-800 p-1 rounded hover:text-customPurple-50">
                      <Link
                        to={`/profiles/${userProfile.name}/create-venue`}
                        className="block py-2"
                        onClick={closeMenu}
                      >
                        Create Venue
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="block py-2 text-red-500"
                      >
                        Log out
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Show the modal if the user wants to log out */}
      {showLogoutConfirm && (
        <LogoutConfirmModal
          onCancel={() => setShowLogoutConfirm(false)}
          onLogout={handleLogout}
        />
      )}
    </nav>
  );
}

export default Navigation;
