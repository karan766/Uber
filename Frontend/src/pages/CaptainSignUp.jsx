import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainSignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ username:{firstName:firstName, lastName:lastName}, email: email, password: password });
    
    setEmail("");
    setPassword("");
    setfirstName("");
    setlastName("");
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
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5 ">
            <input
              className="bg-gray-200 rounded px-4 py-2 border  text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black w-38"
              required
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              type="text"
              placeholder="Firstname"
            />
          <input
            className="bg-gray-200 rounded px-4 py-2 border text-base placeholder:text-sm focus:outline-none focus:ring-2 w-38 focus:ring-black"
            required
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            type="text"
            placeholder="Lastname"
          />
          </div>

          <div>
            <h3 className="text-base font-medium mb-2">What's your email</h3>
            <input
              className="bg-gray-200 rounded px-4 py-2  border w-full text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <h3 className="text-base font-medium mb-2">Enter password</h3>
            <input
              className="bg-gray-200 rounded px-4 py-2 border w-full mb-5 text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
            Create Account
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account{" "}
          <Link to="/captainlogin" className="text-blue-600">
           Login
          </Link>
        </p>
      </div>
      <div className="mt-10">
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  );
};

export default CaptainSignUp
