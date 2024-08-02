import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  let token = localStorage.getItem('token');
  const navigate = useNavigate();

  const user = useSelector((state) => state.login.user);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    token = localStorage.getItem('token');
    if (!user) {
      navigate('/');
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };


  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">BlogApp</div>
      {/* <div className="space-x-4 hidden lg:flex">
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">About</a>
        <a href="#" className="hover:text-gray-300">Services</a>
        <a href="#" className="hover:text-gray-300">Contact</a>
      </div> */}
                  <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to= '/' className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600">New Blogs</Link>
                {(user || token )&& <Link to="/myblogs" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600">My Blogs</Link>}
                {(user || token )&& <Link to= '/createblog' className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Create Blog</Link>}
                {token && <button onClick={signOut} className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Sign Out</button>}
                {(!token )&& <Link to= '/signin' className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Sign In</Link>}
                {(!token )&& <Link to= '/signup' className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Sign Up</Link>}
            
              </div>
            </div>
      <button className="md:hidden text-white focus:outline-none" onClick={toggleDrawer}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={drawerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
        </svg>
      </button>
      
      <div className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-gradient-to-l from-purple-300 via-purple-400 to-purple-500 shadow-lg w-64`} tabIndex="-1">
        <h5 className="text-xl font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 ">BlogApp</h5>
        <button type="button" onClick={toggleDrawer} className="text-gray-400 bg-transparent hover:bg-purple-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1" />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
          <li>
              {(user || token )&& <Link to='/myblogs' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-400 dark:hover:bg-gray-700 group">
                <span className="ms-3 ">My Blogs</span>
              </Link> }
            </li>
            {(user || token) && <Link to= '/createblog' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-400 dark:hover:bg-gray-700 group">
                <span className="ms-3">Create Blog</span>
              </Link>
}
            <li>
              <Link to='/' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-400 dark:hover:bg-gray-700 group">
                <span className="ms-3 ">New Blogs</span>
              </Link>
            </li>
            <li>
            </li>
            <li>
            {(!token) && <Link to="/signin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-400 dark:hover:bg-gray-700 group">
                
                <span className="ms-3">Sign In</span>
              </Link>}
            </li>
            <li>
            {(!token )&& <Link to="/signup" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-400 dark:hover:bg-gray-700 group">
                <span className="ms-3">Sign Up</span>
              </Link>
}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
