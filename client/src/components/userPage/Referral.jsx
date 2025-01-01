import React, { useContext, useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import axios from "axios";
import showToastMessage from "../../util/toast/Toast";
import getFormattedDate from "../../util/date/getFormattedDate";
import { useNavigate } from "react-router-dom";
import Spinner from "../../util/animation/Spinner";
import PulseLoader from "../../util/animation/PulseLoader";

const Referral = ({ifSuspendedOrInactive}) => {
  let navigate = useNavigate();
  const { user, token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  // const ifSuspendedOrInactive = () => {
  //   if (user.activationStatus.suspended) {
  //     navigate(`/user/suspended/${user._id}`);
  //     return false;
  //   }
  //   if (!user.activationStatus.active) {
  //     navigate(`/user/activeAccount/${user._id}`);
  //     return false;
  //   }
  //   return true;
  // };
  const [disclosure, setDisclosure] = useState(false);
  const [children, setChildren] = useState([]);
  // console.log("children",children);

  const copy = () => {
    const referralCode = document.getElementById("referralCode");
    console.log(referralCode.innerHTML);
    navigator.clipboard.writeText(referralCode.innerHTML);
    alert("coppied to clipboard");
  };
  const getImmidiateChildren = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getImmidiateChildren/${user._id}`,
        config
      );
      console.log(data);
      if (data.success) {
        setChildren(data.data);
      }
      setLoading(false);
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    let temp = ifSuspendedOrInactive();
    if (temp) getImmidiateChildren();
  }, []);

  return (
    <>
      <div className="flex flex-col w-4/5 p-5 mx-auto rounded-lg h-screen ">
        <p className="flex justify-center gap-2 items-center font-bold text-3xl text-blue-600 py-5">
          Refer Someone <span>{loading?<Spinner size={"large"}/>:""}</span>
        </p>
        {/* information  */}
        <Disclosure>
          <DisclosureButton
            className="group flex mt-4 items-center gap-2 bg-yellow-100 rounded-md"
            onClick={() => setDisclosure(!disclosure)}
          >
            <span className="flex py-3 pl-3 items-center gap-4 justify-center text-lg font-semibold">
              <IoMdInformationCircleOutline className="text-xl" />
              <p>Important Information</p>
            </span>
            {disclosure ? (
              <IoIosArrowUp className="" />
            ) : (
              <IoIosArrowDown className="" />
            )}
          </DisclosureButton>

          <DisclosurePanel className="text-start font-light pl-5 pb-3 bg-yellow-100 rounded-b-md">
            <ul className="list-disc text-sm">
              <li>Refer someone to earn comission</li>
              <li>
                Comission will be added based on the profit earned by your
                subordinates upto level 20
              </li>
              <li>
                Earned comission will be conflicted in your wallet and can be
                withdrawl on regular interval
              </li>
              <li>
                The immediate subordinates will be conflicted below in this page
                , and the detailed hirearchy is in the Generalogy page
              </li>
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* refeffal code  */}
        <div className="flex w-full mt-5">
          <span className="flex font-light text-2xl text-blue-600 items-center pr-5">
            Your refferal code
          </span>
          <span className="p-3 bg-white text-blue-600 font-bold text-2xl rounded-l-lg shadow-md">
            <code id="referralCode">{user.referralCode}</code>
          </span>
          <span
            className="p-3 bg-blue-600 text-white font-bold text-2xl cursor-pointer rounded-r-lg"
            onClick={copy}
          >
            <FaCopy className="text-4xl" />
          </span>
        </div>

        <p className="text-2xl text-blue-600 font-light text-left pt-8 pb-1">
          Your Immediate Subordinates
        </p>
        {/* table  */}
        <div className="w-full text-left rounded-md ">
          {/* table header  */}
          <div className="sticky top-12 mt-2 flex px-2 py-1 text-sm w-full  bg-blue-600 text-white text-center font-semibold rounded-md items-center text-wrap">
            <div className=" text-center py-2 px-2  w-1/12">No</div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-4/12">
              Name
            </div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-4/12">
              Email
            </div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-3/12">
              Joined on
            </div>
          </div>
          
          {loading?<PulseLoader repeat={5}/>:<>
          {/* table rows  */}
          {children.length === 0 ? (
            <div className="mt-2 text-lg text-blue-600 font-semibold w-full h-16  bg-white flex justify-center items-center rounded-md">
              Not referred to anyone
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full mt-1 py-2 rounded-md">
              {children.map((child, index) => (
                <div
                  key={index}
                  className="flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center text-wrap shadow-md"
                >
                  <p className="w-1/12 text-center">{index + 1}</p>
                  <p className="w-4/12 text-center">{child.name}</p>
                  <p className="w-4/12 text-center">{child.email}</p>
                  <p className="w-3/12 text-center">
                    {getFormattedDate(child.activationStatus.activeOn)}
                  </p>
                </div>
              ))}
            </div>
          )}
          </>}
        </div>
      </div>
    </>
  );
};

export default Referral;
