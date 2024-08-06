import React from 'react'
import Navbar from '../components/userPage/Navbar'
import Sidebar from '../components/userPage/Sidebar'
import { Outlet } from 'react-router-dom'

const UserHomePage = () => {
  return (
    <>
      <Navbar/>
      <div className='flex relative'>
        <Sidebar/>
        <div className='mt-12 w-full mr-[280] h-screen bg-blue-50 ' style={{marginRight:280}}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default UserHomePage