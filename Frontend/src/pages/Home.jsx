import React from "react";

const Home = () => {

  const submitHandler = (e) => {
    e.preventDefault();
    const pickupLocation = e.target[0].value;
    const dropoffLocation = e.target[1].value;
    const date = e.target[2].value;
    const time = e.target[3].value;
    console.log(pickupLocation, dropoffLocation, date, time);
  };
  return (
    <div>
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="w-screen h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
      </div>

      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white">
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[83%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 tect-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 tect-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div className=" bg-red-500 h-0  "></div>
      </div>
    </div>
  );
};

export default Home;
