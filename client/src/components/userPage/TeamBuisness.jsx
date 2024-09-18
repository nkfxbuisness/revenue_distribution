import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";

const TeamBuisness = () => {
    const [response,setResponse] = useState({
        "_id": null,
        "immediateChildren": [
            {
                "_id": "66d80e3b6da9f2c11ef6fce2",
                "name": "A1",
                "contact": "1234567890",
                "totalChildren": 2,
                "totalBusiness": 700
            },
            {
                "_id": "66d80e596da9f2c11ef6fce6",
                "name": "A2",
                "contact": "1234567890",
                "totalChildren": 2,
                "totalBusiness": 400
            },
            {
                "_id": "66d80e636da9f2c11ef6fcea",
                "name": "A3",
                "contact": "1234567890",
                "totalChildren": 1,
                "totalBusiness": 200
            }
        ]
    }) 
    const findBestPerformingTeam = () => {
        let agentWithMaxBusiness = { ...response.immediateChildren[0], index: 0 }; // Initialize the first agent with an index
      
        // Find the best performing agent
        response.immediateChildren.forEach((agent, index) => {
          if (agent.totalBusiness > agentWithMaxBusiness.totalBusiness) {
            agentWithMaxBusiness = { ...agent, index }; // Embed the index in the best performing agent
          }
        });
      
        // Calculate sum of totalChildren and totalBusiness for remaining agents
        const remainingStats = response.immediateChildren.reduce(
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
      
        return {bestPerformingTeam:agentWithMaxBusiness,accumulatedData:remainingStats};
      };
    const bestPerformingTeam = findBestPerformingTeam();

    
  return (
    <>
      <p className="flex justify-center font-bold text-3xl text-blue-600 py-5">
        Team Buisness 
      </p>
      <div className="flex  items-center mr-8 ml-4">
        <table className="table-auto border-collapse border border-gray-300 w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="rounded-t-md">
              <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                Team
              </th>
              <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                Leader
              </th>
              <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                Contact
              </th>
              <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                Total Decendents
              </th>
              <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                Total Buisness
              </th>
            </tr>
          </thead>
          <tbody>
            {response.immediateChildren.map((agent, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-1">
                  Team {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-1">
                  {agent.name}
                </td>
                <td className="border border-gray-300 px-4 py-1">
                  {agent.contact}
                </td>
                <td className="border border-gray-300 px-4 py-1">
                  {agent.totalChildren}
                </td>
                <td className="border border-gray-300 px-4 py-1">
                  {agent.totalBusiness}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex  items-center mr-8 ml-4 mt-10 gap-4">
        <div className="w-5/12 bg-blue-600 h-96 rounded-2xl flex flex-col gap-4 justify-center items-center p-5">
            <p className="font-light text-2xl text-white flex items-center">Best Performer<FaTrophy className="text-white text-3xl pl-3"/></p>
            <p className="font-bold text-3xl text-white">Team {bestPerformingTeam.bestPerformingTeam.index+1}</p>
            <p className="font-bold text-3xl text-white">{bestPerformingTeam.bestPerformingTeam.name}</p>
            <p className="font-light text-2xl text-white">Total Decendents {bestPerformingTeam.bestPerformingTeam.totalChildren}</p>
            <p className="font-light text-2xl text-white">Total Buisness {bestPerformingTeam.bestPerformingTeam.totalBusiness}</p>
        </div>
        <div className="w-7/12 bg-blue-300 h-96 rounded-2xl flex flex-col gap-4 p-5 justify-center items-center">
            <p className="font-bold text-3xl text-white">Rest of the Teams</p>
            <p className="font-light text-2xl text-white">Total Decendents {bestPerformingTeam.accumulatedData.totalChildrenSum}</p>
            <p className="font-light text-2xl text-white">Total Buisness {bestPerformingTeam.accumulatedData.totalBusinessSum}</p>
        </div>
      </div>
    </>
  );
};

export default TeamBuisness;
