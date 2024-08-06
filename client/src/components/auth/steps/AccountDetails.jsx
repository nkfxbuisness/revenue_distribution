import React, { useContext } from "react";
import { StepperContext } from "../../../context/StepperContext";

const AccountDetails = () => {

  const {userData,setUserData}=useContext(StepperContext);
  const handleChange = (e)=>{
    const {name,value}=e.target;
    setUserData({...userData,[name]:value})
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        
        <div className="flex flex-col w-full text-left gap-1">
          <label
            htmlFor="accountNumber"
            className="font-bold text-lg text-blue-600"
          >Account Number</label>
          <input
            type="number"
            id="accountNumber"
            name='accountNumber'
            value={userData["accountNumber"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="IFSC" className="font-bold text-lg text-blue-600">IFSC Code</label>
          <input
            type="text"
            id="IFSC"
            name='IFSC'
            value={userData["IFSC"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            required
          />
        </div>
        <div className="flex flex-col w-full text-left gap-1">
          <label
            htmlFor="bankName"
            className="font-bold text-lg text-blue-600"
          >Bank </label>
          <input
            type="text"
            id="bankName"
            name='bankName'
            value={userData["bankName"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            placeholder="eg. SBI"
            required
          />
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
