import React, { useContext, useEffect, useState } from "react";
import showToastMessage from "../../util/toast/Toast";
import AdminContext from "../../context/AdminContext";
import axios from "axios";
import getFormattedDate from "../../util/date/getFormattedDate";
import { MdInfoOutline } from "react-icons/md";

const ProfiltUpdate = ({checkIfAllowed}) => {
  const [date, setDate] = useState("");
  const [profit, setProfit] = useState("");
  const [lastEntry, setlastEntry] = useState("");
  const [fetchAgain, setFetchAgain] = useState(true);
  const { token } = useContext(AdminContext);
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const submit = async () => {
    if (!date || !profit) {
      showToastMessage("warn", "mandatory fields cannot be blank");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/admin/profitUpdate`,
        {
          profit,
          date,
        },
        config
      );
      setProfit("");
      setDate("");
      setFetchAgain(!fetchAgain);
      if (data.success) {
        showToastMessage("success", data.message);
      } else {
        showToastMessage("error", data.message);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  };
  const fetchLastEntry = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/getLastProfitEntry`,
        config
      );
      console.log(data);
      
      if(!data.success){
        showToastMessage("error",data.message)
      }else{
        if(!isEmptyObject(data.data)) {
          setlastEntry(data.data.date);
        }
      }
    } catch (error) {
      // showToastMessage("error", `${error}`);
      console.log((error));
      
    }
  };
  useEffect(() => {
    checkIfAllowed();
    fetchLastEntry();
  }, [fetchAgain]);

  return (
    <>
      <div className="w-1/2  h-full flex flex-col mx-auto items-center ">
        <p className="flex justify-center font-semibold text-2xl text-blue-600 py-5">
          Profit Update
        </p>
        <p className="flex w-4/5 justify-center items-center font-light text-xl text-yellow-600 bg-yellow-200 rounded-md p-2 mb-5 gap-2">
          <MdInfoOutline className="font-semibold " />
          Last Profit updated for {getFormattedDate(lastEntry)}
        </p>
        <div className="flex flex-col w-4/5 mx-auto ">
          <div className="flex flex-col w-full py-2">
            <label
              htmlFor="date"
              className="font-bold text-lg text-blue-600 py-2 text-left"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="py-1 rounded-md w-full shadow-md"
            />
          </div>
          <div className="flex flex-col w-full py-2 text-left">
            <label
              htmlFor="profitUpdate"
              className="font-bold text-lg text-blue-600 py-1 text-left"
            >
              Profit / Loss in percentage
            </label>
            <p className="text-yellow-600 text-sm font-light pb-1 ">
              Enter the profit or loss amount for the minimum investable amount.
              If it is a loss, use a negative sign
            </p>

            <input
              type="number"
              id="profitUpdate"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              placeholder="eg. -12"
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full shadow-md"
            />
          </div>
          <button
            className="p-2 bg-blue-600 text-white font-semibold mt-3 rounded-md w-fit"
            onClick={submit}
          >
            Update Profit
            {/* <div className="mr-2 w-4 h-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfiltUpdate;
