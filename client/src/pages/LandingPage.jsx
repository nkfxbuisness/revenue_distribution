import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  let navigate = useNavigate();
  const adminLogin = () =>{
    navigate("/admin");
  }
  const userLogin = () =>{
    navigate("/user");
  }
  return (
    <><div className='min-h-screen bg-blue-50 p-5'>
        <div className='h-12 w-full  flex justify-end gap-3'>
            <button className='py-1 px-3 bg-blue-700 text-white rounded-md h-fit' onClick={adminLogin}>Admin Login</button>
            <button className='py-1 px-3 bg-blue-700 text-white rounded-md h-fit' onClick={userLogin}>User Login</button>
        </div>
        <p className='text-blue-600 font-bold text-2xl '>Welcome to nkfxbusiness portal</p>
    </div></>
  )
}

export default LandingPage