import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  
  const submitHandler = async (e) => {
    e.preventDefault();
  
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );
  
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captainhome");
  
        // Clear form
        setEmail("");
        setfirstName("");
        setlastName("");
        setPassword("");
        setVehicleColor("");
        setVehiclePlate("");
        setVehicleCapacity("");
        setVehicleType("");
      }
    } catch (error) {
      if (error.response) {
        
        alert(`Error: ${error.response.data.message || "Invalid input"}`);
      } else {
       
        alert("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex flex-col justify-between min-h-screen p-7 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
      <div>
        <img
          className="w-24 mb-6 "
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

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
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
