import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCircleDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
// import { BiLogOut } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import AdminContext from "../../context/AdminContext";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  let navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(AdminContext);
  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminToken");
    setAdmin("");
    setToken("");
    navigate("/admin/login");
  };
  return (
    <>
      <div className="flex w-full justify-between px-10 py-2 bg-white text-blue-800 items-center fixed top-0 z-30">
        <div className="flex gap-2 items-center">
          <BsGraphUpArrow className="text-2xl text-blue-800" />
          <p className="text-2xl font-bold">Revenue Distribution</p>
          <p className="text-2xl font-bold">| Admin Panel</p>
        </div>

        <div className="flex  gap-5 items-center justify-between">
          <div className="flex gap-2 items-center px-5">
            <FiUser className="text-blue-800 text-2xl" />
            <p className="text-xl font-thin">{admin.name}</p>
            <MdOutlineLogout
              className="text-blue-800 text-2xl cursor-pointer"
              onClick={() => logoutHandler()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
