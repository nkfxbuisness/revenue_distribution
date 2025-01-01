import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { LuRefreshCw } from "react-icons/lu";
import UserContext from "../../context/UserContext";
import axios from "axios";
import showToastMessage from "../../util/toast/Toast";
import Spinner from "../../util/animation/Spinner";
import PulseLoader from "../../util/animation/PulseLoader";

const Rewards = ({ifSuspendedOrInactive}) => {
  const { user, token } = useContext(UserContext);
  const [claimed,setClaimed] = useState(user.rewards);
  const [totalBusiness,setTotalBusiness]=useState(0);
  const [loading,setLoading] = useState(false);

  const [claimStatus, setClaimStatus] = useState([
    {
      milestone: 1,
      reward: "$20",
      award: "Full Day Proffessional Program",
      business: 5000,
      lower: 0,
      upper: 5000,
      range: "0-5000",
      subtract: 0,
      claimed: false,
    },
    {
      milestone: 2,
      reward: "$40",
      award: "Dairy & Pen",
      business: 5000,
      lower: 5000,
      upper: 10000,
      range: "5000-10000",
      subtract: 5000,
      claimed: false,
    },
    {
      milestone: 3,
      reward: "$80",
      award: "Lather Bag",
      business: 5000,
      lower: 10000,
      upper: 15000,
      range: "10000-15000",
      subtract: 10000,
      claimed: false,
    },
    {
      milestone: 4,
      reward: "$120",
      award: "Trip 2N 3D",
      business: 15000,
      lower: 15000,
      upper: 30000,
      range: "15000-30000",
      subtract: 15000,
      claimed: false,
    },
    {
      milestone: 5,
      reward: "$150",
      award: "Tab",
      business: 20000,
      lower: 30000,
      upper: 50000,
      range: "30000-50000",
      subtract: 30000,
      claimed: false,
    },
    {
      milestone: 6,
      reward: "$200",
      award: "National Trip 4N 5D",
      business: 50000,
      lower: 50000,
      upper: 100000,
      range: "50000-100000",
      subtract: 50000,
      claimed: false,
    },
    {
      milestone: 7,
      reward: "$500",
      award: "International Trip 4N 5D",
      business: 450000,
      lower: 50000,
      upper: 500000,
      range: "50000-500000",
      subtract: 50000,
      claimed: false,
    },
    {
      milestone: 8,
      reward: "$1000",
      award: "Car - Hachback",
      business: 500000,
      lower: 500000,
      upper: 1000000,
      range: "500000-1000000",
      subtract: 500000,
      claimed: false,
    },
    {
      milestone: 9,
      reward: "$1500",
      award: "Car - Sedan/SUV",
      business: 4000000,
      lower: 1000000,
      upper: 5000000,
      range: "1000000-5000000",
      subtract: 1000000,
      claimed: false,
    },
    {
      milestone: 10,
      reward: "$2000",
      award: "Flat",
      business: 5000000,
      lower: 5000000,
      upper: 10000000,
      range: "5000000-10000000",
      subtract: 500000,
      claimed: false,
    },
    {
      milestone: 11,
      reward: "Board Member",
      award: "Profit Share",
      business: 10000000,
      lower: 10000000,
      upper: 20000000,
      range: "10000000-20000000",
      subtract: 10000000,
      claimed: false,
    },
  ]);
  
  const updateMilestone = (milestoneIndex) => {
    setClaimed((prevClaimed) => 
      prevClaimed.map((reward, index) => 
        index === milestoneIndex -1
          ? { ...reward, rewardClaimed: true } // Update this milestone
          : reward // Keep other milestones unchanged
      )
    );
  };

  const getTotalBusiness = async()=>{
    setLoading(true)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getTotalBusiness/${user._id}`,
        config
      );
      console.log(data);
      if(data.success){
        setLoading(false);
        setTotalBusiness(data.totalCopyProportion*100);
      }else{
        setLoading(false);
        showToastMessage("error",data.message)
      }
    } catch (error) {
      setLoading(false);
      showToastMessage("error", `${error}`);
    }
  }

  const submitClaim = async(milestone)=>{
    updateMilestone(milestone);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/user/claimReward/${user._id}`,
        {
          userName:user.name,
          milestone:milestone
        },
        config
      );
      console.log(data);
      if(data.success){
        showToastMessage("success",data.message)
      }else{
        showToastMessage("error",data.message)
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  }

  const business = 40000;
  useEffect(() => {
    let temp = ifSuspendedOrInactive();
    if (temp) getTotalBusiness();
  }, [])
  

  return (
    <>
      <div className="flex flex-col gap-2 px-5 mt-5 pb-10">

        {/* heading  */}
        <p className="flex justify-center gap-2 items-center font-bold text-3xl text-blue-600 py-4">
          Rewards {loading?<Spinner size={"large"} /> :""}
        </p>

        {/* total business  */}
        <p className="flex justify-center gap-2 items-center font-bold text-xl text-blue-600 pb-2">
          Total Business {loading?"" : <span className="text-green-600">${totalBusiness}</span> }
        </p>

        {/* table header  */}
            <div className="flex items-center gap-2 bg-blue-600 rounded-md w-full h-full border-b-2 border-blue-600 py-2">
              <div className="w-8 text-white font-thin">
                MS
              </div>
              <div className="w-2/12 text-white font-thin border-l-2 border-white">
                Range
              </div>
              <div className="w-5/12 text-white font-thin border-l-2 border-white">
                Progress
              </div>
              
              <div className="w-1/12 text-white font-thin border-l-2 border-white">
                Reward
              </div>
              <div className="w-3/12 text-white font-thin  border-l-2 border-white">
                Award
              </div>
              <div className="w-1/12 text-white font-thin  border-l-2 border-white">
                Claim
              </div>
              

            </div>
   
        {loading?<PulseLoader repeat={5}/> :<>
        {/* claims  */}
        {claimStatus.map((claim, index) => (
          <div className="flex items-center gap-2 bg-blue-600 rounded-md h-10 shadow-md">
            <div className="flex items-center justify-center bg-blue-600 rounded-l-md w-8 text-white font-semibold">
              {index + 1}
            </div>
            <div className="flex items-center gap-2 bg-white rounded-md w-full h-full border-b-2 border-blue-600">
              <div className="w-2/12 text-blue-600 font-semibold">
                {claim.range}
              </div>
              <ProgressBar
                lower={claim.lower}
                upper={claim.upper}
                range={claim.business}
                business={totalBusiness}
              />
              <div className="w-1/12 text-blue-600 font-semibold">
                {claim.reward}
              </div>
              <div className="w-3/12 text-blue-600 font-thin text-wrap">
                {claim.award}
              </div>
              <div className="w-1/12">
                {totalBusiness>=claim.upper ? (
                  <button
                  className={` px-2 py-1 bg-blue-600 text-white font-semibold rounded-md ${claimed[index].rewardClaimed?"cursor-not-allowed  opacity-80":""}`}
                  disabled={claimed[index].rewardClaimed} onClick={()=>submitClaim(claim.milestone)}
                  >
                    {claimed[index].rewardClaimed?<>
                      {claimed[index].rewardSettled?"Settled":"Claimed"}
                    </>:"Claim"}
                  </button>
                ) : claim.upper>totalBusiness && totalBusiness>claim.lower ? (
                  <button
                  className={` px-2 py-1 bg-blue-600 text-white font-semibold rounded-md opacity-70`}
                  disabled={true}
                  >
                    Claim
                  </button>
                ) : totalBusiness<=claim.lower ? (
                  <button
                  className={` px-2 py-1 bg-blue-600 text-white font-semibold rounded-md opacity-40`}
                  disabled={true}
                  >
                    Claim
                  </button>
                ) : ""
              }
              </div>
            </div>
          </div>
        ))}
        </>}
      </div>
    </>
  );
};

export default Rewards;
