import React, { useContext, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import Dialog from "./DialogComp";
import AdminContext from "../../context/AdminContext";
import axios from "axios";
import showToastMessage from "../toast/Toast";
import getFormattedDate from "../toast/getFormattedDate";
import Spinner from "../toast/animation/Spinner";
import PulseLoader from "../toast/animation/PulseLoader";

const WithdrawlRequests = () => {
  const { token } = useContext(AdminContext);
  const [enabled, setEnabled] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [requests, setRequests] = useState([]);
  console.log(requests)
  const [storedRequests, setStoredRequests] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);

  const handleDialog = () => {
    if(enabled){
      console.log("stopping!!");
      stopAccepting();
      setEnabled(!enabled);
    }else{
      console.log("starting!!");
      startAccepting();
      setEnabled(!enabled);
    }
  };
  const filterByDateRange = () => {
    if(startDate ===""|| endDate === "" ){
      showToastMessage("warn", "Select the range");
      return;
    }
    let data = storedRequests;
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Set start date to the beginning of the day
    start.setHours(0, 0, 0, 0);
    
    // Set end date to the end of the day
    end.setHours(23, 59, 59, 999);
  
    let temp = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
  
    setRequests(temp);
    showToastMessage("success", "Filter applied");
  };
  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setRequests(storedRequests);
  };
  const refreshFinction = ()=>{
    setRefresh(!refresh);
  }
  const acceptingWithdrawalRequests = async()=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        "http://localhost:4000/api/admin/getVariable/acceptingWithdrawalRequests",
        config
      );
      console.log("variable",data);
      setEnabled(data.data)
      // showToastMessage("success", "featched all withdrawal requests");
    } catch (error) {
      showToastMessage("error", `${error.message}`);
    }
  }
  const fetchAllRequests = async () => {
    setLoading(true)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        "http://localhost:4000/api/admin/getAllWithdrawalRequests",
        config
      );
      console.log("data",data);
      
      setRequests(data.data);
      setStoredRequests(data.data);
      console.log("requests",data.data);
      setLoading(false)
      // showToastMessage("success", "featched all withdrawal requests");
    } catch (error) {
      setLoading(false)
      showToastMessage("error", `${error.message}`);
    }
  };
  const downloadRequests = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        responseType: "blob", // Ensure the response is treated as a Blob for file download
      };

      // Make the Axios POST request
      const response = await axios.post(
        "http://localhost:4000/api/admin/download-pending-requests",
        { pendingRequests: requests },
        config
      );

      console.log(requests);
      console.log("hello", response.data);

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a URL for the Blob and trigger a download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pending_requests.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Clean up the URL object to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showToastMessage("error", `${error.message}`);
    }
  };
  const updatePaidStatus = async () => {
    const idsToUpdate = requests.map((obj) => obj._id);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.put(
        "http://localhost:4000/api/admin/update-paid-status",
        { ids: idsToUpdate },
        config
      );
      console.log(data);
      clearFilter();
      refreshFinction();
      if (data.success) {
        showToastMessage("success", data.message);
        return;
      }
      showToastMessage("error", data.message);
    } catch (error) {
      showToastMessage("error", `${error.message}`);
    }
  };
  const startAccepting = async()=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.put(
        "http://localhost:4000/api/admin/updateVariable/acceptingWithdrawalRequests",
        {value:true},
        config
      );
      console.log("start",data);
      showToastMessage("success", "Started Accepting Requests");
    } catch (error) {
      showToastMessage("error", `${error.message}`);
    }
  }
  const stopAccepting = async()=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.put(
        "http://localhost:4000/api/admin/updateVariable/acceptingWithdrawalRequests",
        {value:false},
        config
      );
      console.log("stop",data);
      showToastMessage("success", "Stopped Accepting Withdrawal Requests");
    } catch (error) {
      showToastMessage("error", `${error.message}`);
    }
  }
  useEffect(() => {
    acceptingWithdrawalRequests();
    fetchAllRequests();
  }, [refresh]);

  return (
    <>
      <div className="p-5 ">
        <div className="flex gap-5 items-center justify-center">
          <p className="flex justify-center font-semibold text-2xl text-blue-600">
            Accept Withdrawl Requests
          </p>
          {loading?<Spinner size={"large"}/>:
          <Switch
            checked={enabled}
            onChange={handleDialog}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch> }
        </div>

        <div className="flex gap-4 items-center justify-center pt-5">
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
            onClick={filterByDateRange}
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
          <button
            className="flex items-center gap-2 bg-blue-600 text-white font-light cursor-pointer px-2 py-1 w-fit h-full rounded-md"
            onClick={() => setRefresh(!refresh)}
          >
            Refresh
            <FiRefreshCcw className="text-white text-xl font-semibold " />
          </button>
        </div>

        <div className="sticky top-12 mt-8 flex px-3 py-2 text-sm w-full  bg-blue-600 text-white text-center font-semibold rounded-md items-center text-wrap">
          <p className="w-1/12 border-x-2 border-white">No.</p>
          <p className="w-2/12 border-x-2 border-white">Name</p>
          <p className="w-2/12 border-x-2 border-white">Account Number</p>
          <p className="w-2/12 border-x-2 border-white">IFSC code</p>
          <p className="w-2/12 border-x-2 border-white">Bank</p>
          <p className="w-2/12 border-x-2 border-white">Date</p>
          <p className="w-1/12 border-x-2 border-white ">Amount</p>
        </div>
        {loading ? 
          <PulseLoader repeat={5} /> :<>
        {requests.length > 0 ? (
          <div className="flex flex-col gap-2 w-full mt-1 py-2 rounded-md">
            {requests.map((request, index) => (
              <div
                key={index}
                className="flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center text-wrap shadow-md"
              >
                <p className="w-1/12 pl-2">{index + 1}</p>
                <p className="w-2/12 pl-2">{request.user.name}</p>
                <p className="w-2/12 pl-2">{request.user.accountNo}</p>
                <p className="w-2/12 pl-2">{request.user.IFSCcode}</p>
                <p className="w-2/12 pl-2">{request.user.bank}</p>
                <p className="w-2/12 pl-2">{getFormattedDate(request.date)}</p>
                <p className="w-1/12 pl-2 flex gap-2 items-center">
                  {request.amount}
                  <FaClockRotateLeft className="text-yellow-600" />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-blue-600 text-xl h-40">
            No requests Pending
          </div>
        )}
        </>}
      </div>

      <div className="px-2 py-2 w-full flex gap-3 bg-white   fixed bottom-0 shadow-2xl shadow-blue-600">
        <button
          className="bg-blue-600 text-white font-semibold cursor-pointer px-2 py-2 w-fit h-full rounded-md"
          onClick={() => downloadRequests()}
        >
          <span className="flex items-center gap-2">
            Download CSV File <MdDownload className="text-xl" />
          </span>
        </button>
        <button
          className="bg-green-600 text-white font-semibold cursor-pointer px-2 py-2 w-fit h-full rounded-md"
          onClick={() => updatePaidStatus()}
        >
          Mark all as Paid
        </button>
      </div>
      <Dialog
        name={name}
        amount={amount}
        date={date}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default WithdrawlRequests;
