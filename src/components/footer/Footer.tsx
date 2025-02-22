import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa"; // Import React Icons

/** This component renders the footer.
 * @component
 * @returns {JSX.Element} - this just renders a JSX element with footer content.
 */
function Footer(): JSX.Element {
  const { userProfile } = useAuth();

  // Ensure there's a fallback in case userProfile is null
  const userName = userProfile?.name || "Guest";

  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Logo and Branding */}
        <div className="mb-6 lg:mb-0 text-center lg:text-left">
          {/* Logo */}
          <Link to="/" className="flex gap-2">
            <img src="/Holidaze-logo.svg" alt="Holidaze-Logo" />
          </Link>
          <p className="text-lg mt-2">
            Your gateway to unforgettable vacations
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-6 lg:mb-0">
          <Link
            to="/venues"
            className="footer-link text-lg transition duration-300"
          >
            Our Newest Venues
          </Link>

          <Link
            to={`/profiles/${userName}`}
            className="footer-link text-lg transition duration-300"
          >
            Your Profile
          </Link>
          <Link
            to={`/profiles/${userName}/bookings`}
            className="footer-link text-lg transition duration-300"
          >
            Your Bookings
          </Link>

          <Link to="#" className="footer-link text-lg transition duration-300">
            Contact
          </Link>
        </div>

        {/* ✅ Social Media Icons with React Icons */}
        <div className="flex items-center gap-4 mb-6 lg:mb-0">
          <Link
            to="https://facebook.com"
            className="text-white hover:text-customPurple-200 transition duration-300 text-3xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only"> Facebook </span>
            <FaFacebookSquare />
          </Link>
          <Link
            to="https://twitter.com"
            className="text-white hover:text-customPurple-200 transition duration-300 text-3xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only"> Twitter/X </span>
            <FaTwitterSquare />
          </Link>
          <Link
            to="https://instagram.com"
            className="text-white hover:text-customPurple-200 transition duration-300 text-3xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only"> Instagram </span>
            <FaInstagramSquare />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm">
        <p>© 2025 Holidaze. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
