import React, { useContext} from "react";
import { StepperContext } from "../../../context/StepperContext";


const BasicInfo = () => {
  const {userData,setUserData,errors}=useContext(StepperContext);

  const handleChange = (e)=>{
    const {name,value}=e.target;
    setUserData({...userData,[name]:value})
  };
  
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        {/* name  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="name" className="font-bold text-lg text-blue-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData["name"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            required
          />
          {errors.name && <p className="text-red-600 text-sm font-thin">{errors.name}</p>}
        </div>
        
        {/* mobileNoNo  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="mobileNo" className="font-bold text-lg text-blue-600">
            Mobile No.
          </label>
          <input
            type="number"
            id="mobileNo"
            name="mobileNo"
            value={userData["mobileNo"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
          />
          {errors.mobileNo && <p className="text-red-600 text-sm font-thin">{errors.mobileNo}</p>}
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
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
          />
          {errors.DOB && <p className="text-red-600 text-sm font-thin">{errors.DOB}</p>}
        </div>

        {/* address  */}
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="address" className="font-bold text-lg text-blue-600">
            Address <span className="font-thin">(As per of KYC documents)</span>
          </label>
          <textarea
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            id="address"
            name="address"
            value={userData["address"] || ""}
            onChange={handleChange}
          />
          {errors.address && <p className="text-red-600 text-sm font-thin">{errors.address}</p>}
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
