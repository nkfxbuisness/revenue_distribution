import React, { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";

const CreateAdmins = () => {
  const [selectedRoales, setSelectedRoales] = useState([]);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedRoales([...selectedRoales, value]);
    } 
    else {
      setSelectedRoales(selectedRoales.filter((option) => option !== value));
    }
  };
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-3/4   h-full flex flex-col mx-auto ">
        <p className="flex justify-center font-semibold text-2xl text-blue-600 pb-5">
          Existing Admins
        </p>
        <div className="flex flex-col">
          <div className="flex px-2 items-center bg-yellow-200 py-1 rounded-lg">
            <p className="text-blue-500 font-semibold w-1/5">Sunirmal</p>
            <div className="flex flex-wrap gap-2 w-2/5">
              <span className="px-2 py-1 bg-blue-200 text-blue-600 font-semibold rounded-lg">
                Hello
              </span>
              <span className="px-2 py-1 bg-blue-200 text-blue-600 font-semibold rounded-lg">
                Hello
              </span>
              <span className="px-2 py-1 bg-blue-200 text-blue-600 font-semibold rounded-lg">
                Hello
              </span>
              <span className="px-2 py-1 bg-blue-200 text-blue-600 font-semibold rounded-lg">
                Hello
              </span>
              <span className="px-2 py-1 bg-blue-200 text-blue-600 font-semibold rounded-lg">
                Hello
              </span>
            </div>
            <p className="text-blue-500 font-semibold w-1/5">Created on</p>
            <button className="w-1/5 px-2 py-1 bg-blue-600 text-white font-semibold rounded-lg">
              Edit Access
            </button>
          </div>
        </div>

        <p className="pt-5 flex justify-center font-semibold text-2xl text-blue-600 pb-5">
          Create a new Admin
        </p>
        <div className="flex flex-col w-4/5 mx-auto">
          <label
            htmlFor="adminName"
            className="font-bold text-left py-2 text-lg text-blue-600"
          >
            Admin Name
          </label>
          {/* admin name  */}
          <input
            type="text"
            id="adminName"
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
          />
          <label
            htmlFor="adminRoles"
            className="font-bold text-left py-2 text-lg text-blue-600"
          >
            Admin Roles
          </label>
          {/* admin roles checkbox  */}
          <div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="accountActivation"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Account Activation
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="withdrawRequest"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Withdrawl Request
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="profitUpdate"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Profit Update
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="updateDiposite"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Deposit Update
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="ComissionDistribution"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Comission Distribution
              </label>
            </div>
          </div>
          {/* set password   */}
          <div className="flex flex-col w-full text-left gap-1 py-2">
            <label
              htmlFor="password"
              className="font-bold text-lg text-blue-600"
            >
              Set Password
            </label>
            <div className="flex w-full gap-2">
              <input
                type={show ? "text" : "password"}
                id="adminPassword"
                // value={userData["password"] || ""}
                // onChange={handleChange}
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
          <div className="flex flex-col w-full text-left gap-1 py-2">
            <label
              htmlFor="confPassword"
              className="font-bold text-lg text-blue-600"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="adminConfPassword"
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
              required
            />
          </div>
          {/* create admin  */}
          <button 
            className="bg-blue-600 text-white font-semibold my-5 py-1 px-2 rounded-lg w-fit"
            onClick={()=>console.log(selectedRoales)}
          >
            Create Admin
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAdmins;
