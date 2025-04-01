import React from 'react'



const LocationSearchPanel = (props) => {
    
    // Sample array for location
    const locations = [
      "24B, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
      "22C, Near Malhotra's Cafe, Sheryians Coding School, Bhopal",
      "20B, Near Singhai's Cafe, Sheryians Coding School, Bhopal",
      "18A, Near Sharma's Cafe, Sheryians Coding School, Bhopal",
    ];
  
    return (
      <div>
        {/* This is just sample data */}
        {locations.map((elem, index) => (
          <div
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            key={index}
            className="flex gap-4 border-2 p-3  border-gray-50 active:border-black rounded-xl items-center my-2 justify-between"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        ))}
      </div>
    );
  };
  
  export default LocationSearchPanel;
  
