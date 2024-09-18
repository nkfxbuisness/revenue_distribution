import React from "react";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

const StepperNavigator = ({
  handleClick,
  steps,
  currentStep,
  submit,
  isSubmitted,
  submitAllowed,
  setSubmitAllowed
}) => {
  return (
    <>
      <div className="flex justify-around px-5 my-5">
        {/* {isSubmitted?" ": */}
        <button
          onClick={() => handleClick("back")}
          className={`flex items-center gap-3 px-4 py-2 bg-white text-slate-400 font-semibold border-2 border-slate-400 rounded-md hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out ${
            currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <HiArrowSmallLeft className="text-2xl" /> Back
        </button>

        {currentStep === steps.length ? (
          <button
            onClick={(e)=>submit(e)}
            className={`flex items-center gap-3 px-4 py-2 bg-blue-600 ${submitAllowed?"":"opacity-50 cursor-not-allowed"}  text-white font-semibold rounded-md  transition duration-300 ease-in-out`}  disabled={!submitAllowed}
          >
            Submit
            <HiArrowSmallRight className="text-2xl" />
          </button>
        ) : (
          <button
            onClick={() => handleClick("next")}
            className="flex items-center gap-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 ease-in-out "
          >
            Next <HiArrowSmallRight className="text-2xl" />
          </button>
        )}
      </div>
    </>
  );
};

export default StepperNavigator;
