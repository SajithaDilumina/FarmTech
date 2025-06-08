import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const AppNavbar = () => {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [isToolDropdownOpen, setIsToolDropdownOpen] = useState(false);
  const [isFertilizerDropdownOpen, setIsFertilizerDropdownOpen] =
    useState(false);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const historyRef = useRef();
  const profileRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileOpen(false);
    navigate("/login");
  };

  const handleHistoryClick = () => {
    navigate("/HistoryPlantCount");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setHistoryOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the profile image URL from local storage or set a default one
  const profileImageUrl =
    localStorage.getItem("profileImage") || "default-profile.png";

  return (
    <nav className="bg-[#16423C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-[#E9EFEC] font-bold text-2xl">
              FarmTech
            </Link>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#C4DAD2] hover:text-white hover:bg-[#6A9C89] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white sm:hidden"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex space-x-4 items-center">
            {/* <Link to="/" className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg">Home</Link> */}

            {/* Tool Renting Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolDropdownOpen(!isToolDropdownOpen)}
                className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
              >
                Tool Renting
              </button>
              {isToolDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/rent"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => setIsToolDropdownOpen(false)}
                  >
                    Rent Tools
                  </Link>
                  <Link
                    to="/booking"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => setIsToolDropdownOpen(false)}
                  >
                    My Rentals
                  </Link>
                </div>
              )}
            </div>

            {/* Fertilizer Dropdown */}
            <div className="relative">
              <Link to="/order">
                <button className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg">
                  Fertilizer
                </button>
              </Link>
            </div>

            {/* Crop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)}
                className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
              >
                Crop
              </button>
              {isCropDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/yeildCard/FarmersView"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => setIsCropDropdownOpen(false)}
                  >
                    View Crops
                  </Link>
                  <Link
                    to="/yeildCard/allFarmerSelling"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => setIsCropDropdownOpen(false)}
                  >
                    My selling
                  </Link>
                </div>
              )}
            </div>

            {token && (
              <div className="relative" ref={historyRef}>
                <button
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg inline-flex items-center"
                >
                  Land Optimization
                  <svg
                    className="h-5 w-5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.04 1.08l-4.25 3.85a.75.75 0 01-1.04 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {historyOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="history-menu"
                    >
                      <Link
                        to="/PlantCount"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setHistoryOpen(false)}
                      >
                        Plant Count
                      </Link>
                      <Link
                        to="/HistoryPlantCount"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setHistoryOpen(false)}
                      >
                        Plant Count History
                      </Link>
                      <Link
                        to="/AllShops"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setHistoryOpen(false)}
                      >
                        All Shops
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {token ? (
              <div className="relative flex items-center" ref={profileRef}>
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="h-8 w-8 rounded-full mr-2 border-2 border-white cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)} // Toggle the dropdown on image click
                />
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 top-full">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="profile-menu"
                    >
                      <Link
                        to="/Profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/admin/addDimentions"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
