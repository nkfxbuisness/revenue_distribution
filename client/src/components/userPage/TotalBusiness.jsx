import React, { useState } from "react";
import getFormattedDate from "../toast/getFormattedDate";
import { MdOutlineFilterList } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import showToastMessage from "../toast/Toast";

const TotalBusiness = () => {
  const [ response,setResponse] = useState([
    {
      _id: 0,
      users: [
        {
          name: "A2",
          activeOn: "2024-09-04T07:38:01.572Z",
          copyProportion: 2,
        },
        {
          name: "A1",
          activeOn: "2024-09-04T07:37:31.724Z",
          copyProportion: 2,
        },
        {
          name: "A3",
          activeOn: "2024-09-04T07:38:11.799Z",
          copyProportion: 2,
        },
      ],
    },
    {
      _id: 1,
      users: [
        {
          name: "B1",
          activeOn: "2024-09-04T07:45:07.689Z",
          copyProportion: 2,
        },
        {
          name: "B3",
          activeOn: "2024-09-04T07:46:22.080Z",
          copyProportion: 2,
        },
        {
          name: "B2",
          activeOn: "2024-09-04T07:45:37.795Z",
          copyProportion: 2,
        },
        {
          name: "B4",
          activeOn: "2024-09-04T07:46:31.766Z",
          copyProportion: 2,
        },
        {
          name: "B5",
          activeOn: "2024-09-04T07:47:43.465Z",
          copyProportion: 2,
        },
      ],
    },
  ]);
  const [storedLevelwiseUsers,setStoredLevelwiseUsers] = useState(response);
  console.log("storedLevelwiseUsers",storedLevelwiseUsers);
  
  const [levelwiseTotaiposit, setLevelwiseTotaiposit] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

   const filterUsersByDateRange = () => {
    if(startDate === "" || endDate === ""){
      showToastMessage("warn","date range not selected !!");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Ensure the start date is at the beginning of the day and end date is at the end of the day
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    // Filter the users based on activeOn date range
    const filteredResponse = storedLevelwiseUsers.map((level) => ({
      ...level,
      users: level.users.filter(user => {
        const activeOnDate = new Date(user.activeOn);
        return activeOnDate >= start && activeOnDate <= end;
      })
    })).filter(level => level.users.length > 0); // Keep only levels with users in the range

    setStoredLevelwiseUsers(filteredResponse);
    showToastMessage("success","filter applied")
  };
  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setStoredLevelwiseUsers(response);
  };
  const totalBusiness = storedLevelwiseUsers.reduce((levelAcc, level) => {
    // Sum for all users in the current level
    const levelTotal = level.users.reduce(
      (userAcc, user) => userAcc + user.copyProportion * 100,
      0
    );
    return levelAcc + levelTotal; // Sum across levels
  }, 0);
  console.log(totalBusiness)
  return (
    <>
      <p className='flex justify-center font-bold text-3xl text-blue-600 py-5'>Levelwise Buisness</p>
      <div className="flex gap-4 items-center justify-center pb-5">
          <div className="flex gap-2">
            <label htmlFor="startingDate" className="text-blue-600 font-light">
              Starting Date
            </label>
            <input
              type="date"
              id="startingDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="endingDate" className="text-blue-600 font-light">
              Ending Date
            </label>
            <input
              type="date"
              id="endingDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-md"
            />
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white font-light cursor-pointer px-2 py-1 w-fit h-full rounded-md"
            onClick={filterUsersByDateRange}
          >
            Filter
            <MdOutlineFilterList className="text-white text-xl font-semibold" />
          </button>
          <button
            className="flex items-center gap-2 bg-red-600 text-white font-light cursor-pointer px-2 py-1 w-fit h-full rounded-md"
            onClick={clearFilter}
          >
            Clear filter
            <MdClear className="text-white text-xl font-semibold" />
          </button>
        </div>
      <p className='flex justify-center font-semibold text-lg text-blue-600 pb-4'>Total Buisness accross all levels <span className="bg-green-300 text-green-600 font font-semibold rounded-lg px-2 ml-2">${totalBusiness}</span></p>
      <div className="mr-8 flex flex-col gap-10">
        {storedLevelwiseUsers.map((level) => {
          // Calculate the total for each level
          const totalDeposit = level.users.reduce(
            (acc, user) => acc + user.copyProportion * 100,
            0
          );

          return <div className="flex flex-col w-full gap-1 ml-2 mr-4">
            <div className="bg-blue-600 text-white font-semibold py-1 rounded-md flex items-center justify-around">
              <p>Level {level._id + 1}</p>
              <p>Total Decendents {level.users.length}</p>
              <p>Total Diposit {totalDeposit}</p>
            </div>
            <div className="flex  items-center">
              <table className="table-auto border-collapse border border-gray-300 w-full rounded-lg overflow-hidden">
                <thead>
                  <tr className="rounded-t-md">
                    <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                      SL. No.
                    </th>
                    <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                      Name
                    </th>
                    <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                      Activation Date
                    </th>
                    <th className="border border-white px-4 py-1 bg-blue-600 text-white">
                      Diposit amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {level.users.map((user, index) => (
                    <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-1">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-1">
                        {getFormattedDate(user.activeOn)}
                      </td>
                      <td className="border border-gray-300 px-4 py-1">
                        {user.copyProportion * 100}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
})}
      </div>
    </>
  );
};

export default TotalBusiness;
