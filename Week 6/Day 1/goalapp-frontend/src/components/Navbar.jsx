import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });
  return (
    <>
      <nav
        className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
        role="navigation"
      >
        <a href="/" className="pl-8">
          GoalApp
        </a>
        <div className="px-4 cursor-pointer md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        {props.navbarMain ? (
          <div className="pr-8 md:block hidden">
            {/* <a href="/" className="p-4">Home</a> */}
            <Link to="/allgoals" className="p-4">
              All Goals
            </Link>
            <Link to="/creategoal" className="p-4">
              Create New Goal
            </Link>
            <Link
              to="/login"
              className="p-4"
              onClick={() => {
                localStorage.setItem("token", "");
                props.toggleNavbar()
              }}
            >
              SignOut
            </Link>
          </div>
        ) : (
          <div className="pr-8 md:block hidden">
            {/* <a href="/" className="p-4">Home</a> */}
            <Link to="/signup" className="p-4">
              Signup
            </Link>
            <Link to="/login" className="p-4">
              LogIn
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
