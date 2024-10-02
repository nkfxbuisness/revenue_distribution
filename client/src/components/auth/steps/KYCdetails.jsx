import React, { useContext, useState } from "react";
import { MdUpload } from "react-icons/md";
import { StepperContext } from "../../../context/StepperContext";

const KYCdetails = () => {
  
  const { userData, setUserData, errors,submitAllowed,setSubmitAllowed } = useContext(StepperContext);
  const [pan, setPan] = useState();
  const [aadhaar, setAadhaar] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleFileChange = (doc, e) => {
    if (doc === "pan") {
      setPan(e.target.files[0]);
      document.getElementById("PANfileName").innerHTML = pan?.name;
    }
    if (doc == "aadhaar") {
      setAadhaar(e.target.files[0]);
      document.getElementById("AadhaarFileName").innerHTML = aadhaar?.name;
    }
  };
  const handleUpload = () => {
    document
      .getElementById("PANupload")
      .addEventListener("change", function (event) {
        const fileName = event.target.files[0]
          ? event.target.files[0].name
          : "No file chosen";
        document.getElementById("PANfileName").textContent = fileName;
      });
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="PANno" className="font-bold text-lg text-blue-600">
            PAN No.
          </label>
          <input
            type="text"
            id="PANno"
            name="PANno"
            value={userData["PANno"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            required
          />
          {errors.PANno && (
            <p className="text-red-600 text-sm font-thin">{errors.PANno}</p>
          )}
        </div>

        {/* <div>
          <div className="text-left">
            <label
              htmlFor="PANupload"
              className="font-bold text-lg text-blue-600 text-left"
            >
              Upload PAN Card
            </label>
            <p className="text-blue-600 text-sm font-thin mb-1">
              Make sure to click on the upload button before proceed to the next
              step{" "}
            </p>
          </div>
          <div className="flex  w-full text-left gap-2">
            <input
              type="file"
              id="PANupload"
              className="w-full hidden"
              onChange={(e) => handleFileChange("pan", e)}
            />
            {console.log(pan.name)}
            <div className="flex w-full rounded-md">
              <label
                htmlFor="PANupload"
                className="w-32 cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-l-md"
              >
                Select file
              </label>
              <div
                className="px-4 py-2 bg-white w-full rounded-r-md text-black"
                id="PANfileName"
              ></div>
            </div>
            <div className="flex justify-center items-center py-2 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer">
              <MdUpload className="text-2xl" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-blue-600 text-xs font-thin my-1">
              Acceptable format .jpg , .jpeg , .png{" "}
            </p>
          </div>
        </div> */}

        <div className="flex flex-col w-full text-left gap-1">
          <label
            htmlFor="aadhaarNo"
            className="font-bold text-lg text-blue-600"
          >
            Aadhaar No.
          </label>
          <input
            type="number"
            id="aadhaarNo"
            name="aadhaarNo"
            value={userData["aadhaarNo"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            required
          />
          {errors.aadhaarNo && (
            <p className="text-red-600 text-sm font-thin">{errors.aadhaarNo}</p>
          )}
        </div>

        <div className="flex items-center justify-start">
          <input
            type="checkbox"
            id="t&c"
            name="t&c"
            checked={submitAllowed}
            onChange={(e) => setSubmitAllowed(e.target.checked)}
            className="px-5 w-8 h-8 cursor-pointer"
          />
          {console.log("tc", submitAllowed)}
          <label
            htmlFor="t&c"
            className="text-blue-600 text-base font-thin text-start pl-5"
          >
            I hereby agree to the{" "}
            <a
              href="https://rukminim2.flixcart.com/image/850/1000/kyq62kw0/card/y/z/z/100-thankyoucard-design-3-greeting-easin-original-imagawhnagezaa6e.jpeg?q=90&crop=false"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              terms and conditions
            </a>
            and confirm that the information provided is accurate and truthful
          </label>
        </div>
      </div>
      {/* {console.log(userData)} */}
    </>
  );
};

export default KYCdetails;
