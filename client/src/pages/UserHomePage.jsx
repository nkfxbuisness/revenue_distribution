import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/userPage/Navbar";
import Sidebar from "../components/userPage/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { checkTokenExpiration } from "../context/UserContext";
import UserContext from "../context/UserContext";

const UserHomePage = () => {
  let navigate = useNavigate();
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    console.log(storedUser);
    
    const storedToken = localStorage.getItem("token");
    if (!storedUser || !storedToken) {
      console.log("no user or token found in localstorege / loggedout");
      navigate("/auth/login");
    } else if (!checkTokenExpiration(storedToken)) {
      console.log("token validation expired");
      navigate("/auth/login");
    } else if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar />
        <div
          className="mt-12 w-full mr-[280] min-h-screen h-full  bg-blue-50 "
          style={{ marginRight: 280 }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
