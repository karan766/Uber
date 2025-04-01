import React, { use } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import { useState } from "react";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";

const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vechilePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vechilePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vechilePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );
  useGSAP(
    function () {
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanelOpen]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div>
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="w-screen h-screen overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://th.bing.com/th/id/OIP.u3YYk8m9y48CnezXODfnYgHaHa?rs=1&pid=ImgDetMain"
          alt=""
        />
      </div>

      <div className=" flex flex-col justify-end h-screen overflow-hidden  absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(!panelOpen)}
            className="opacity-0 absolute top-5 right-6  text-2xl font-semibold"
          >
            <i className="ri-arrow-down-wide-line "></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 tect-base rounded-lg w-full mt-5"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
              }}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 tect-base rounded-lg w-full mt-3"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
              }}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white  h-0  ">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanelOpen}
          />
        </div>
      </div>
      <div
        ref={vechilePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmedRide
          setVehicleFound = {setVehicleFound}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
        />
      </div>
      <div ref={VehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={WaitingForDriverRef}   className="fixed w-full z-10 bottom-0   bg-white px-3 py-6 pt-12">
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
