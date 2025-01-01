import React, { useContext, useEffect, useState } from "react";
import getFormattedDate from "../../util/date/getFormattedDate";
import { MdOutlineFilterList } from "react-icons/md";
import { MdClear } from "react-icons/md";
import showToastMessage from "../../util/toast/Toast";
import UserContext from "../../context/UserContext";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Spinner from "../../util/animation/Spinner"
import WhiteSpinner from '../../util/animation/WhiteSpinner'
import PulseLoader from "../../util/animation/PulseLoader";

const TotalBusiness = ({ifSuspendedOrInactive}) => {
  const { user, token } = useContext(UserContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  // const [response, setResponse] = useState([
  //   {
  //     _id: 0,
  //     users: [
  //       {
  //         name: "A2",
  //         activeOn: "2024-09-04T07:38:01.572Z",
  //         copyProportion: 2,
  //       },
  //       {
  //         name: "A1",
  //         activeOn: "2024-09-04T07:37:31.724Z",
  //         copyProportion: 2,
  //       },
  //       {
  //         name: "A3",
  //         activeOn: "2024-09-04T07:38:11.799Z",
  //         copyProportion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: 1,
  //     users: [
  //       {
  //         name: "B1",
  //         activeOn: "2024-09-04T07:45:07.689Z",
  //         copyProportion: 2,
  //       },
  //       {
  //         name: "B3",
  //         activeOn: "2024-09-04T07:46:22.080Z",
  //         copyProportion: 2,
  //       },
  //       {
  //         name: "B2",
  //         activeOn: "2024-09-04T07:45:37.795Z",
  //         copyProportion: 2,
  //       },
  //       {
  //         name: "B4",
  //         activeOn: "2024-09-04T07:46:31.766Z",
  //         copyProportion: 2,
  //       },
  //       {
  //         name: "B5",
  //         activeOn: "2024-09-04T07:47:43.465Z",
  //         copyProportion: 2,
  //       },
  //     ],
  //   },
  // ]);
  const [levelwiseUsers, setLevelwiseUsers] = useState([]);
  const [storedLevelwiseUsers, setStoredLevelwiseUsers] = useState([]);
  console.log("storedLevelwiseUsers", storedLevelwiseUsers);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterUsersByDateRange = () => {
    if (startDate === "" || endDate === "") {
      showToastMessage("warn", "date range not selected !!");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure the start date is at the beginning of the day and end date is at the end of the day
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    // Filter the users based on activeOn date range
    const filteredResponse = storedLevelwiseUsers
      .map((level) => ({
        ...level,
        users: level.users.filter((user) => {
          const activeOnDate = new Date(user.activeOn);
          return activeOnDate >= start && activeOnDate <= end;
        }),
      }))
      .filter((level) => level.users.length > 0); // Keep only levels with users in the range

    setStoredLevelwiseUsers(filteredResponse);
    showToastMessage("success", "filter applied");
  };
  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setStoredLevelwiseUsers(levelwiseUsers);
  };
  const totalBusiness = storedLevelwiseUsers.reduce((levelAcc, level) => {
    // Sum for all users in the current level
    const levelTotal = level.users.reduce(
      (userAcc, user) => userAcc + user.copyProportion * 100,
      0
    );
    return levelAcc + levelTotal; // Sum across levels
  }, 0);
  console.log(totalBusiness);

  const getTotalBusiness = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getChildrenLevelWise/${user._id}`,
        config
      );
      console.log(data);
      if (data.success) {
        setLevelwiseUsers(data.data);
        setStoredLevelwiseUsers(data.data);
        setLoading(false);
        return;
      } else {
        showToastMessage("error", data.message);
        setLoading(false);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    let temp = ifSuspendedOrInactive();
    if(temp) getTotalBusiness();
  }, []);

  return (
    <>
      <p className="flex justify-center items-center gap-2 font-bold text-3xl text-blue-600 py-5">
        Levelwise Buisness <span>{loading?<Spinner size={"large"}/>:""}</span>
      </p>
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

      {/* total buisness accross all levels  */}
      <p className="flex justify-center font-semibold text-lg text-blue-600 pb-4">
        Total Buisness accross all levels{" "}
        <span className="bg-green-300 text-green-600 font font-semibold rounded-lg px-2 ml-2">
           {loading?<WhiteSpinner size={"large"}/>: <>${totalBusiness}</> }
        </span>
      </p>

      {loading? <div className="w-11/12 mx-auto"><PulseLoader repeat={5}/></div>:<>
      <div className="mr-8 flex flex-col gap-10">
        {storedLevelwiseUsers.length === 0 ? (
          <div className="flex w-11/12 mx-auto h-20 bg-white mt-2 justify-center items-center text-blue-600 font-semibold text-lg rounded-lg">
            Data not found
          </div>
        ) : (
          <>
            {storedLevelwiseUsers.map((level) => {
              // Calculate the total for each level
              const totalDeposit = level.users.reduce(
                (acc, user) => acc + user.copyProportion * 100,
                0
              );

              return (
                <div className="flex flex-col w-full gap-1 ml-2 mr-4">
                  {/* level accumulated information  */}
                  <div className="bg-blue-600 text-white font-semibold py-1 rounded-md flex items-center justify-around">
                    <p>Level {level._id + 1}</p>
                    <p>Total Decendents {level.users.length}</p>
                    <p>Total Diposit {totalDeposit}</p>
                  </div>

                  {/* table  */}
                  <div className="w-full text-left rounded-md">
                    {/* table header  */}
                    <div className="flex px-3 py-1 text-sm w-full  bg-blue-600 text-white text-center font-semibold rounded-md items-center text-wrap">
                      <p className="text-center py-1 px-2  w-1/12">SL. No.</p>
                      <p className="text-center py-1 px-2 border-l-2 border-white w-4/12">
                        Name
                      </p>
                      <p className="text-center py-1 px-2 border-l-2 border-white w-4/12">
                        Activation Date
                      </p>
                      <p className="text-center py-1 px-2 border-l-2 border-white w-3/12">
                        Diposit amount
                      </p>
                    </div>

                    {/* table body  */}
                    <div className="flex flex-col gap-1 mt-1">
                      {level.users.map((user, index) => (
                        <div
                          key={index}
                          className="flex text-center bg-white hover:bg-gray-100 shadow-md"
                        >
                          <p className="w-1/12 px-4 py-1">{index + 1}</p>
                          <p className="w-4/12 px-4 py-1">{user.name}</p>
                          <p className="w-4/12 px-4 py-1">
                            {getFormattedDate(user.activeOn)}
                          </p>
                          <p className="w-3/12 px-4 py-1">
                            {user.copyProportion * 100}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      </>}
    </>
  );
};

export default TotalBusiness;
