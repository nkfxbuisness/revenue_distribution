import React, { useContext } from 'react'
import { StepperContext } from '../../../context/StepperContext'
const BasicInfo = () => {
  const {userData,setUserData}=useContext(StepperContext);
  const handleChange = (e)=>{
    const {name,value}=e.target;
    setUserData({...userData,[name]:value})
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
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
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="email" className="font-bold text-lg text-blue-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData["email"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
          />
        </div>
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
        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="address" className="font-bold text-lg text-blue-600">
            Address <span className="font-thin">(As per of KYC documents)</span>
          </label>
          <textarea
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
            id='address'
            name="address"
            value={userData["address"] || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* {console.log(userData)} */}
    </>
  );
}

export default BasicInfo