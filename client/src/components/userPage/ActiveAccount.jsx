import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Switch,
} from "@headlessui/react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import showToastMessage from "../toast/Toast";
import { useNavigate } from "react-router-dom";

const ActiveAccount = () => {
  let navigate = useNavigate();
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [enabled, setEnabled] = useState(false);
  const [disclosure, setDisclosure] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const [transactionRecipt, setTransactionRecipt] = useState("");
  const [transactionReciptFileName, setTransactionReciptFileName] =
    useState("");
  const [transactionReciptURL, setTransactionReciptURL] = useState("");
  const [octaReqNo, setOctaReqNo] = useState("");
  const [clicked, setClicked] = useState(false);

  console.log(transactionRecipt);
  console.log(transactionReciptFileName);
  const handleFileChange = (file) => {
    setTransactionRecipt(file);
  };
  const handleReActivation = () => {
    let temp = user;
    temp.activationRequestSubmitted = false;
    setUser(temp);
    setClicked(true);
  };
  useEffect(() => {
    setTransactionReciptFileName(transactionRecipt.name);
  }, [transactionRecipt]);
  useEffect(() => {
    console.log(user);
  }, [clicked]);

  const submit = async () => {
    try {
      if (!transactionID || !octaReqNo) {
        showToastMessage("warn", `fill the mandatory fields first !`);
        return;
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/user/activateAccount/${user._id}`,
        {
          regFeesReciptUrl: transactionReciptURL,
          regFeesTransactionId: transactionID,
          octaRequestNo: octaReqNo,
        },
        config
      );
      console.log(data.data);
      setUser(data.data);

      showToastMessage(
        "success",
        `Activation request submitted successfully !`
      );
    } catch (error) {
      showToastMessage("error", `${error}`);
      // setLoading(false);
    }
  };
  const resubmit = async () => {
    try {
      if (!transactionID || !octaReqNo) {
        showToastMessage("warn", `fill the mandatory fields first !`);
        return;
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.put(
        `http://localhost:4000/api/user/reactivateAccount/${user._id}`,
        {
          regFeesReciptUrl: transactionReciptURL,
          regFeesTransactionId: transactionID,
          octaRequestNo: octaReqNo,
        },
        config
      );
      console.log(data.data);
      setUser(data.data);

      showToastMessage(
        "success",
        `Activation request resubmitted successfully !`
      );
      // navigate("/admin/accountActivation");
    } catch (error) {
      showToastMessage("error", `${error}`);
      // setLoading(false);
    }
  };

  return (
    <>
      {user && !user.activationRequestSubmitted ? (
        <div className="w-1/2 bg-green-100 h-full min-h-screen  flex flex-col mx-auto my-5">
          <div className="flex flex-col w-full  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg">
            <p className="text-left font-semibold text-lg">
              Your account is Inactive initially !
            </p>

            <Disclosure>
              <DisclosureButton
                className="group flex items-center gap-2"
                onClick={() => setDisclosure(!disclosure)}
              >
                Follow the instructions to active your account
                {disclosure ? (
                  <IoIosArrowUp className="" />
                ) : (
                  <IoIosArrowDown className="" />
                )}
              </DisclosureButton>

              <DisclosurePanel className="text-start font-light pl-5">
                <ul className="list-disc text-sm">
                  <li>
                    Pay the Registration Amount of 1200 INR <br />
                    <span>Account details</span> <br />
                    <span>Account No. : 1211111111111</span> <br />
                    <span>IFSC No. BOBSINGUR</span> <br />
                    <span>Branch : Singur</span> <br />
                  </li>
                  <li>Provide Octa Account Details</li>
                  <li>Provide the Deposite Proof</li>
                  <li>Contact the Admin or Consult to your Referrer</li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </div>

          <form action="" className="flex flex-col gap-3 mt-3">
            {/* transactionID */}
            <div className="flex flex-col w-full text-left gap-2">
              <label
                htmlFor="transactionID"
                className="font-bold text-lg text-blue-600"
              >
                Registration Fees payment transaction/UTR No.
              </label>
              <input
                type="text"
                id="transactionID"
                value={transactionID}
                onChange={(e) => setTransactionID(e.target.value)}
                className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
                required
              />
            </div>

            {/* transaction recitp  */}
            <div className="flex flex-col  w-full text-left gap-2">
              <label className="font-bold text-lg text-blue-600">
                Registration Fees payment transaction Recipt
              </label>
              <div className="flex">
                <input
                  type="file"
                  id="transactionRecipt"
                  className="w-full hidden"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <div className="flex w-full rounded-md">
                  <label
                    htmlFor="transactionRecipt"
                    className="w-32 cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-l-md"
                  >
                    Select file
                  </label>
                  <div
                    className="px-4 py-2 bg-white w-full rounded-r-md text-black"
                    id="transactionReciptFileName"
                  >
                    {transactionReciptFileName}
                  </div>
                </div>
                <div className="flex justify-center items-center py-2 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer">
                  <MdUpload className="text-2xl" />
                </div>
              </div>
            </div>

            {/* account opening done  */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg text-blue-600 text-left">
                Account opening and initial amount deposit is done in OctaFx
              </p>
              <div className="flex ">
                <p
                  className={`font-bold text-base px-2 ${
                    enabled ? "text-gray-400" : "text-blue-600"
                  }`}
                >
                  No
                </p>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
                <p
                  className={`font-bold text-base px-2 ${
                    enabled ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  Yes
                </p>
              </div>
            </div>

            {/* octaReqNo */}
            {enabled ? (
              <div className="flex flex-col w-full text-left gap-1">
                <label
                  htmlFor="octaReqNo"
                  className="font-bold text-lg text-blue-600"
                >
                  Request No for diposit in OctaFx
                </label>
                <input
                  type="text"
                  id="octaReqNo"
                  value={octaReqNo}
                  onChange={(e) => setOctaReqNo(e.target.value)}
                  className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400"
                  required
                />
              </div>
            ) : (
              ""
            )}
          </form>
          {/* activate button  */}
          {user?.activationRequestRejected ? (
            <button
              onClick={() => resubmit()}
              className={`flex items-center w-fit px-3 py-2 mt-5 bg-blue-600 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 ease-in-out
            ${enabled ? "cursor-pointer" : "cursor-no-drop"} `}
              disabled={!enabled}
            >
              Resubmit Activation Request
            </button>
          ) : (
            <button
              onClick={() => submit()}
              className={`flex items-center w-fit px-3 py-2 mt-5 bg-blue-600 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 ease-in-out
            ${enabled ? "cursor-pointer" : "cursor-no-drop"} `}
              disabled={!enabled}
            >
              Submit Activation Request
            </button>
          )}
        </div>
      ) : (
        ""
      )}

      {user?.activationRequestSubmitted && user?.activationRequestRejected ? (
        <div className="w-1/2  h-full min-h-screen  flex items-center mx-auto my-5">
          <div className="flex flex-col w-full  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg">
            <Disclosure>
              <DisclosureButton
                className="group flex items-center gap-2"
                onClick={() => setDisclosure(!disclosure)}
              >
                Account activation request rejected !!
                {disclosure ? (
                  <IoIosArrowUp className="" />
                ) : (
                  <IoIosArrowDown className="" />
                )}
              </DisclosureButton>

              <DisclosurePanel className="text-start font-light ">
                <p>{user.activationRejectionRemarks}</p>
                <p
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => handleReActivation()}
                >
                  activate account
                </p>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      ) : (
        ""
      )}
      {user.activationRequestSubmitted && !user.activationRequestRejected ? (
        <div className="w-1/2  h-full min-h-screen  flex items-center mx-auto my-5">
          <div className="flex flex-col w-full  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg">
            <Disclosure>
              <DisclosureButton
                className="group flex items-center gap-2"
                onClick={() => setDisclosure(!disclosure)}
              >
                Account activation pending !!
                {disclosure ? (
                  <IoIosArrowUp className="" />
                ) : (
                  <IoIosArrowDown className="" />
                )}
              </DisclosureButton>

              <DisclosurePanel className="text-start font-light ">
                <p>
                  Dear {user.name} , Your account activation request has been
                  submitted. The activation process requires verification and
                  may take some time. Once your account is activated, you will
                  have access to all services
                </p>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ActiveAccount;
