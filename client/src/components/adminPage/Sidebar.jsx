import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GrValidate } from "react-icons/gr";
import { MdOutlineManageAccounts } from "react-icons/md";
import user from "../toast/user";
import { SiTicktick } from "react-icons/si";
import { PiHandWithdrawFill } from "react-icons/pi";
import { RiUserAddFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { GrAnnounce } from "react-icons/gr";
import AdminContext from "../../context/AdminContext";

const Sidebar = () => {
  let navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(AdminContext);
  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminToken");
    setAdmin("");
    setToken("");
    navigate("/admin/login");
  };
  const location = useLocation();
  const currentPath = location.pathname;
  const fields = [
    {
      name: "Account Activation",
      route: "accountActivation",
      icon: <SiTicktick />,
      isActive: currentPath.includes("accountActivation"),
    },
    {
      name: "Withdrawl Requests",
      route: "withdrawRequest",
      icon: <BiTransfer />,
      isActive: currentPath.includes("withdrawRequest"),
    },
    {
      name: "Profit Update",
      route: "profitUpdate",
      icon: <GrUpdate />,
      isActive: currentPath.includes("profitUpdate"),
    },
    // {
    //   name: "Update Diposite",
    //   route: "updateDiposite",
    //   icon: <GrValidate />,
    //   isActive: currentPath.includes("updateDiposite"),
    // },
    {
      name: "Comission Distribution",
      route: "ComissionDistribution",
      icon: <RiTeamLine />,
      isActive: currentPath.includes("ComissionDistribution"),
    },
    {
      name: "Create Admin",
      route: "createAdmin",
      icon: <RiUserAddFill />,
      isActive: currentPath.includes("createAdmin"),
    },
    {
      name: "Post Announcement",
      route: "postAnnouncement",
      icon: <GrAnnounce />,
      isActive: currentPath.includes("postAnnouncement"),
    },
    // {
    //   name: "Logout",
    //   route: "",
    //   icon: <BiLogOut />,
    // },
  ];

  return (
    <>
      <div
        className=" flex flex-col h-screen fixed right-0 bg-white pl-0 pr-3 py-5 mx-2 mt-12"
        style={{ width: 285 }}
      >
        {fields.map((field,index) => (
          <>
            {field.isActive ? (
              <Link to={`${field.route}`} key={index}>
                <div className="w-full h-10 bg-blue-50 text-blue-800 border-l-2 border-blue-800 font-bold flex my-2 rounded-r-md pr-2 pl-5 py-4 gap-2 items-center">
                  <span className="text-2xl items-center ">{field.icon}</span>
                  {field.name}
                </div>
              </Link>
            ) : (
              <Link to={`${field.route}`} key={index}>
                <div className="w-full h-10 bg-white flex  my-2 rounded-r-md pr-2 pl-5 py-4  gap-2 items-center">
                  <span className="text-2xl items-center ">{field.icon}</span>
                  {field.name}
                </div>
              </Link>
            )}
          </>
        ))}
        <div
          className="w-full h-10 bg-white flex  my-2 rounded-r-md pr-2 pl-5 py-4  gap-2 items-center cursor-pointer"
          onClick={() => logoutHandler()}
        >
          <span className="text-2xl items-center ">
            <BiLogOut />
          </span>
          Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
