import React, { useContext, useEffect, useState } from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import UserContext from '../../context/UserContext';
import showToastMessage from '../../util/toast/Toast';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Withdraw = ({ifSuspendedOrInactive}) => {
  let navigate = useNavigate();
  const {user,token} = useContext(UserContext);
  // const ifSuspendedOrInactive=()=>{
  //   if(user.activationStatus.suspended){
  //     navigate(`/user/suspended/${user._id}`);
  //     return false;
  //   }
  //   if(!user.activationStatus.active){
  //     navigate(`/user/activeAccount/${user._id}`)
  //     return false;
  //   }
  //   return true;
  // }
  const [disclosure,setDisclosure]=useState(false);
  const [amount,setAmount]= useState("");
  const [inputFieldDisabled,setInputFieldDisabled]=useState(false);
  const [walletBallence,setWalletBalance]=useState(0);
  const [withdrawlSectionActive,setWithdrawlSectionActive]=useState(false);
  const getPageDetails = async()=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getWithdrawlPageData/${user._id}`,
        config
      );
      console.log(data);
      if(data.succcess){
        setWithdrawlSectionActive(data.acceptingWithdrawalRequests)
        setInputFieldDisabled(data.withdrawalRequestSubmitted);
        setWalletBalance(data.walletBalance);
        if(data.withdrawalRequestSubmitted){
          showToastMessage("info","withdrawal request already submitted");
        }
        return
      }
      showToastMessage("error",data.message);

    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  }
  const submit = async()=>{
    if(amount>walletBallence){
      showToastMessage("warn","insufficient balance !");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/user/withdrawalRequest/${user._id}`,
        {
          amount
        },
        config
      );
      if(data.success){
        console.log(data.data);
        setInputFieldDisabled(true);
        showToastMessage("success",data.message);
        return
      }
      showToastMessage("error",data.message);

    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  }

  useEffect(() => {
    let temp =ifSuspendedOrInactive();
    if(temp) getPageDetails();
  }, [])
  

  return (
    <>
      <div className={`w-3/4 min-h-screen h-full flex flex-col mx-auto ${withdrawlSectionActive?"":"items-center"} `}>
        {!withdrawlSectionActive?
        <div className='flex flex-col w-4/5 my-auto  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg h-fit'>
          <span className='flex py-3 items-center gap-4 justify-center text-xl font-semibold border-b-2 border-yellow-600'>
            <IoMdInformationCircleOutline className='text-2xl'/>
            <p>Admin is not accepting withdrawl request now !</p>
          </span>
          <p className='text-left pt-3 px-2'>Generally withdrawl section is enabled for accepting requests on the last Saturday , Sunday of any month . If the schedule changes for any reason you will be notified . For any farther information consult your Referrer </p>
        </div>:
        
        
        <div className='flex flex-col w-4/5 my-auto   p-5 text-yellow-600 mx-auto rounded-lg h-fit '>
          <p className='flex justify-center font-bold text-3xl text-blue-600 py-5'> Request for Comission Withdrawl</p>

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

          
          <div className="flex flex-col w-full text-left gap-3 mt-5">
            <div className='flex gap-2 items-center'>
            <label htmlFor="withdrawlAmount" className="font-bold text-lg text-blue-600">
              Wallet Balance
            </label>
            <div className='bg-green-200 text-green-600 text-xl font-bold px-8 py-1 rounded-md'>$ {walletBallence}</div>

            </div>
            <label htmlFor="withdrawlAmount" className="font-bold text-lg text-blue-600">
              Amount
            </label>
            <div className='flex w-full'>
              <span className='flex items-center justify-center bg-blue-600 text-white w-10 rounded-l-md'><AiOutlineDollarCircle className='text-3xl'/></span>
              <input
                type="number"
                id="withdrawlAmount"
                placeholder='Enter amount you want to withdraw'
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                disabled={inputFieldDisabled}
                className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full shadow-md"
              />
            </div>
            <span className='text-blue-600 font-thin text-xs text-left'>Entered amount is in US Dollars</span>
            <button className={`p-2 bg-blue-600 text-white text-sm font-semibold w-fit mt-3 rounded-md ${inputFieldDisabled?"opacity-50 cursor-default":""}`} onClick={submit} disabled={inputFieldDisabled}>Submit Withdrawl Request</button>
          </div>
        </div>}
        
        
      </div>
    </>
  )
}

export default Withdraw