import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/AdminContext";
import showToastMessage from "../toast/Toast";
import getFormattedDate from "../toast/getFormattedDate";
import PulseLoader from "../toast/animation/PulseLoader";
import Spinner from "../toast/animation/Spinner";

const ClaimRewards = () => {
  const [loading1,setLoading1] = useState(false);
  const [loading2,setLoading2] = useState(false);
  const [loading3,setLoading3] = useState(false);
  const { token } = useContext(AdminContext);
  const [claims, setClaims] = useState([]);
  console.log(claims);
  
  const [selectedClaim, setSelectedClaim] = useState("");
  const [selectedClaimDetails, setSelectedClaimDetails] = useState("");

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

  const deleteClaim = (claimToDelete) => {
    setClaims((prevClaims) =>
      prevClaims.filter((claim) => claim._id !== claimToDelete._id)
    );
  };
  const getAllClaims = async () => {
    setLoading1(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/getAllClaims`,
        config
      );
      // console.log(data.data);

      if (data.success) {
        setClaims(data.data);
        setLoading1(false)
        // showToastMessage("success", "yes");
      } else {
        setLoading1(false)
        showToastMessage("error", data.message);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading1(false)
    }
  };
  const getUserDetailsForClaim = async(claim)=>{
    setLoading2(true);
    setSelectedClaim(claim);
    const id = claim.user;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/getUserDetailsForClaim/${id}`,
        config
      );
      console.log(data.data);

      if (data.success) {
        setSelectedClaimDetails(data.data);
        setLoading2(false);
        // showToastMessage("success", "yes");
      } else {
        showToastMessage("error", data.message);
        setLoading2(false);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading2(false);
    }
  }
  const settleAClaim = async(claim) =>{
    setLoading3(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/settleAClaim/${claim._id}`,
        config
      );
      console.log(data);

      if (data.success) {
        setSelectedClaim("");
        deleteClaim(claim);
        setLoading3(false);
      } else {
        showToastMessage("error", data.message);
        setLoading3(false);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading3(false);
    }
  }

  useEffect(() => {
    getAllClaims();
  }, []);

  return (
    <>
      <div className="flex min-h-screen h-full justify-center items-center gap-5 ml-2 ">
        <div className="w-1/2 flex flex-col gap-2 px-8 bg-green-100 h-5/6 overflow-y-auto justify-center">
          <p className="flex justify-center font-bold text-2xl  text-blue-600 py-5">
            Claims
          </p>
          {loading1?<PulseLoader repeat={5}/> :
          <div className="flex flex-col gap-2">
            {claims.map((claim, index) => (
              <div
                className={`flex px-3 py-2 text-sm w-full ${claim==selectedClaim?"bg-blue-600  text-white":"bg-white"} text-center font-semibold rounded-md items-center text-wrap shadow-md cursor-pointer`}
                key={index}
                onClick={() => getUserDetailsForClaim(claim)}
              >
                <div class=" text-center px-2  w-1/12">{index + 1}</div>
                <div class=" text-center px-2  w-4/12">{claim.name}</div>
                <div class=" text-center px-2  w-3/12">
                  Milestone {claim.milestone}
                </div>
                <div class=" text-center px-2  w-4/12">
                  {getFormattedDate(claim.createdAt)}
                </div>
              </div>
            ))}
          </div> }
        </div>

        <div className="text-2xl text-blue-600 font-bold w-1/2 mr-4 h-5/6 bg-blue-100 py-5 px-5 rounded-lg overflow-y-auto flex flex-col items-center justify-center">
          <p className="flex justify-center font-bold text-2xl text-blue-600 py-5 gap-2 items-center">
            Settle a claim {loading2?<Spinner size={"large"}/>:""}
          </p>
          {loading2?"":<>
          {selectedClaim == "" ? (
            ""
          ) : (
            <div className="flex flex-col justify-center w-full  bg-white py-6 gap-4 rounded-xl shadow-md">
              <div className="flex justify-center gap-3">
                <p className="text-2xl font-semibold ">{selectedClaim.name}</p>
                <span className="bg-green-600 text-white font-thin py-1 px-3 rounded-2xl text-base">
                  Active
                </span>
              </div>
              <p className="font-semibold text-xl">Total Business : $ {selectedClaimDetails.totalCopyProportion*100}</p>

              <div className="flex items-center justify-center text-base font-normal bg-blue-50 mx-3 px-3 py-2 rounded-xl">
                <div className="w-3/12 flex flex-col">
                  <p className="font-semibold">Milestone {selectedClaim.milestone}</p>
                  <p>{claimStatus[selectedClaim.milestone - 1].range}</p>
                </div>
                <div className="w-3/12 flex flex-col">
                  <p className="font-semibold">Reward</p>
                  <p>{claimStatus[selectedClaim.milestone - 1].reward}</p>
                </div>
                <div className="w-6/12 flex flex-col">
                  <p className="font-semibold">Award</p>
                  <p>{claimStatus[selectedClaim.milestone - 1].award}</p>
                </div>
              </div>
              <div className="flex font-normal text-base items-center bg-blue-50 mx-3 px-3 py-2 rounded-xl">
                <p className="w-1/2 font-semibold">Address</p>
                <p className="w-1/2 text-justify text-wrap ">{selectedClaimDetails.address}</p>
              </div>
              <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg text-base w-fit flex mx-auto gap-2 items-center" onClick={()=>settleAClaim(selectedClaim)}>
                Settle {loading3?<Spinner size={"small"}/>:""}
              </button>
            </div>
          )} </>}
        </div>
      </div>
    </>
  );
};

export default ClaimRewards;
