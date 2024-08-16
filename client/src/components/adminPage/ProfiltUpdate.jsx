import React, { useState } from "react";

const ProfiltUpdate = () => {
  const [role, setRole] = useState("");
  return (
    <>
      <div className="w-3/4  h-full flex flex-col mx-auto bg-green-200 ">
        <p className="flex justify-center font-semibold text-2xl text-blue-600 pb-5">
          Profit Update
        </p>
        <div className="flex flex-col w-4/5 bg-yellow-200 mx-auto">
          <div>
            <div className="flex gap-3">
              <div className="flex gap-2 items-center p-4 w-full border-2 border-blue-600 text-blue-600 font-semibold rounded">
                <input
                  type="radio"
                  id="profit"
                  // name="role"
                  value="profit"
                  checked={role === "profit"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="profit" className="cursor-pointer">Profit</label>
              </div>
              <div className="flex gap-2 items-center p-4 w-full border-2 border-blue-600 text-blue-600 font-semibold rounded">
                <input
                  type="radio"
                  id="loss"
                  // name="role"
                  value="loss"
                  checked={role === "loss"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="loss" className="cursor-pointer">Loss</label>
              </div>
            </div>
          </div>
          <label
            htmlFor="withdrawlAmount"
            className="font-bold text-lg text-blue-600 py-2 text-left"
          >
            Profit / Loss in percentage
          </label>

          <input
            type="number"
            id="profitUpdate"
            name="profitUpdate"
            placeholder="Enter % profit / loss"
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default ProfiltUpdate;
