import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stepper from "../components/auth/Stepper";
import StepperNavigator from "../components/auth/StepperNavigator";
import BasicInfo from "../components/auth/steps/BasicInfo";
import SetCredentials from "../components/auth/steps/SetCredentials";
import AccountDetails from "../components/auth/steps/AccountDetails";
import KYCdetails from "../components/auth/steps/KYCdetails";
// import Referral from "../components/auth/steps/";
import { StepperContext } from "../context/StepperContext";
import showToastMessage from "../components/toast/Toast";
import { MdOutlineLogin } from "react-icons/md";
import userSchema from "../data_validation/signupFormValidation";

const RegistrationPage = () => {
  let navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toLoginPage = () => {
    navigate("/login");
  };

  // const [referralCode, setReferralCode] = useState("");
  const [referralCodeField, setReferralCodeField] = useState(false);
  const [referralCodeStatus, setReferralCodeStatus] = useState("");
  const [OTPfield, setOTPfield] = useState(false);
  const [enterOTP, setEnterOTP] = useState("");
  const [OTPverified, setOTPVerified] = useState({
    success:false,
    message:""
  });
  const [submitAllowed, setSubmitAllowed] = useState(false);

  const steps = [
    "Set your credentials",
    "Basic Information",
    "Bank Account",
    "KYC Details",
  ];

  //   console.log(steps);

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <SetCredentials />;
      case 2:
        return <BasicInfo />;
      case 3:
        return <AccountDetails />;
      case 4:
        return <KYCdetails />;
      default:
        return null;
    }
  };
  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bound
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    console.log(userData)
    
    // e.preventDefault();
    if (!userData) {
      showToastMessage("warn", "fill the form first !!");
      return;
    }
    const { error } = userSchema.validate(userData, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(errorMessages);
      return;
    }
    console.log("userData",userData)
    console.log("errors",errors)
    console.log("OTPfield",OTPverified)
    console.log("referral",referralCodeField)
    if(!referralCodeField){
      console.log("referral code not verified !");
      
      showToastMessage("warn","Referral Code must be verified before proceeding farther !!");
      return;
    }
    if(!OTPverified.success){
      console.log("email code not verified !");
      showToastMessage("warn","email must be verified before proceeding farther !!");
      return;
    }

    // setFinalData(userData);

    
    try {
      console.log("try");
      
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data} = await axios.post(
        "http://localhost:4000/api/auth/user/signup",
        userData,
        config
      );
      console.log(data);
      if(data?.success){
        showToastMessage("success", "Registration Successful !");
        navigate("/auth/login");
        setIsSubmitted(true);
        localStorage.setItem("userInfo", JSON.stringify(data?.data));
      }else{
        showToastMessage("error", data?.message);
      }
      // setLoading(false);
    } catch (error) {
      showToastMessage("error", `${error}`);
      // setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full flex ">
        <div className="w-3/4 h-screen bg-blue-50 text-red-500 mx-auto">
          {/* stepper */}
          <Stepper
            steps={steps}
            currentStep={currentStep}
            isSubmitted={isSubmitted}
          />

          {/* body  */}
          {isSubmitted ? (
            <div className="my-10 p-10 h-96 flex flex-col items-center justify-center">
              {/* {console.log(isSubmitted)} */}
              <img
                src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png"
                alt=""
              />
              <p className="text-green-400 text-2xl font-semibold py-5">
                Registration done ! Proceed to login
              </p>
            </div>
          ) : (
            <div className="my-10 p-10 h-96 overflow-y-auto">
              <StepperContext.Provider
                value={{
                  userData,
                  setUserData,
                  finalData,
                  setFinalData,
                  // referralCode,
                  // setReferralCode,
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
                  errors,
                  submitAllowed,
                  setSubmitAllowed
                }}
              >
                {/* {console.log(userData)} */}
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </div>
          )}

          {/* stepper navigator*/}
          {isSubmitted ? (
            <div className="flex justify-center items-center px-5 my-5">
              <button
                onClick={toLoginPage}
                className="flex items-center gap-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 ease-in-out "
              >
                Login <MdOutlineLogin className="text-2xl" />
              </button>
            </div>
          ) : (
            <StepperNavigator
              handleClick={handleClick}
              steps={steps}
              currentStep={currentStep}
              submit={submit}
              isSubmitted={isSubmitted}
              submitAllowed={submitAllowed}
              setSubmitAllowed={setSubmitAllowed}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
