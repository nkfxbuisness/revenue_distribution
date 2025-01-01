import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowSmRight } from "react-icons/hi";

const ComissionDistribution = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-screen h-full justify-center items-center text-2xl text-blue-600 font-bold">
        <div className="w-1/2 h-full mx-auto flex flex-col justify-center items-center gap-5">
          <div
            className="h-20 w-full rounded-md bg-blue-600 flex items-center justify-center shadow-md  hover:-translate-y-1 duration-100 cursor-pointer"
            onClick={() =>
              navigate("/admin/ComissionDistribution/setComission")
            }
          >
            <p className="text-white font-bold text-2xl">
              Set Levelwise Comission
            </p>
          </div>
          <div
            className="h-20 w-full rounded-md bg-blue-600 flex items-center justify-center shadow-md  hover:-translate-y-1 duration-100 cursor-pointer"
            onClick={() =>
              navigate("/admin/ComissionDistribution/startDistributing")
            }
          >
            <p className="text-white font-bold text-2xl">
              Start Distributing Comission
            </p>
          </div>
          <div
            className="h-20 w-full rounded-md bg-blue-600 flex items-center justify-center shadow-md  hover:-translate-y-1 duration-100 cursor-pointer"
            onClick={() =>
              navigate("/admin/ComissionDistribution/report")
            }
          >
            <p className="text-white font-bold text-2xl">
              Generate and Downlad Report
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ComissionDistribution;
