import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../components/auth/Stepper";
import StepperNavigator from "../components/auth/StepperNavigator";
import BasicInfo from "../components/auth/steps/BasicInfo";
import SetCredentials from "../components/auth/steps/SetCredentials";
import AccountDetails from "../components/auth/steps/AccountDetails";
import KYCdetails from "../components/auth/steps/KYCdetails";
// import Referral from "../components/auth/steps/";
import { StepperContext } from "../context/StepperContext";
import showToastMessage from "../components/toast/Toast";
import successVideo from "../components/images/success.mp4"
import { MdOutlineLogin } from "react-icons/md";

const RegistrationPage = () => {
    let navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toLoginPage=()=>{
    navigate("/login")
  }

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

  const submit = () => {
    if(!userData) {
        showToastMessage("warn","fill the form first !!")
        return;
    }
    let temp =userData;
    // console.log("hello")
    setFinalData(userData);


    const fields = [
      "DOB",
      "IFSC",
      "PAN",
      "aadhaar",
      "bankName",
      "accountNumber",
      "email",
      "mobile",
      "password",
      "referral",
      "userName",
    ];
    console.log(userData)
    // Iterate through the array of fields
    for (let field of fields) {
        // console.log(temp[field])
      if (!temp[field] || temp[field]==="") {
        console.log(`no ${field}`);
        showToastMessage("error", `${field} not provided`);
        return;
      }
    }
    setIsSubmitted(true)
    showToastMessage("success", "Registrarion successful !!");
    console.log("submitted data",temp);
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
              <p className="text-green-400 text-2xl font-semibold py-5">Registration done ! Proceed to login</p>
            </div>
          ) : (
            <div className="my-10 p-10 h-96 overflow-y-auto">
              <StepperContext.Provider
                value={{
                  userData,
                  setUserData,
                  finalData,
                  setFinalData,
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
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
