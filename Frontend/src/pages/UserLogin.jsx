// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const UserLogin = () => {
//    const [email, setemail] = useState("")
//    const [password, setpassword] = useState("")
//    const [userData, setuserData] = useState({})
//    const submitHandler = (e) => {
//      e.preventDefault()
//      setuserData({email:email, password:password})
     
//      setemail("")
//      setpassword("")
//    }

//   return (
//     <div className="p-7 flex flex-col justify-between h-screen">
//          <div>
//              <img className="w-18 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
//       <form onSubmit={(e) =>{submitHandler(e)} }>
//         <h3 className="text-lg font-medium mb-2">What's your email</h3>

//         <input
//          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg placeholder:text-base "
//           required 
//           value={email}
//           onChange={(e) => setemail(e.target.value)}
//           type="email"
//            placeholder="email@example.com" />

//         <h3 className="text-lg font-medium mb-2">Enter password</h3>

//         <input
//            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg placeholder:text-base "
//         required type="password"
//         value={password}
//         onChange={(e) => setpassword(e.target.value)}
//          placeholder="password" />

//         <button className="bg-[#111] text-white rounded font-semibold mb-3 placeholder:text-base px-4 py-2 w-full text-lg"
//         type="submit">Login</button>

//       </form>
//       <p className="text-center">New Here? <Link to="/signup" className="text-blue-600">Create new Account</Link></p>

//       </div>

//       <div>
//         <Link to="/captainlogin" className="flex justify-center items-center mb-5 bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

import React, { useState,useContext, use} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const {user, setUser} = useContext(UserDataContext)
  const navigate = useNavigate()


  const submitHandler = async(e) => {
    e.preventDefault();
    
    const userData={
      email:email,
      password:password
    }
    const response = await axios.post(`${
      import.meta.env.VITE_BASE_URL}/users/login`,userData)

      if(response.status === 200){
        const data = response.data
        setUser(data.user)
        localStorage.setItem("token", data.token)
        
        navigate("/home")
      }
    setUserData({ email: email, password: password });
    
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-7 max-w-md mx-auto md:max-w-lg lg:max-w-xl">
      <div>
        <img
          className="w-24 mb-10 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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
          New Here? <Link to="/signup" className="text-blue-600">Create new Account</Link>
        </p>
      </div>
      <div className="mt-10">
        <Link
          to="/captainlogin"
          className="flex justify-center items-center bg-green-600 text-white font-semibold rounded px-4 py-2 w-full text-lg transition-transform transform active:scale-95"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};


export default UserLogin;
