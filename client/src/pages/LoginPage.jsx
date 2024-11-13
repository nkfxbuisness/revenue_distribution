import React, { useState , useContext } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import {HiArrowSmallRight} from "react-icons/hi2"
import showToastMessage from "../components/toast/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FaExternalLinkAlt } from "react-icons/fa";

const LoginPage = () => {
  let navigate = useNavigate();
  const {setUser,setToken} = useContext(UserContext)
  // console.log(user,token)
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  const [show, setShow] = useState(false);
  const navigateToSignup = ()=>{
    navigate("/auth/register")
  }

  const submit = async () => {
    if (!email || !password) {
      showToastMessage("warn", "credentials not provided !!");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data} = await axios.post(
        "http://localhost:4000/api/auth/user/login",
        {
            email,
            password
        },
        config
      );
      console.log(data);
      console.log(data.user);
      if(data.success){
        setUser(data.user);
        setToken(data.token);
        showToastMessage("success", "Login Successful !");
        navigate("/user");
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      }else{
        showToastMessage("error",data?.message)
      }

    } catch (error) {
      showToastMessage("error", `${error}`);
    }
;
  };
  return (
    <>
      <div className="w-full h-screen bg-blue-50 flex mx-auto">
        <div className="w-1/3 h-full flex flex-col gap-4 mx-auto justify-center">
          <p className="flex justify-center font-semibold text-2xl text-blue-600">
            Login
          </p>
          {/* email  */}
          <div className="flex flex-col text-left gap-2">
            <label
              htmlFor="email"
              className="font-bold text-lg text-blue-600 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            />
          </div>

          {/* Enter password   */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="password"
              className="font-bold text-lg text-blue-600"
            >
              Enter Password
            </label>
            <div className="flex w-full gap-2">
              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full shadow-md"
                required
              />
              <div
                className="flex justify-center items-center py-1 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer shadow-md"
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

          <button
            onClick={submit}
            className="flex w-fit items-center gap-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 ease-in-out "
          >
            Login
            <HiArrowSmallRight className="text-2xl" />
          </button>
          <p className="flex gap-2 justify-center items-center text-blue-600 font-thin text-lg">Don't have an account ?
            <span className="flex font-semibold pl-2 gap-1 items-center underline cursor-pointer" onClick={navigateToSignup}>Signup <FaExternalLinkAlt/></span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
