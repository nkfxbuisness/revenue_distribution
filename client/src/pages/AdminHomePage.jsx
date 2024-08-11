import React from 'react'
import Navbar from '../components/adminPage/Navbar'
import Sidebar from '../components/adminPage/Sidebar'
import {Outlet} from 'react-router-dom'

const AdminHomePage = () => {
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

export default AdminHomePage