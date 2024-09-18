import React, { useContext, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import user from "../toast/user";
import { useNavigate } from "react-router-dom";
import Dialog from "./DialogComp";
import AdminContext from "../../context/AdminContext";
import axios from "axios";
import showToastMessage from "../toast/Toast";
import getFormattedDate from "../toast/getFormattedDate";

const WithdrawlRequests = () => {
  const { token } = useContext(AdminContext);
  const [enabled, setEnabled] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [requests, setRequests] = useState([]);
  const [storedRequests, setStoredRequests] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let navigate = useNavigate();

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();

  const handleDialog = (request) => {
    setName(request.name);
    setAmount(request.amount);
    setDate(request.date);
    setIsOpen(true);
  };
  const filterByDateRange = () => {
    let data = storedRequests;
    const start = new Date(startDate);
    const end = new Date(endDate);
    let temp = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
    setRequests(temp);
    showToastMessage("success", "filter applied");
  };
  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setRequests(storedRequests);
  };
  const fetchAllRequests = async () => {
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
      setRequests(data.data);
      setStoredRequests(data.data);
      console.log(data.data);
      showToastMessage("success", "featched all withdrawal requests");
    } catch (error) {
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
      setRefresh(!refresh);
      if (data.success) {
        showToastMessage("success", data.message);
        return;
      }
      showToastMessage("error", data.message);
    } catch (error) {
      showToastMessage("error", `${error.message}`);
    }
  };
  useEffect(() => {
    fetchAllRequests();
  }, [refresh]);

  return (
    <>
      <div className="p-5 ">
        <div className="flex gap-5 items-center justify-center">
          <p className="flex justify-center font-semibold text-2xl text-blue-600">
            {enabled ? "Stop " : "Start "} Accepting Withdrawl Requests
          </p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
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
        {requests.length > 0 ? (
          <div className="flex flex-col gap-2 w-full mt-2 bg-blue-200 py-2 rounded-md">
            {requests.map((request, index) => (
              <div
                key={index}
                className="flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center text-wrap"
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
