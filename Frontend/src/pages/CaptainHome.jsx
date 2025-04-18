import React from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { useState } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
          
  const [ridePopUpPanel, setridePopUpPanel] = useState(true)
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)


  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0%)",
        });
        
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
        
      }
    },
    [ridePopUpPanel]
  );
  

  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(0%)",
        });
        
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
        
      }
    },
    [confirmRidePopUpPanel]
  );
  
      
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captainhome"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src="https://th.bing.com/th/id/OIP.u3YYk8m9y48CnezXODfnYgHaHa?rs=1&pid=ImgDetMain"
          alt=""
        />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails/>
      </div>

       <div ref={ridePopUpPanelRef} className="fixed translate-y-full w-full z-10 bottom-0  bg-white px-3 py-10 pt-12">
           <RidePopUp setridePopUpPanel={setridePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
       </div>

       <div ref={confirmRidePopUpPanelRef} className="fixed translate-y-full w-full z-10 bottom-0  bg-white px-3 py-10 pt-12">
           <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopUpPanel} setridePopUpPanel={setridePopUpPanel} />
       </div>

    </div>
  );
};

export default CaptainHome;
