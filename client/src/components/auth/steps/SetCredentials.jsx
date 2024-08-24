import React, { useContext, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { GrValidate } from "react-icons/gr";
import showToastMessage from "../../toast/Toast";

const SetCredentials = () => {

  const { userData, setUserData } = useContext(StepperContext);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const [emailOTP,setEmailOTP]=useState(false)
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        {/* referral code  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="referral" className="font-bold text-lg text-blue-600">
            Referral Code
          </label>
          <div className="flex w-full gap-2">
            <input
              type="text"
              id="referral"
              name="referral"
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

        {/* set password   */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="password" className="font-bold text-lg text-blue-600">
            Set Password
          </label>
          <div className="flex w-full gap-2">
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
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
        
        {/* confPassword  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label
            htmlFor="confPassword"
            className="font-bold text-lg text-blue-600"
          >
            Confirm Password
          </label>
          <input
            type="text"
            id="confPassword"
            name="confPassword"
            value={userData["confPassword"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            required
          />
        </div>

        {/* email  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="email" className="font-bold text-lg text-blue-600">
            Email
          </label>
          <div className="flex w-full gap-2">
            <input
              type="email"
              id="email"
              name="email"
              value={userData["email"] || ""}
              onChange={handleChange}
              className="w-full text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            />
            <div className="flex justify-center items-center py-1 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer " onClick={()=>setEmailOTP(true)}>
              <p className="text-lg font-bold" >OTP</p>
            </div>
          </div>
          {emailOTP?
          <input
              type="text"
              // id="email"
              // name="email"
              // value={userData["email"] || ""}
              // onChange={handleChange}
              placeholder="Enter the 6 digit OTP revieved on mail"
              className="w-full text-black py-1 px-2 mt-4 rounded-md outline-none focus:outline-blue-400"
            />:""}
        </div>
      </div>
      {/* {console.log(userData)} */}
    </>
  );
};

export default SetCredentials;
