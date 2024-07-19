import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-16 rounded shadow-2xl w-1/3">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
                <form action="">
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-800 font-bold">Email</label>
                        <input type="text" id="email" name="email" placeholder="Your Email" className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-800 font-bold">Password</label>
                        <input type="password" id="password" name="password" placeholder="Your Password" className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500" />
                    </div>
                    <Link to='/creategoal'><button type="submit" className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-500">Login </button> </Link>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login
