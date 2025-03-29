import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 flex justify-between flex-col  w-full '>
        <img className='w-20 ml-8 invert' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
             <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                <Link to={'/login'} className='flex justify-center items-center w-full bg-black text-white py-3  rounded mt-5'> Continue</Link>
             </div>
      </div>
    </div>
  )
}

export default Start
