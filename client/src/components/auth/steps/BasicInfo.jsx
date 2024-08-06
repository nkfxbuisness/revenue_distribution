import React, { useContext, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { GrValidate } from "react-icons/gr";
import { StepperContext } from "../../../context/StepperContext";
import showToastMessage from "../../toast/Toast";

const BasicInfo = () => {
  const [show, setShow] = useState(false);
  const {userData,setUserData,finalData,setFinalData}=useContext(StepperContext);

  const handleChange = (e)=>{
    const {name,value}=e.target;
    setUserData({...userData,[name]:value})
  };
  
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        {/* name  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="userName" className="font-bold text-lg text-blue-600">
            Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userData["userName"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            required
          />
        </div>
        
        {/* mobile  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="mobile" className="font-bold text-lg text-blue-600">
            Mobile No.
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={userData["mobile"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
          />
        </div>
        {/* DOB  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="DOB" className="font-bold text-lg text-blue-600">
            Date of Barth
          </label>
          <input
            type="date"
            id="DOB"
            name="DOB"
            value={userData["DOB"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
          />
        </div>

        {/* address  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="address" className="font-bold text-lg text-blue-600">
            Address <span className="font-thin">(As per of KYC documents)</span>
          </label>
          <textarea
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            id="address"
            name="address"
            value={userData["address"] || ""}
            onChange={handleChange}
          />
        </div>
        
      </div>
    </>
  );
};

export default BasicInfo;
