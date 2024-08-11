import React, { useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCopy } from "react-icons/fa";

const Referral = () => {
  const [disclosure,setDisclosure]=useState(false);
  const copy = ()=>{
    const referralCode = document.getElementById('referralCode');
    console.log(referralCode.innerHTML)
    navigator.clipboard.writeText(referralCode.innerHTML);
    alert("coppied to clipboard")
  }
  return (
    <>
      <div className='flex flex-col w-4/5 p-5 mx-auto rounded-lg h-screen '>
        <p className='flex justify-center font-semibold text-2xl text-blue-600'>Refer Someone</p>
        {/* information  */}
        <Disclosure>
            <DisclosureButton className="group flex mt-4 items-center gap-2 bg-yellow-100 rounded-md" onClick={()=>setDisclosure(!disclosure)}>
              <span className='flex py-3 pl-3 items-center gap-4 justify-center text-lg font-semibold'>
                <IoMdInformationCircleOutline className='text-xl'/>
                <p>Important Information</p>
              </span>
              {disclosure?
              <IoIosArrowUp className="" />:
              <IoIosArrowDown className="" />}
            </DisclosureButton>

            <DisclosurePanel className="text-start font-light pl-5 pb-3 bg-yellow-100 rounded-b-md">
                <ul className="list-disc text-sm">
                  <li>Refer someone to earn comission</li>
                  <li>Comission will be added based on the profit earned by your subordinates upto level 20</li>
                  <li>Earned comission will be conflicted in your wallet and can be withdrawl on regular interval</li>
                  <li>The immediate subordinates will be conflicted below in this page , and the detailed hirearchy is in the Generalogy page</li>

                </ul>
            </DisclosurePanel>
        </Disclosure>
        
        {/* refeffal code  */}
        <div className='flex w-full mt-5'>
          <span className='flex font-light text-2xl text-blue-600 items-center pr-5'>Your refferal code</span>
          <span className='p-3 bg-white text-blue-600 font-bold text-2xl rounded-l-lg'>
            <code id='referralCode'>sunirmal6290</code>
          </span>
          <span className='p-3 bg-blue-600 text-white font-bold text-2xl cursor-pointer rounded-r-lg' onClick={copy}>
            <FaCopy className='text-4xl'/>
          </span>
        </div>

         <p className='text-2xl text-blue-600 font-light text-left pt-8 pb-1'>Your Immediate Subordinates</p>       
        {/* table  */}
        <div className="w-full text-left rounded-md mt-3">
          <div className="table w-full">
            {/* table header  */}
            <div className="table-header-group bg-blue-600 text-white font-semibold w-full">
              <div class="table-row ">
                <div class="table-cell text-center py-2 px-2 w-10">No</div>
                <div class="table-cell text-center py-2 px-2 border-l-2 border-white ">
                  Name
                </div>
                <div class="table-cell text-center py-2 px-2 border-l-2 border-white ">
                  Email 
                </div>
                <div class="table-cell text-center py-2 px-2 border-l-2 border-white ">
                  Joined On
                </div>
              </div>
            </div>

            <div className="table-row-group">
              {/* table row  */}
              <div className="table-row bg-white text-sm font-light ">
                <div className="table-cell text-center py-2 px-2  border-b-2 border-blue-50 w-10">
                  1
                </div>
                <div className="table-cell text-left py-2 px-2  border-b-2 border-blue-50 font-semibold text-green-500">
                  Sunirmal Sasmal
                </div>
                <div className="table-cell text-left py-2 px-2  border-b-2 border-blue-50 ">
                  sunirmal@email.com
                </div>
                <div className="table-cell text-center justify-center py-2 px-2  border-b-2 border-blue-50">
                    6th Aug,2024
                </div>
              </div>
              {/* table row  */}
              <div className="table-row bg-white text-sm font-light ">
                <div className="table-cell text-center py-2 px-2  border-b-2 border-blue-50 w-10">
                  1
                </div>
                <div className="table-cell text-left py-2 px-2  border-b-2 border-blue-50 font-semibold text-green-500">
                  Sunirmal Sasmal
                </div>
                <div className="table-cell text-left py-2 px-2  border-b-2 border-blue-50 ">
                  sunirmal@email.com
                </div>
                <div className="table-cell text-center justify-center py-2 px-2  border-b-2 border-blue-50">
                    6th Aug,2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Referral