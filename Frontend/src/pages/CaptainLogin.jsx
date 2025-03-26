import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-7 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
      <div>
        <img
          className="w-24 mb-10 "
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Enter password</h3>
            <input
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button
            className="bg-black text-white rounded font-semibold px-4 py-2 w-full text-lg transition-transform transform active:scale-95"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          New Here? <Link to="/captainsignup" className="text-blue-600">Register as a Captain</Link>
        </p>
      </div>
      <div className="mt-10">
        <Link
          to="/login"
          className="flex justify-center items-center bg-orange-600 text-white font-semibold rounded px-4 py-2 w-full text-lg transition-transform transform active:scale-95"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
