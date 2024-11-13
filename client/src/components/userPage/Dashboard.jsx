import React, { useContext, useEffect, useState } from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import UserContext from '../../context/UserContext';
import axios from 'axios';
import showToastMessage from '../toast/Toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../toast/animation/Spinner'

const Dashboard = () => {
  let navigate = useNavigate();
  const { user,token } = useContext(UserContext);
  const [loading,setLoading]=useState(false);
  const [totalChildren,setTotalChildren]=useState(10);
  const [firstLevelChildren,setFirstLevelChildren]=useState(5);
  const [totalCopyProportion,setTotalCopyProportion]=useState(20);
  
  
  const ifSuspendedOrInactive=()=>{
    if(user.activationStatus.suspended){
      navigate(`/user/suspended/${user._id}`,{
        state:user  //{suspentionRemarks : user.activationStatus.suspentionRemarks}
      });
      return false;
    }
    if(!user.activationStatus.active){
      navigate(`/user/activeAccount/${user._id}`)
      return false;
    }
    return true;
  }

  const getDashboardDetails = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getDashboardDetails/${user._id}`,
        config
      );
      console.log(data);
      if(data.success){
        setTotalChildren(data.totalChildren);
        setFirstLevelChildren(data.firstLevelChildren);
        setTotalCopyProportion(data.totalCopyProportion)
        setLoading(false);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    let temp = ifSuspendedOrInactive();
    if(temp) getDashboardDetails();

  }, []);
  return (
    <>
      <div className="w-3/4  h-screen flex flex-col mx-auto my-5 ">
        <div className='grid grid-cols-2 gap-5'>
          <div className='grid grid-rows-2 gap-5'>

            {/* invested amount */}
            <div className='flex flex-col p-5  justify-center bg-blue-600 text-white rounded-xl h-44 shadow-md'>
              <span className='flex text-lg font-thin pt-2'> Initial Investment </span>
              <div className='flex gap-2'>
                <p className='text-3xl font-extrabold text-left'> $ {100*(user.copyProportion)}</p>
              </div> 
              <p className='flex text-sm font-thin '><a target='_blank' rel='noopener noreferrer' href='https://my.octabroker.com/login/?back=%2F&fromFront=1' className='flex items-center gap-1 font-semibold pr-1 underline cursor-pointer'>Login to OctaFx <FaExternalLinkAlt/></a>  to get the current account balance</p> 
            </div>

            {/* wallet balaance */}
            <div className='flex flex-col p-5  justify-center bg-blue-600 text-white rounded-xl h-44 shadow-md'>
              <span className='flex text-lg font-thin pt-2'>Wallet Balance </span>
              <p className='text-3xl font-extrabold text-left'> $ {user.walletBalance}</p>
              <span className='flex gap-2 text-xs font-thin items-center'> <IoMdInformationCircleOutline className='text-xs font-thin text-left'/>Withdrawl Section is disabled now is </span>
            </div>
          </div>

          <div className='grid grid-rows-4 gap-2'>
            {/* total team business  */}
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600 shadow-md'>
              <p className='flex text-lg font-thin'>Total Team Business</p>
              <p className='flex items-center text-3xl font-extrabold'>{loading?<Spinner size={"large"}/>:
               <>$ {100*totalCopyProportion}</>}</p>
            </div>

            {/* next withdrawal date  */}
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600 shadow-md'>
              <p className='flex text-lg font-thin'>Next Withdrawl Date</p>
              <p className='flex text-lg font-thin text-yellow-600 items-center'>{loading?<Spinner size={"large"}/>:"Will be announced shortly"}</p>
            </div>

            {/* total children  */}
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600 shadow-md'>
              <p className='flex text-lg font-thin'>Number of Subordinates</p>
              <p className='flex text-3xl font-extrabold items-center'>{loading?<Spinner size={"large"}/> : totalChildren}</p>
            </div>

            {/* referrals  */}
            <div className='bg-white px-5 py-2 rounded-xl text-blue-600 shadow-md'>
              <p className='flex text-lg font-thin'>Total Referrals</p>
              <p className='flex text-3xl font-extrabold'>{loading?<Spinner size={"large"}/> : firstLevelChildren}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard