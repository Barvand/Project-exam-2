import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/AuthProvider";
import { BsHouses } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { Spiral as Hamburger } from "hamburger-react";
import { useState } from "react";

function Navigation(): JSX.Element {
  const { isLoggedIn, userProfile, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

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
          <Hamburger toggled={isMobileMenuOpen} toggle={toggleMenu} size={30} />

          {/* Mobile Menu (Only appears when open) */}
          {isMobileMenuOpen && (
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
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800">
              Are you sure?
            </h2>
            <p className="text-gray-600 mt-2">Do you really want to log out?</p>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                  closeMobileMenu();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
