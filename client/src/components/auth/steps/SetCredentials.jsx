import React, { useContext, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { GrValidate } from "react-icons/gr";
import showToastMessage from "../../toast/Toast";
import Temp from "../Temp";
import axios from "axios";

const SetCredentials = () => {
  const {
    userData,
    setUserData,
    referralCode,
    setReferralCode,
    referralCodeField,
    setReferralCodeField,
    referralCodeStatus,
    setReferralCodeStatus,
    OTPfield,
    setOTPfield,
    enterOTP,
    setEnterOTP,
    OTPverified,
    setOTPVerified,
    errors
  } = useContext(StepperContext);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const verifyReferralCode = async () => {
    if (!referralCode || referralCode === "") {
      showToastMessage("warn", "provide referral code");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/user/signup/verifyReferralCode",
        { referralCode },
        config
      );
      setReferralCodeStatus(data.message);
      setReferralCodeField(data.success);
    } catch (error) {
      showToastMessage("error", error.message);
    }
  };
  const generateOTP = async()=>{
    setOTPfield(true);
    if(!userData["email"]){
      showToastMessage("warn","enter email first")
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/user/signup/generateOTP",
        { email: userData["email"] },
        config
      );
    } catch (error) {
      showToastMessage("error", error);
    }
  }
  const verifyOTP = async () => {
    console.log(enterOTP);
    if (!enterOTP || enterOTP === "") {
      showToastMessage("warn", "provide OTP");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/user/signup/verifyOTP",
        { email: userData["email"], otp: enterOTP },
        config
      );
      console.log(data);
      setOTPVerified(data);
      if(data.success){
        setOTPfield(false);
      }else{
        setEnterOTP("")
      }
    } catch (error) {
      showToastMessage("error", error);
    }
  };

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
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className={` text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full  ${
                referralCodeField ? "bg-green-300" : "bg-white"
              }`}
              required
              disabled={referralCodeField}
            />
            <button
              className={`flex justify-center items-center py-1 px-2 rounded-md h-full bg-blue-600 text-white ${
                referralCodeField
                  ? "cursor-default opacity-50"
                  : "cursor-pointer"
              } cursor-pointer `}
              onClick={verifyReferralCode}
              disabled={referralCodeField}
            >
              Verify <GrValidate className="text-2xl ml-3" />
            </button>
          </div>
          <p
            className={`text-xs font-light text-blue-600`}
          >Click on "Verify" before proceeding farther</p>
          <p
            className={`text-sm font-light ${
              referralCodeField ? "text-green-600" : "text-red-600"
            }`}
          >
            {referralCodeStatus}
          </p>
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
          {errors.password && <p className="text-red-600 text-sm font-thin">{errors.password}</p>}
          <ul className="list-disc text-xs font-light ml-3 text-blue-600">
            <li>Password should have minimum 5 characters</li>
            <li>Password should have minimum 1 uppercase</li>
            <li>Password should have minimum 1 number</li>
          </ul>
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
          {errors.confPassword && <p className="text-red-600 text-sm font-thin">{errors.confPassword}</p>}
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
              className={`w-full text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 ${
                OTPverified.success ? "bg-green-300" : "bg-white"
              }`}
              disabled={OTPverified.success}
            />
            <button
              className={`flex justify-center items-center py-1 rounded-md px-2 text-nowrap h-full bg-blue-600 text-white cursor-pointer ${OTPverified.success?"opacity-50 cursor-default":""}`}
              onClick={() => generateOTP()}
              disabled={OTPverified.success}
            >
              Get OTP
            </button>
          </div>
          <p className="text-blue-600 text-xs font-light">Verify email using OTP</p>
          {errors.email && <p className="text-red-600 text-sm font-thin">{errors.email} | {OTPverified.success?"":"verify the email before proceed farther"}</p>}
          <p className={`${OTPverified.success?"text-green-600":"text-red-600"} text-xs font-light`}>{OTPverified.message}</p>
          {OTPfield ? (
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <label className="font-bold text-lg text-blue-600 "> 
                Enter 6 digit code
              </label>
              <Temp
                verifyOTP={verifyOTP}
                enterOTP={enterOTP}
                setEnterOTP={setEnterOTP}
                OTPverified={OTPverified}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* {console.log(userData)} */}
    </>
  );
};

export default SetCredentials;
