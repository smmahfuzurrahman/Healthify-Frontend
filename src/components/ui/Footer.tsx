import { NavLink } from "react-router-dom";
import { FaFacebookSquare, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#EFF2F9] p-5 md:p-10">
      <div className="py-8 flex flex-col md:flex-row md:items-center justify-around space-y-5 md:space-y-0">
        {/* Logo and Short Description */}
        <div className="text-center md:text-left">
          <h1 className="text-gradient text-2xl md:text-3xl font-bold">
            HealthifyAI
          </h1>
          <p className="mt-2 italic text-gray-600">
            Empowering healthier lives with the intelligence of tomorrow, today.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="text-lg font-semibold">Explore</h4>
          <ul className="mt-2 space-y-1">
            <li>
              <NavLink to="/" className="text-gray-700 hover:text-blue-600">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-gray-700 hover:text-blue-600">
                Terms of Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth" className="text-gray-700 hover:text-blue-600">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-lg font-semibold">Follow us on:</h4>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FaFacebookSquare className="md:text-xl" aria-hidden="true" /> <p>Facebook</p>
            </li>
            <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FaLinkedin className="md:text-xl" aria-hidden="true" /> <p>LinkedIn</p>
            </li>
            <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FaSquareXTwitter className="md:text-xl" aria-hidden="true" /> <p>Twitter</p>
            </li>
            <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FaYoutube className="md:text-xl" aria-hidden="true" /> <p>YouTube</p>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-600 mt-5">
        &copy; 2024 HealthifyAI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
