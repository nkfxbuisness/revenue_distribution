import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import showToastMessage from "../toast/Toast";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../toast/animation/Spinner";
import PulseLoader from "../toast/animation/PulseLoader";

const TeamBuisness = () => {
  const { user, token } = useContext(UserContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const ifSuspendedOrInactive = () => {
    if (user.activationStatus.suspended) {
      navigate(`/user/suspended/${user._id}`);
      return false;
    }
    if (!user.activationStatus.active) {
      navigate(`/user/activeAccount/${user._id}`);
      return false;
    }
    return true;
  };
  // const [response, setResponse] = useState({
  //   _id: null,
  //   immediateChildren: [
  //     {
  //       _id: "66d80e3b6da9f2c11ef6fce2",
  //       name: "A1",
  //       contact: "1234567890",
  //       totalChildren: 2,
  //       totalBusiness: 100,
  //     },
  //     {
  //       _id: "66d80e596da9f2c11ef6fce6",
  //       name: "A2",
  //       contact: "1234567890",
  //       totalChildren: 2,
  //       totalBusiness: 0,
  //     },
  //     {
  //       _id: "66d80e636da9f2c11ef6fcea",
  //       name: "A3",
  //       contact: "1234567890",
  //       totalChildren: 1,
  //       totalBusiness: 0,
  //     },
  //   ],
  // });
  const [teamData, setTeamData] = useState([]);
  const [dialogBoxes, setDialogBoxes] = useState(false);
  console.log("teamData", teamData);
  const getTeamBusiness = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getTeamDetails/${user._id}`,
        config
      );
      console.log(data.data.length);
      if (data.success && data.data.length) {
        setTeamData(data.data[0]?.immediateChildren);
        if (data.data[0]?.immediateChildren.length > 2) {
          // if (teamData.length > 2) {
          // Check if all members have totalBusiness of 0
          const allZeroBusiness = teamData.every(
            (member) => member?.totalBusiness === 0
          );

          // Check if all members have the same totalBusiness value
          const firstBusinessValue = teamData[0]?.totalBusiness;
          console.log(firstBusinessValue);
          
          const allSameBusiness = teamData.every(
            (member) => member?.totalBusiness === firstBusinessValue
          );

          // If all members have totalBusiness of 0 or all have the same totalBusiness
          if (allZeroBusiness || allSameBusiness) {
            setDialogBoxes(false);
            setLoading(false);
          } else {
            setDialogBoxes(true);
            setLoading(false);
          }
        } else {
          setDialogBoxes(false); // If teamData has 2 or fewer members, set to false
          setLoading(false);
        }
        // showToastMessage("success", data.message);
        return;
      } else {
        showToastMessage("warn", "team data not found");
        setLoading(false);
      }
    } catch (error) {
      showToastMessage("error", `ggg${error}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    let temp = ifSuspendedOrInactive();
    if (temp) getTeamBusiness();
  }, []);

  const findBestPerformingTeam = () => {
    setTimeout(10000);
    let agentWithMaxBusiness = { ...teamData[0], index: 0 }; // Initialize the first agent with an index

    // Find the best performing agent
    teamData.forEach((agent, index) => {
      if (agent.totalBusiness > agentWithMaxBusiness.totalBusiness) {
        agentWithMaxBusiness = { ...agent, index }; // Embed the index in the best performing agent
      }
    });

    // Calculate sum of totalChildren and totalBusiness for remaining agents
    const remainingStats = teamData.reduce(
      (acc, agent, index) => {
        // Skip the best performing agent
        if (index !== agentWithMaxBusiness.index) {
          acc.totalChildrenSum += agent.totalChildren;
          acc.totalBusinessSum += agent.totalBusiness;
        }
        return acc;
      },
      { totalChildrenSum: 0, totalBusinessSum: 0 }
    );

    return {
      bestPerformingTeam: agentWithMaxBusiness,
      accumulatedData: remainingStats,
    };
  };
  const bestPerformingTeam = findBestPerformingTeam();
  console.log("bestPerformingTeam", bestPerformingTeam);

  return (
    <>
      <p className="flex justify-center items-center gap-2 font-bold text-3xl text-blue-600 py-5">
        Team Buisness <span>{loading ? <Spinner size={"large"} /> : ""}</span>
      </p>
      {loading ? (
        <div className="mr-8 ml-4"><PulseLoader repeat={5}/></div>
      ) : (
        <>
          <div className="flex  items-center mr-8 ml-4">
            <div className="flex flex-col gap-2 w-full">
              {/* table header  */}
              <div className=" mt-2 flex px-3 py-1 text-sm w-full  bg-blue-600 text-white text-center font-semibold rounded-md items-center text-wrap shadow-md">
                <p className="w-2/12  px-4 py-1 bg-blue-600 text-white">Team</p>
                <p className="w-3/12 border-l-2 px-4 py-1 bg-blue-600 text-white">
                  Leader
                </p>
                <p className="w-3/12 border-l-2 px-4 py-1 bg-blue-600 text-white">
                  Contact
                </p>
                <p className="w-2/12 border-l-2 px-4 py-1 bg-blue-600 text-white">
                  Total Decendents
                </p>
                <p className="w-2/12 border-l-2 px-4 py-1 bg-blue-600 text-white">
                  Total Buisness
                </p>
              </div>
              {!teamData.length > 0 ? (
                <div className="mt-2 w-full py-5 text-blue-600 text-lg flex justify-center items-center bg-white rounded-lg shadow-md ">
                  Team data not available
                </div>
              ) : (
                <>
                  {/* teams  */}
                  <div className="flex flex-col gap-2">
                    {teamData.map((agent, index) => (
                      <div className="flex w-full">
                        <p className="bg-white rounded-md  px-4 py-1 w-2/12 shadow-md">
                          Team {index + 1}
                        </p>
                        <p className="bg-white rounded-md px-4 py-1 w-3/12 shadow-md">
                          {agent.name}
                        </p>
                        <p className="bg-white rounded-md px-4 py-1 w-3/12 shadow-md">
                          {agent.mobileNo}
                        </p>
                        <p className="bg-white rounded-md px-4 py-1 w-2/12 shadow-md">
                          {agent.totalChildren}
                        </p>
                        <p className="bg-white rounded-md px-4 py-1 w-2/12 shadow-md">
                          {agent.totalBusiness}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {!dialogBoxes ? (
        ""
      ) : (
        <div className="flex  items-center mr-8 ml-4 mt-10 gap-4">
          <div className="w-5/12 bg-blue-600 h-96 rounded-2xl flex flex-col gap-4 justify-center items-center p-5 shadow-md">
            <p className="font-light text-2xl text-white flex items-center">
              Best Performer
              <FaTrophy className="text-white text-3xl pl-3" />
            </p>
            <p className="font-bold text-3xl text-white">
              Team {bestPerformingTeam.bestPerformingTeam.index + 1}
            </p>
            <p className="font-bold text-3xl text-white">
              {bestPerformingTeam.bestPerformingTeam.name}
            </p>
            <p className="font-light text-2xl text-white">
              Total Decendents{" "}
              {bestPerformingTeam.bestPerformingTeam.totalChildren}
            </p>
            <p className="font-light text-2xl text-white">
              Total Buisness{" "}
              {bestPerformingTeam.bestPerformingTeam.totalBusiness}
            </p>
          </div>
          <div className="w-7/12 bg-blue-300 h-96 rounded-2xl flex flex-col gap-4 p-5 justify-center items-center shadow-md">
            <p className="font-bold text-3xl text-white">Rest of the Teams</p>
            <p className="font-light text-2xl text-white">
              Total Decendents{" "}
              {bestPerformingTeam.accumulatedData.totalChildrenSum}
            </p>
            <p className="font-light text-2xl text-white">
              Total Buisness{" "}
              {bestPerformingTeam.accumulatedData.totalBusinessSum}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamBuisness;
