import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { PiHandWithdrawFill } from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GrValidate } from "react-icons/gr";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import UserContext from "../../context/UserContext";
// import

const Sidebar = () => {
  let navigate = useNavigate();
  const { user, setUser, setToken } = useContext(UserContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUser("");
    setToken("");
    navigate("/auth/login");
  };
  const accountActivation = {
    name: "Active Account",
    route: `activeAccount/${user?._id}`,
    icon: <MdOutlineManageAccounts />,
    isActive: currentPath.includes("activeAccount"),
  };
  const fields = [
    {
      name: "Dashboard",
      route: `dashboard/${user?._id}`,
      icon: <MdDashboard />,
      isActive: currentPath.includes("dashboard"),
    },
    {
      name: "Wallet",
      route: `wallet/${user?._id}`,
      icon: <FaWallet />,
      isActive: currentPath.includes("wallet"),
    },
    {
      name: "Withdraw",
      route: `withdraw/${user?._id}`,
      icon: <PiHandWithdrawFill />,
      isActive: currentPath.includes("withdraw"),
    },
    {
      name: "Referral",
      route: `referral/${user?._id}`,
      icon: <GrValidate />,
      isActive: currentPath.includes("referral"),
    },
    {
      name: "Total Business",
      route: `totalBusiness/${user?._id}`,
      icon: <AiOutlineDollar />,
      isActive: currentPath.includes("totalBusiness"),
    },
    {
      name: "Team Business",
      route: `teamBusiness/${user?._id}`,
      icon: <RiTeamLine />,
      isActive: currentPath.includes("teamBusiness"),
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
        {user.activationStatus.suspended?"":<>
        {user.activationStatus.active ? (
          ""
        ) : (
          <>
            {accountActivation?.isActive ? (
              <Link to={`${accountActivation.route}`}>
                <div className="w-full h-10 bg-blue-50 text-blue-800 border-l-2 border-blue-800 font-bold flex my-2 rounded-r-md pr-2 pl-5 py-4 gap-2 items-center">
                  <span className="text-2xl items-center ">
                    {accountActivation.icon}
                  </span>
                  {accountActivation.name}
                </div>
              </Link>
            ) : (
              <Link to={`${accountActivation.route}`}>
                <div className="w-full h-10 bg-white flex  my-2 rounded-r-md pr-2 pl-5 py-4  gap-2 items-center">
                  <span className="text-2xl items-center ">
                    {accountActivation.icon}
                  </span>
                  {accountActivation.name}
                </div>
              </Link>
            )}
          </>
        )}

        {user?.activationStatus.active ? (
          <>
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
            <div
              className="w-full h-10 bg-white flex  my-2 rounded-r-md pr-2 pl-5 py-4  gap-2 items-center cursor-pointer"
              onClick={() => logoutHandler()}
            >
              <span className="text-2xl items-center ">
                <BiLogOut />
              </span>
              Logout
            </div>
          </>
        ) : (
          ""
        )}
        </>}
      </div>
    </>
  );
};

export default Sidebar;
