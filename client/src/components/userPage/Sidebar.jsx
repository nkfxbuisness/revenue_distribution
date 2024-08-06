import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { PiHandWithdrawFill } from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GrValidate } from "react-icons/gr";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const fields = [
    {
      name: "Dashboard",
      route: "dashboard",
      icon: <MdDashboard />,
      isActive: currentPath.includes("dashboard"),
    },
    {
      name: "Wallet",
      route: "wallet",
      icon: <FaWallet />,
      isActive: currentPath.includes("wallet"),
    },
    {
      name: "Withdraw",
      route: "withdraw",
      icon: <PiHandWithdrawFill />,
      isActive: currentPath.includes("withdraw"),
    },
    {
      name: "Referral",
      route: "referral",
      icon: <GrValidate />,
      isActive: currentPath.includes("referral"),
    },
    {
      name: "Genealogy",
      route: "team",
      icon: <RiTeamLine />,
      isActive: currentPath.includes("team"),
    },
    {
      name: "Logout",
      route: "",
      icon: <BiLogOut />,
    },
  ];
  

  return (
    <>
      <div
        className=" flex flex-col h-screen fixed right-0 bg-white pl-0 pr-3 py-5 mx-2 mt-12"
        style={{ width: 285}}
      >
        {fields.map((field) => (
          <>
            {field.isActive ? (
              <Link to={`${field.route}`}>
                <div className="w-full h-10 bg-blue-50 text-blue-800 border-l-2 border-blue-800 font-bold flex my-2 rounded-r-md pr-2 pl-5 py-4 gap-2 items-center">
                  <span className="text-2xl items-center ">
                    {field.icon}
                  </span>
                  {field.name}
                </div>
              </Link>
            ) : (
              <Link to={`${field.route}`}>
                <div className="w-full h-10 bg-white flex  my-2 rounded-r-md pr-2 pl-5 py-4  gap-2 items-center">
                  <span className="text-2xl items-center ">
                    {field.icon}
                  </span>
                  {field.name}
                </div>
              </Link>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
