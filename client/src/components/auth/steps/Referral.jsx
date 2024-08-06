import React, { useContext, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { GrValidate } from "react-icons/gr";
import { StepperContext } from "../../../context/StepperContext";
import showToastMessage from "../../toast/Toast";

const Referral = () => {
  const [show, setShow] = useState(false);
  const {userData,setUserData,finalData,setFinalData}=useContext(StepperContext);

  const handleChange = (e)=>{
    const {name,value}=e.target;
    setUserData({...userData,[name]:value})
  };
  
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="referral" className="font-bold text-lg text-blue-600">Referral Code</label>
          <div className="flex w-full gap-2">
            <input
              type="text"
              id="referral"
              name='referral'
              value={userData["referral"] || ""}
              onChange={handleChange}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full"
              required
            />
            <div className="flex justify-center items-center py-1 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer ">
              <GrValidate className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="password" className="font-bold text-lg text-blue-600">Set Password</label>
          <div className="flex w-full gap-2">
            <input
              type={show ? "text" : "password"}
              id="password"
              name='password'
              value={userData["password"] || ""}
              onChange={handleChange}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full"
              required
            />
            <div
              className="flex justify-center items-center py-1 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer "
              onClick={() => setShow(!show)}
            >
              {show ? (
                <HiOutlineEyeOff className="text-2xl" />
              ) : (
                <HiOutlineEye className="text-2xl" />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full text-left gap-1">
          <label
            htmlFor="confPassword"
            className="font-bold text-lg text-blue-600"
          >
            {" "}
            Conform Password
          </label>
          <input
            type="text"
            id="confPassword"
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            required
          />
        </div>
      </div>
    </>
  );
};

export default Referral;
