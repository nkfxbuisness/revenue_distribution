import React, { useState } from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Withdraw = () => {
  
  const [disclosure,setDisclosure]=useState(false);
  const [withdrawlSectionActive,setWithdrawlSectionActive]=useState(true);

  return (
    <>
      <div className="w-3/4  h-full flex flex-col mx-auto  ">
        {!withdrawlSectionActive?
        <div className='flex flex-col w-4/5 my-auto  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg h-fit'>
          <span className='flex py-3 items-center gap-4 justify-center text-xl font-semibold border-b-2 border-yellow-600'>
            <IoMdInformationCircleOutline className='text-2xl'/>
            <p>Admin is not accepting withdrawl request now !</p>
          </span>
          <p className='text-left pt-3 px-2'>Generally withdrawl section is enabled for accepting requests on the last Saturday , Sunday of any month . If the schedule changes for any reason you will be notified . For any farther information consult your Referrer </p>
        </div>:
        
        
        <div className='flex flex-col w-4/5 my-auto   p-5 text-yellow-600 mx-auto rounded-lg h-fit '>
          <p className='flex justify-center font-semibold text-2xl text-blue-600'>Wallet Balance Withdrawl Request</p>

          {/* instructions  */}
          <Disclosure>
            <DisclosureButton className="group flex mt-4 items-center gap-2 bg-yellow-100 rounded-md" onClick={()=>setDisclosure(!disclosure)}>
              <span className='flex py-3 pl-3 items-center gap-4 justify-center text-lg font-semibold'>
                <IoMdInformationCircleOutline className='text-xl'/>
                <p>Read the Instructions before proceeding farther</p>
              </span>
              {disclosure?
              <IoIosArrowUp className="" />:
              <IoIosArrowDown className="" />}
            </DisclosureButton>

            <DisclosurePanel className="text-start font-light pl-5 pb-3 bg-yellow-100 rounded-b-md">
                <ul className="list-disc text-sm">
                  <li>Your wallet balance is the comission you earned , Don't confuse it with the deposited amount in octa</li>
                  <li>Your Entered amount must be in US Dollars , The amount will be converted then into USD and sent to your bank account you have already provided </li>
                  <li>The USD value will be considered of the date of disversal and conversition , transaction charges will be charged if applicable</li>
                  <li>It will be a bank to bank tranction and also subject to verification , might take some time.The status will be reflected in your portal with transuction proof</li>
                  <li>For any farther information consult your Referrer</li>
                </ul>
            </DisclosurePanel>
          </Disclosure>

          {/* mobile  */}
          <div className="flex flex-col w-full text-left gap-1 mt-4">
            <label htmlFor="withdrawlAmount" className="font-bold text-lg text-blue-600">
              Amount
            </label>
            <div className='flex w-full'>
              <span className='flex items-center justify-center bg-blue-600 text-white w-10 rounded-l-md'><AiOutlineDollarCircle className='text-3xl'/></span>
              <input
                type="number"
                id="withdrawlAmount"
                name="withdrawlAmount"
                placeholder='Enter amount you want to withdraw'
                // value={userData["mobile"] || ""}
                // onChange={handleChange}
                // disabled
                className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full"
              />
            </div>
            <span className='text-blue-600 font-thin text-xs text-left'>Entered amount must be in US Dollars</span>
            <button className='p-2 bg-blue-600 text-white text-sm font-semibold w-fit mt-3 rounded-md'>Send Withdrawl Request</button>
          </div>
        </div>}
        
        
      </div>
    </>
  )
}

export default Withdraw