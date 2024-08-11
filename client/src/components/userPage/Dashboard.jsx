import React from 'react'
import { HiOutlineArrowSmUp } from "react-icons/hi";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Dashboard = () => {
  return (
    <>
      <div className="w-3/4  h-screen flex flex-col mx-auto my-5 ">
        <div className='grid grid-cols-2 gap-5'>
          <div className='grid grid-rows-2 gap-5'>
            <div className='flex flex-col p-5  justify-center bg-blue-600 text-white rounded-xl h-44'>
              <span className='flex text-sm font-thin '> Invested Amount On Octa <b className='pl-3'>$ 3000</b></span>
              <span className='flex text-lg font-thin pt-2'> Current Octa Account Balance </span>
              <div className='flex gap-2'>
                <p className='text-3xl font-extrabold text-left'> $ 5056.62</p>
                <span className='text-lg  pt-2 text-green-400 font-bold' >32.28 %</span>
                <HiOutlineArrowSmUp className='text-3xl  pt-2 mb-0 text-green-400 font-bold' />
              </div>  
            </div>
            <div className='flex flex-col p-5  justify-center bg-blue-600 text-white rounded-xl h-44'>
              <span className='flex text-lg font-thin pt-2'>Wallet Balance </span>
              <p className='text-3xl font-extrabold text-left'> $ 5056.62</p>
              <span className='flex gap-2 text-xs font-thin items-center'> <IoMdInformationCircleOutline className='text-xs font-thin text-left'/>Withdrawl Section is disabled now is </span>
            </div>
          </div>
          <div className='grid grid-rows-4 gap-2'>
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600'>
              <p className='flex text-lg font-thin'>Total Team Business</p>
              <p className='flex text-3xl font-extrabold'>$ 198</p>
            </div>
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600'>
              <p className='flex text-lg font-thin'>Next Withdrawl Date</p>
              <p className='flex text-lg font-thin text-yellow-600'>Will be announced shortly</p>
            </div>
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600'>
              <p className='flex text-lg font-thin'>Number of Subordinates</p>
              <p className='flex text-3xl font-extrabold'>17</p>
            </div>
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600'>
              <p className='flex text-lg font-thin'>Total Referrals</p>
              <p className='flex text-3xl font-extrabold'>9</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard