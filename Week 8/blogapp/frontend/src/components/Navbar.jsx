import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/blog.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const user = useSelector((state) => state.login.user);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    token = localStorage.getItem("token");
    if (!user) {
      navigate("/");
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex justify-center items-center gap-4">
      <div className="text-4xl font-bold text-gray-800 hidden md:block">BlogApp</div>
      <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto mt-1" />
      </div>
      <div className="hidden sm:block sm:ml-6">
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-800 hover:text-gray-600">
            New Blogs
          </Link>
          {(user || token) && (
            <Link to="/myblogs" className="text-gray-800 hover:text-gray-600">
              My Blogs
            </Link>
          )}
          {(user || token) && (
            <Link
              to="/createblog"
              className="text-gray-800 hover:text-gray-600"
            >
              Create Blog
            </Link>
          )}
          {token && (
            <button
              onClick={signOut}
              className="text-gray-800 hover:text-gray-600"
            >
              Sign Out
            </button>
          )}
          {!token && (
            <Link to="/signin" className="text-gray-800 hover:text-gray-600">
              Sign In
            </Link>
          )}
          {!token && (
            <Link to="/signup" className="text-gray-800 hover:text-gray-600">
              Sign Up
            </Link>
          )}
        </div>
      </div>
      <button
        className="md:hidden text-gray-800 focus:outline-none"
        onClick={toggleDrawer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={drawerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 z-40 h-screen bg-white shadow-md w-64 p-4 transition-transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
      >
        <h5 className="text-2xl font-semibold text-gray-800">BlogApp</h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              {(user || token) && (
                <Link
                  to="/myblogs"
                  onClick={toggleDrawer}
                  className="flex items-center p-2 text-gray-800 hover:text-gray-600"
                >
                  <span className="ms-3 ">My Blogs</span>
                </Link>
              )}
            </li>
            {(user || token) && (
              <Link
                to="/createblog"
                onClick={toggleDrawer}
                className="flex items-center p-2 text-gray-800 hover:text-gray-600"
              >
                <span className="ms-3">Create Blog</span>
              </Link>
            )}
            <li>
              <Link to="/" onClick={toggleDrawer} className="flex items-center p-2 text-gray-800 hover:text-gray-600">
                <span className="ms-3 ">New Blogs</span>
              </Link>
            </li>
            <li></li>
            <li>
              {token && (
                <button
                  onClick={signOut}
                  className="flex items-center p-2 text-gray-800 hover:text-gray-600"
                >
                  <span className="ms-3">Sign Out</span>
                </button>
              )}
            </li>
            <li>
              {!token && (
                <Link
                  to="/signin"
                  onClick={toggleDrawer}
                  className="flex items-center p-2 text-gray-800 hover:text-gray-600"
                >
                  <span className="ms-3">Sign In</span>
                </Link>
              )}
            </li>
            <li>
              {!token && (
                <Link
                  to="/signup"
                  className="flex items-center p-2 text-gray-800 hover:text-gray-600"
                >
                  <span className="ms-3">Sign Up</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
