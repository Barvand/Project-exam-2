import { Link } from "react-router-dom";

/**
 *
 * @returns {JSX.Element} - this just renders a JSX element with footer content.
 */
function Footer(): JSX.Element {
  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Logo and Branding */}
        <div className="mb-6 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-white">Holidaze</h1>
          <p className="text-lg mt-2">
            Your gateway to unforgettable vacations
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-6 lg:mb-0">
          <Link
            to="/about"
            className="footer-link text-lg transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="footer-link text-lg transition duration-300"
          >
            Services
          </Link>
          <Link
            to="/blog"
            className="footer-link text-lg transition duration-300"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="footer-link text-lg transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 mb-6 lg:mb-0">
          <a
            href="https://facebook.com"
            className="text-white hover:text-customPurple-200 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-square text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            className="text-white hover:text-customPurple-200 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter-square text-2xl" />
          </a>
          <a
            href="https://instagram.com"
            className="text-white hover:text-customPurple-200 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram-square text-2xl" />
          </a>
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
