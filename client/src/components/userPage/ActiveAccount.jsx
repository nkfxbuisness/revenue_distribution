import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from "@headlessui/react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import showToastMessage from "../toast/Toast";

const ActiveAccount = () => {
  const { user, setUser, token} = useContext(UserContext);

  const [disclosure, setDisclosure] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [depositField,setDepositField]=useState(false)
  
  const [copyProportion, setCopyProportion] = useState("");
  const [octaReqNo, setOctaReqNo] = useState("");
  const [emailSame,setEmailSame]=useState(false);

  const [transactionID, setTransactionID] = useState("");
  const [transactionRecipt, setTransactionRecipt] = useState("");
  const [transactionReciptFileName, setTransactionReciptFileName] =
    useState("");
  const [transactionReciptURL] = useState("");

  console.log(emailSame);
  console.log(transactionRecipt);
  console.log(transactionReciptFileName);
  const handleFileChange = (file) => {
    setTransactionRecipt(file);
  };
  const handleReActivation = () => {
    let temp = user;
    temp.activationStatus.activationRequestSubmitted = false;
    setUser(temp);
    setClicked(true);
  };
  useEffect(() => {
    setTransactionReciptFileName(transactionRecipt.name);
  }, [transactionRecipt]);
  useEffect(() => {
    console.log(user);
  }, [clicked]);

  const scrollToId = () => {
    if(copyProportion && octaReqNo){
      setDepositField(true)
    }else{
      showToastMessage("warn","fill the details")
      console.log("return");
      
      return;
    }
    const element = document.getElementById("payregFees");
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
    }
  };
  const submit = async () => {
    if (!copyProportion || !octaReqNo || !transactionID) {
      showToastMessage("warn", `fill the mandatory fields first !`);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      let initialDepositDetails = {
        octaDepositReqNo: octaReqNo,
        regFeesTransactionId:transactionID,
        regFeesPaymentDate:Date.now()
      }
      const { data } = await axios.post(
        `http://localhost:4000/api/user/activateAccount/${user._id}`,
        {
          initialDepositDetails,
          copyProportion
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
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
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
      {user && !user.activationStatus.activationRequestSubmitted ? (
        <div className="w-1/2 bg-green-100 h-full min-h-screen  flex flex-col mx-auto my-5">
          <div className="flex flex-col w-full  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg">
            <p className="text-left font-semibold text-lg">Your account is Inactive initially !</p>
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
                    Step 1 : Create an account on OctaFx with the same mail id
                    you have provided here
                  </li>
                  <li>
                    Step 2 : Choose the copy proportion and deposit the
                    calculated amount on OctaFx
                  </li>
                  <li>Step 3 : Provide the request no. after deposit</li>
                  <li>
                    Step 4 : After deposit , pay the registration fees to the
                    given beneficiary
                  </li>
                  <li>
                    Step 3 : Provide the payment recipt and transaction/UTR No.
                    for varification
                  </li>
                  <li>
                    <b>
                      Contact the Admin or Consult to your Referrer for
                      assistance
                    </b>
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </div>

          {/* deposit on octa  */}
          <div className="flex flex-col gap-3 w-full items-center justify-center bg-blue-100 rounded-lg mt-5 p-5">
            <h3 className="flex justify-center font-bold text-3xl text-blue-600 pb-4">
              Deposit on OctaFx
            </h3>
            {/* min investable amount  */}
            <div className="flex w-full text-left gap-5">
              <p className="font-normal text-lg text-blue-600">
                Minimum Investable Amount{" "}
                <span className="bg-green-100 text-green-600 px-2 rounded-md">
                  $ 100
                </span>
              </p>
            </div>

            {/* select your copy proportion  */}
            <div className="flex w-full text-left gap-5">
              <label
                htmlFor="octaReqNo"
                className="font-normal text-lg text-blue-600 text-nowrap w-fit"
              >
                Select Your Copy Proportion
              </label>
              <select
                id="pet-select"
                className="text-black py-1 px-2 rounded-md outline-none shadow-md focus:outline-blue-400"
                value={copyProportion}
                onChange={(e) => setCopyProportion(e.target.value)}
                disabled={depositField}
              >
                <option value="">--Please choose an option--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            {/* Amount to deposit on octaFx  */}
            <div className="flex w-full text-left gap-5">
              <p className="font-normal text-lg text-blue-600">
                Amount to Deposit On OctaFx{" "}
                <span className="bg-green-100 text-green-600 px-2 rounded-md">
                  $ {copyProportion !== "" ? 100 * copyProportion : ""}
                </span>
              </p>
            </div>

            {/* octa request no  */}
            <div className="flex w-full text-left gap-5">
              <label
                htmlFor="octaReqNo"
                className="font-normal text-lg text-blue-600 text-nowrap w-fit"
              >
                OctaFx Request No.
              </label>
              <input
                type="text"
                className="text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full shadow-md"
                value={octaReqNo}
                onChange={(e)=>setOctaReqNo(e.target.value)}
                disabled={depositField}
                required
              />
            </div>

            {/* same email  */}
            <div className="flex w-full text-left gap-2">
              <input type="checkbox" checked={emailSame} onChange={(e) => setEmailSame(e.target.checked)} disabled={depositField} />
              <p className="text-blue-500 text-sm">
                The email used to open the OctaFX account is the same as the one
                provided here
              </p>
            </div>

            {/* done button  */}
            <div className="flex w-full justify-end mt-4">
            {!depositField?
              <button
                className={`py-1 px-2 rounded-lg bg-blue-600 font-semibold text-white ${emailSame?"opacity-100":"opacity-50"}`}
                onClick={scrollToId}
                disabled={!emailSame}
              >
                Deposit Done
              </button>:""}
            </div>
          </div>

          {/* pay registration fees */}
          <div
            className="flex flex-col gap-4 w-full items-center justify-center bg-blue-100 rounded-lg mt-5 p-5"
            id="payregFees"
          >
            <h3 className="flex justify-center font-bold text-3xl text-blue-600 pb-4">
              Pay Registration Fees
            </h3>
            {/* Registration fees  */}
            <div className="flex w-full text-left gap-5">
              <p className="font-normal text-lg text-blue-600">
                Registration Fees is{" "}
                <span className="bg-green-100 text-green-600 px-2 rounded-md">
                  ₹ 1200
                </span>
              </p>
            </div>

            {/* Account details  */}
            <div className="flex flex-col w-full text-left gap-5">
              <p className="font-normal text-lg text-blue-600">
                Pay the Registration fees to the given beneficiary
              </p>
              <div>
                <p>Account Number : 94337903461</p>
                <p>Beneficiary Name : Nkfxbuisness Private Limited</p>
                <p>IFSC Code : BARB0SINGUR</p>
                <p>Bank : State Bank of India</p>
              </div>
            </div>

            {/* transactionID */}
            <div className="flex flex-col w-full text-left gap-2">
              <label
                htmlFor="transactionID"
                className="font-normal text-lg text-blue-600"
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
              <label className="font-normal text-lg text-blue-600">
                Registration Fees payment transaction Recipt
              </label>
              <div className="flex ">
                <input
                  type="file"
                  id="transactionRecipt"
                  className="w-full hidden shadow-md"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <div className="flex w-full rounded-md shadow-md">
                  <label
                    htmlFor="transactionRecipt"
                    className="w-32 cursor-pointer inline-flex items shadow-md-center px-4 py-2 bg-blue-600 text-white font-semibold  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-l-md"
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
                <div className="flex justify-center items-center py-2 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer ml-2 shadow-md">
                  <MdUpload className="text-2xl" />
                </div>
              </div>
            </div>

            {/* activate button  */}
            {user?.activationStatus.requestRejected ? (
              <button
                onClick={() => resubmit()}
                className={`flex items-center w-fit px-3 py-2 mt-5 bg-blue-600 text-white font-semibold rounded-md `}
                
              >
                Resubmit Activation Request
              </button>
            ) : (
              <button
                onClick={() => submit()}
                className={`flex items-center w-fit px-3 py-2 mt-5 bg-blue-600 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 ease-in-out
             `}
                
              >
                Submit Activation Request
              </button>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {user?.activationStatus.activationRequestSubmitted && user?.activationStatus.requestRejected ? (
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
                <p className="text-black">Remarks : {user.activationStatus.rejectionRemarks}</p>
                <p
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => handleReActivation()}
                >
                  Resubmit Activation Request
                </p>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      ) : (
        ""
      )}
      {user.activationStatus.activationRequestSubmitted && !user.activationStatus.activationRequestRejected ? (
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
