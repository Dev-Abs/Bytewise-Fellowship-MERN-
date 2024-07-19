import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handle submit')
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", json.token);
      navigate("/creategoal");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white p-16 rounded shadow-2xl w-1/3">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 font-bold">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-800 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-500"
              >
                Login{" "}
              </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
