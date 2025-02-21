import { Spiral as Hamburger } from "hamburger-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsHouses } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoPersonAddOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { useAuth } from "../../utils/useAuth";

interface HamburgerMenuProps {
  isLoggedIn: boolean;
  userProfile: {
    name: string;
  };
  onLogout: () => void; // Trigger logout confirmation modal
}

function HamburgerMenu({ isLoggedIn, onLogout }: HamburgerMenuProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { userProfile } = useAuth();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

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
    <div className="lg:hidden">
      <Hamburger toggled={isMenuOpen} toggle={toggleMenu} size={30} />

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 h-screen w-3/4 sm:w-1/2 bg-gray-100 text-black p-8 border-l border-gray-300 z-50 shadow-xl flex flex-col transition-all duration-300 ease-in-out"
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <Hamburger toggled={isMenuOpen} toggle={toggleMenu} size={30} />
          </div>

          {/* Navigation Links (Fixed at the Top) */}
          <ul className="flex flex-col space-y-5 text-lg flex-1">
            <li>
              <Link
                to="/venues"
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                onClick={closeMenu}
              >
                <BsHouses className="text-2xl" /> Venues
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                    onClick={closeMenu}
                  >
                    <CiLogin className="text-2xl" /> Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                    onClick={closeMenu}
                  >
                    <IoPersonAddOutline className="text-2xl" /> Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={`/profiles/${userProfile?.name}/bookings`}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                    onClick={closeMenu}
                  >
                    <MdOutlineEventAvailable className="text-2xl" /> Your
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/profiles/${userProfile?.name}`}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                    onClick={closeMenu}
                  >
                    <IoPersonCircleOutline className="text-2xl" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/profiles/${userProfile?.name}/venueManager`}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                    onClick={closeMenu}
                  >
                    <FaUserTie className="text-2xl" /> Venue Manager
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Logout Button */}
          {isLoggedIn && (
            <div className="mt-6">
              <button
                className="w-full flex items-center justify-center gap-3 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                onClick={onLogout}
              >
                <FaSignOutAlt className="text-2xl" />
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
