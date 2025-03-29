import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import Start from "./pages/Start";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogout";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Add routes here */}
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainsignup" element={<CaptainSignUp />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/userlogout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        ></Route>

        <Route path="/captainhome" element={
          <CaptainProtectedWrapper>
          <CaptainHome />
          </CaptainProtectedWrapper>
          }> </Route>
           <Route path='/captainlogout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </div>
  );
};

export default App;
