import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">BlogApp</h2>
            <p className="mt-2 text-gray-400">Your one-stop platform for insightful blogs.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.49v-9.294h-3.123v-3.622h3.123v-2.672c0-3.1 1.893-4.785 4.659-4.785 1.325 0 2.464.099 2.794.143v3.241l-1.918.001c-1.505 0-1.796.716-1.796 1.764v2.308h3.59l-.468 3.622h-3.123v9.294h6.116c.732 0 1.325-.592 1.325-1.324v-21.351c0-.733-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.556c-.883.392-1.832.656-2.828.775 1.014-.609 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.722 0-4.927 2.205-4.927 4.928 0 .386.043.761.127 1.122-4.094-.206-7.725-2.167-10.153-5.144-.424.728-.667 1.575-.667 2.475 0 1.71.87 3.222 2.188 4.105-.807-.026-1.566-.247-2.228-.616v.062c0 2.386 1.697 4.374 3.946 4.827-.414.112-.85.172-1.299.172-.317 0-.626-.03-.927-.086.626 1.955 2.444 3.377 4.6 3.416-1.684 1.32-3.809 2.106-6.115 2.106-.397 0-.79-.023-1.175-.069 2.182 1.4 4.768 2.218 7.548 2.218 9.054 0 14.004-7.504 14.004-14.004 0-.213-.005-.426-.014-.637.962-.694 1.796-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.565c0-1.328-.025-3.041-1.853-3.041-1.854 0-2.137 1.45-2.137 2.949v5.657h-3.554v-11.481h-3.554v11.481h-3.554v-11.481h3.554v1.569h.051c.497-.938 1.709-1.927 3.516-1.927 3.757 0 4.451 2.473 4.451 5.682v6.157zM5.337 7.433c-1.147 0-2.079-.933-2.079-2.084s.933-2.084 2.079-2.084 2.079.933 2.079 2.084-.932 2.084-2.079 2.084zM6.788 20.452h-2.902v-11.481h2.902v11.481zM22.225 0h-20.449c-.98 0-1.776.797-1.776 1.777v20.449c0 .98.797 1.776 1.776 1.776h20.449c.98 0 1.777-.797 1.777-1.776v-20.449c0-.98-.797-1.777-1.777-1.777z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
