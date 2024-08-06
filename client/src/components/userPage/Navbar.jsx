import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCircleDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
// import { BiLogOut } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  return (
    <>
        <div className='flex w-full justify-between px-10 py-2 bg-white text-blue-800 items-center fixed top-0 z-30'>
            <div className='flex gap-2 items-center'>
                <BsGraphUpArrow className='text-2xl text-blue-800'/>
                <p className='text-2xl font-bold'>Revenue Distribution</p>
            </div>

            <div className='flex  gap-5 items-center justify-between'>
                <div className='flex gap-2 justify-start items-center px-5'>
                    <FaCircleDot className='text-green-400 text-2xl'/>
                    <p className='text-lg font-semibold'>Active</p>
                </div>
                <div className='flex gap-2 items-center px-5'>
                    <FiUser className='text-blue-800 text-2xl'/>
                    <p className='text-xl font-thin'>Sunirmal</p>
                    <MdOutlineLogout className='text-blue-800 text-2xl'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar