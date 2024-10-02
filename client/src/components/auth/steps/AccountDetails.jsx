import React, { useContext } from "react";
import { StepperContext } from "../../../context/StepperContext";

const AccountDetails = () => {
  const { userData, setUserData, errors } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        <div className="flex flex-col w-full text-left gap-1">
          <label
            htmlFor="accountNo"
            className="font-bold text-lg text-blue-600"
          >
            Account Number
          </label>
          <input
            type="text"
            id="accountNo"
            name="accountNo"
            value={userData["accountNo"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            required
          />
          {errors.accountNo && (
            <p className="text-red-600 text-sm font-thin">{errors.accountNo}</p>
          )}
        </div>

        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="IFSCcode" className="font-bold text-lg text-blue-600">
            IFSCcode Code
          </label>
          <input
            type="text"
            id="IFSCcode"
            name="IFSCcode"
            value={userData["IFSCcode"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            required
          />
          {errors.IFSCcode && (
            <p className="text-red-600 text-sm font-thin">{errors.IFSCcode}</p>
          )}
        </div>

        <div className="flex flex-col w-full text-left gap-1">
          <label htmlFor="bank" className="font-bold text-lg text-blue-600">
            Bank{" "}
          </label>
          <input
            type="text"
            id="bank"
            name="bank"
            value={userData["bank"] || ""}
            onChange={handleChange}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            placeholder="eg. SBI"
            required
          />
          {errors.bank && (
            <p className="text-red-600 text-sm font-thin">{errors.bank}</p>
          )}
        </div>

        
      </div>
    </>
  );
};

export default AccountDetails;
