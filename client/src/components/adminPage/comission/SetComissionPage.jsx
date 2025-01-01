import React, { useContext, useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import AdminContext from "../../../context/AdminContext";
import axios from "axios";
import showToastMessage from "../../../util/toast/Toast";
import PulseLoader from "../../../util/animation/PulseLoader";

const SetComissionPage = () => {
  const { token } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(0);
  const [da, setDa] = useState(0);
  const [daDisabled, setDaDisabled] = useState(true);
  const [comissionDisabled, setComissionDisabled] = useState(true);
  const [levels, setLevels] = useState([]);

  console.log(levels);
  

  const calculateSum = (array) => {
    return array.reduce((acc, curr) => acc + curr, 0);
  };
  const handleChange = (index, value) => {
    const updatedLevels = [...levels]; // Copy the current levels array
    updatedLevels[index] = parseFloat(value) || 0; // Update the specific index with new value
    setLevels(updatedLevels); // Update the state
  };
  const getAllData = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const data1 = await axios.get(
        `http://localhost:4000/api/admin/getVariable/levelwiseComission`,
        config
      );
      const data2 = await axios.get(
        `http://localhost:4000/api/admin/getVariable/distributableAmount`,
        config
      );
      if (data1.data.success) {
        setLevels(data1.data.data);
      }
      if (data2.data.success) {
        setDa(data2.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToastMessage("error", `${error}`);
    }
  };
  const updateData = async (variableName) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      // let data;
      if (variableName === "levelwiseComission") {
        setComissionDisabled(true);
        const { data } = await axios.put(
          `http://localhost:4000/api/admin/updateVariable/${variableName}`,
          { key: "levelwiseComission", value: levels },
          config
        );
        console.log(data.data);
        showToastMessage("success", "updated successfully");
      } else if (variableName === "distributableAmount") {
        setDaDisabled(true);
        const { data } = await axios.put(
          `http://localhost:4000/api/admin/updateVariable/${variableName}`,
          { key: "distributableAmount", value: da },
          config
        );
        console.log(data.data);
        showToastMessage("success", "updated successfully");
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  };

  useEffect(() => {
    setSum(Math.round(calculateSum(levels) * 100) / 100);
  }, [levels]); // Recalculate sum when levels change

  useEffect(() => {
    // console.log("hello");
    getAllData();
  }, []);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center ">
        <div className=" w-1/2 min-h-screen h-full flex flex-col p-5 items-center gap-5">
          {/* set DA  */}
          <div className="flex flex-col w-full items-center  bg-blue-100 rounded-md p-5 gap-5 shadow-md">
            <p className="flex justify-center font-bold text-3xl text-blue-600">
              Set Distributable Amount (%)
            </p>
            <p className="text-blue-600 font-thin  justify-start  text-left pt-3 inline-block">
              <span className="font-semibold pr-2 my-auto flex items-center gap-2">
                <IoMdInformationCircleOutline className="text-lg" />
                Information
              </span>
              Distributable amount 35% means if user profit is $100 then $35
              will be distributed throughout the hierarchy
            </p>

            <div className="flex gap-4">
              <label
                htmlFor=""
                className="font-semibold text-base text-blue-600 py-1 text-left text-nowrap"
              >
                Distributable amount of user profit (in %)
              </label>
              <input
                type="number"
                disabled={daDisabled}
                value={da}
                onChange={(e) => setDa(e.target.value)}
                className="py-1 px-5 rounded-md w-full shadow-md focus:outline-blue-400 text-blue-600 font-bold"
              />
              {daDisabled ? (
                <button
                  className="bg-blue-600 text-white px-2 rounded-md flex justify-center items-center"
                  onClick={() => setDaDisabled(false)}
                >
                  <MdEdit className="text-2xl" />
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-2 rounded-md font-semibold flex justify-center items-center"
                  onClick={() => updateData("distributableAmount")}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>

          {/* set comission  */}
          {/* <PulseLoader repeat={5} /> */}
          <div className="flex flex-col w-full items-center  bg-blue-100 rounded-md py-10 gap-6 shadow-md px-5">
            <div className="flex gap-4 justify-center items-center">
              <p className="flex justify-center font-bold text-3xl text-blue-600">
                Set Levelwise Comission
              </p>
              <button
                className="bg-blue-600 text-white px-2 rounded-md flex  items-center h-8"
                onClick={() => setComissionDisabled(false)}
              >
                <MdEdit className="text-2xl" />
              </button>
            </div>

            {loading ? (
              <PulseLoader repeat={10}/>
            ) : (
              <div className="flex flex-col gap-1 w-3/4 justify-center">
                {levels?.map((level, index) => (
                  <div key={index} className="flex gap-5 w-full items-center">
                    <label
                      htmlFor=""
                      className="font-semibold text-base text-blue-600 py-2 text-left text-nowrap"
                    >
                      Level {index + 1}
                    </label>
                    <input
                      type="number"
                      value={level}
                      onChange={(e) => handleChange(index, e.target.value)}
                      disabled={comissionDisabled}
                      className="py-1 px-5 rounded-md w-full shadow-md focus:outline-blue-400 text-blue-600 font-bold"
                    />
                  </div>
                ))}
              </div>
            )}
            {!comissionDisabled ? (
              <div className="flex flex-col w-full items-center">
                <div className="flex gap-5 items-center w-3/4">
                  <label
                    htmlFor=""
                    className="font-semibold text-base text-blue-600 py-2 text-left text-nowrap"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    value={sum}
                    disabled
                    className={`py-1 px-5 rounded-md w-full shadow-md focus:outline-blue-400  font-bold ${
                      sum != 100
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  />
                </div>
                <p className="text-xs">
                  the sum of % comission of all levels must be 100%
                </p>
              </div>
            ) : (
              ""
            )}

            {!comissionDisabled ? (
              <button
                className="bg-blue-600 text-white px-2 rounded-md font-semibold flex justify-center items-center h-8"
                onClick={() => updateData("levelwiseComission")}
                disabled={sum != 100}
              >
                Confirm
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetComissionPage;
