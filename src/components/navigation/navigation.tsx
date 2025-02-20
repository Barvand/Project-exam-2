import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { BsHouses } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoPersonAddOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { Spiral as Hamburger } from "hamburger-react";
import { useState, useEffect, useRef } from "react";
import LogoutConfirmModal from "../modals/logoutModal";

/**
 * A responsive navigation bar component for the Holidaze application.
 *
 * @component
 * @returns {JSX.Element} A responsive navigation bar with authentication-aware links.
 */
function Navigation(): JSX.Element {
  const { isLoggedIn, userProfile, logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  

  // Function to toggle menu visibility
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Handle clicking outside of the menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-primary text-white shadow-md relative">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link to="/" className="flex gap-2">
          <img src="/airplanelogo.png" className="h-12" alt="Holidaze-Logo" />
          <h1 className="text-4xl font-bold">Holidaze</h1>
        </Link>

        {/* Hamburger Button */}
        <div className="relative">
          <Hamburger toggled={isMenuOpen} toggle={toggleMenu} size={30}/>

          {/* Full-screen dropdown on mobile, sidebar on desktop */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className={`fixed top-0 right-0 h-screen w-3/4 sm:w-1/2 md:w-[500px] bg-white text-black shadow-lg p-6 border-l border-black
              transition-transform duration-300 ease-in-out z-40 
              ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <Hamburger toggled={isMenuOpen} toggle={toggleMenu} size={30} />
              </div>

              {/* Navigation Links */}
              <ul className="flex flex-col space-y-3">
                <li className="hover:bg-gray-100 p-2 rounded transition">
                  <Link
                    to="/venues"
                    className="flex items-center gap-2"
                    onClick={closeMenu}
                  >
                    <BsHouses className="text-xl text-primary" /> Venues
                  </Link>
                </li>

                {!isLoggedIn ? (
                  <>
                    <li className="hover:bg-gray-100 p-2 rounded transition">
                      <Link
                        to="/login"
                        className="flex items-center gap-2"
                        onClick={closeMenu}
                      >
                        <CiLogin className="text-xl text-primary" /> Login
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 p-2 rounded transition">
                      <Link
                        to="/register"
                        className="flex items-center gap-2"
                        onClick={closeMenu}
                      >
                        <IoPersonAddOutline className="text-xl text-primary" />{" "}
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="hover:bg-gray-100 p-2 rounded transition">
                      <Link
                        to={`/profiles/${userProfile.name}/bookings`}
                        className="flex items-center gap-2"
                        onClick={closeMenu}
                      >
                        <MdOutlineEventAvailable className="text-xl text-primary" />{" "}
                        Your Bookings
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 p-2 rounded transition">
                      <Link
                        to={`/profiles/${userProfile.name}`}
                        className="flex items-center gap-2"
                        onClick={closeMenu}
                      >
                        <IoPersonCircleOutline className="text-xl text-primary" />{" "}
                        Profile
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 p-2 rounded transition">
                      <Link
                        to={`/profiles/${userProfile.name}/venueManager`}
                        className="flex items-center gap-2"
                        onClick={closeMenu}
                      >
                        <FaUserTie className="text-xl text-primary" /> Venue
                        Manager
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {/* Logout Button (Bottom) */}
              {isLoggedIn && (
                <div className="absolute bottom-4 left-0 w-full px-6">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 text-white font-bold rounded shadow-md hover:bg-red-700 transition"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    <FaSignOutAlt className="text-xl" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Show logout confirmation modal */}
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
