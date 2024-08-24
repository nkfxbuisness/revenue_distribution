import React, { useContext, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ActivationRejectionDialog from "./ActivationRejectionDialog";
import axios from "axios";
import showToastMessage from "../toast/Toast";
import AdminContext from "../../context/AdminContext";

const AccountActivation = () => {
  const {token} = useContext(AdminContext)
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {}; // Using optional chaining to handle cases where state might be undefined
  const [imageToShow, setImageToShow] = useState("");
  const [activationRejectionRemarks, setActivationRejectionRemarks] =
    useState("");
  let [isOpen, setIsOpen] = useState(false);
  console.log(imageToShow);
  const rejectionSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.put(
        `http://localhost:4000/api/admin/activationRequestReject/${user._id}`,
        {
          remarks: activationRejectionRemarks,
        },
        config
      );
      console.log(data.data);

      showToastMessage(
        "success",
        `Activation request rejected for ${user.name}  !`
      );
      navigate("/admin/accountActivation");
    } catch (error) {
      showToastMessage("error", `${error}`);
      // setLoading(false);
    }
  };
  const activationSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.put(
        `http://localhost:4000/api/admin/accountActivation/${user._id}`,{},
        config
      );
      console.log(data.data);

      showToastMessage("success", `Accout activated for  ${user.name}  !`);
      navigate("/admin/accountActivation");
    } catch (error) {
      showToastMessage("error", `${error}`);
      // setLoading(false);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 h-full">
        <div className="col-span-1 h-screen  flex flex-col py-10 px-5 w-4/5 mx-auto overflow-y-auto">
          {/* name  */}
          <div className="flex flex-col w-full text-left gap-1">
            <label htmlFor="name" className="font-bold text-lg text-blue-600">
              Name
            </label>
            <input
              type="text"
              value={user?.name}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold "
              disabled
            />
          </div>
          {/* address   */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="address"
              className="font-bold text-lg text-blue-600"
            >
              Address{" "}
              <span className="font-light">(As per of KYC documents)</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user?.address}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold"
              disabled
            />
          </div>

          {/* pan no  */}
          <div className="flex flex-col w-full text-left gap-1">
            <label htmlFor="PAN" className="font-bold text-lg text-blue-600">
              PAN No.
            </label>
            <input
              type="text"
              id="PAN"
              name="PAN"
              value={user?.PANno}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold"
              disabled
            />
          </div>

          {/* aadhaar no  */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="aadhaar"
              className="font-bold text-lg text-blue-600"
            >
              Aadhaar No
            </label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              value={user?.aadhaarNo}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold"
              disabled
            />
          </div>
          {/* Account no. */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="accountNo"
              className="font-bold text-lg text-blue-600"
            >
              Account no.
            </label>
            <input
              type="text"
              id="accountNo"
              name="aadaccountNohaar"
              value={user?.accountNo}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold"
              disabled
            />
          </div>
          {/* IFSC Code  */}
          <div className="flex flex-col w-full text-left gap-1">
            <label htmlFor="ISFC" className="font-bold text-lg text-blue-600">
              ISFC Code
            </label>
            <input
              type="text"
              id="ISFC"
              name="ISFC"
              value={user?.IFSCcode}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold"
              disabled
            />
          </div>
          {/* bank  */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="bankName"
              className="font-bold text-lg text-blue-600"
            >
              Bank
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={user?.bank}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold"
              disabled
            />
          </div>
          {/* Transaction / UTR No. */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="transNo"
              className="font-bold text-lg text-blue-600"
            >
              Transaction / UTR No.
            </label>
            <input
              type="text"
              id="transNo"
              name="transNo"
              value={user?.regFeesTransactionId}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 bg-gray-200 font-semibold"
              disabled
            />
          </div>
          {/* Aadhaar Card */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="transNo"
              className="font-bold text-lg text-blue-600"
            >
              Aadhaar Card
            </label>
            <div
              className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer"
              onClick={() => setImageToShow(user?.aadhaaarCard)}
            >
              {useState.name}_AadhaarCard
            </div>
          </div>
          {/* pan Card */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="transNo"
              className="font-bold text-lg text-blue-600"
            >
              Pan Card
            </label>
            <div
              className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer"
              onClick={() => setImageToShow(user?.panCard)}
            >
              {user?.name}_panCard
            </div>
          </div>
          {/* Passbook */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="transNo"
              className="font-bold text-lg text-blue-600"
            >
              Passbook
            </label>
            <div
              className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer"
              onClick={() => setImageToShow(user?.bankPassbook)}
            >
              {user?.name}_passBook
            </div>
          </div>
          {/* Tranction Recipt */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="transNo"
              className="font-bold text-lg text-blue-600"
            >
              Transaction Reciept
            </label>
            <div
              className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer"
              onClick={() => setImageToShow(user.registrationFeesReciept)}
            >
              {user?.name}_transactionReciept
            </div>
          </div>
        </div>
        <div className="col-span-1 h-screen overflow-y-auto flex py-10">
          {!imageToShow ? (
            <div className="flex flex-col w-4/5 my-auto  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg h-fit">
              <span className="flex py-3 items-center gap-4 justify-center text-xl font-semibold border-b-2 border-yellow-600">
                <IoMdInformationCircleOutline className="text-2xl" />
                <p>
                  Things that are needed to be checked before mark as Active
                </p>
              </span>
              <ul className="list-disc text-sm text-start px-5 py-2">
                <li>Make sue entered address is as per of KYC documents </li>
                <li>Make sue entered Aadhaar number is right </li>
                <li>Make sue entered PAN number is right </li>
                <li>
                  Make sue entered Bank account details is as per of the
                  uploaded passbook{" "}
                </li>
                <li>
                  Check if the entered transaction details is valid or not{" "}
                </li>
              </ul>
            </div>
          ) : (
            <img
              src={imageToShow}
              alt="Nothing to display"
              className="w-full h-fit my-auto"
            />
          )}
        </div>
      </div>
      <div className="px-2 py-2 w-full flex gap-3 bg-white   fixed bottom-0 shadow-2xl shadow-blue-600">
        <button
          className="bg-gray-600 text-white font-semibold cursor-pointer px-2 py-1 w-fit h-full rounded-md"
          onClick={() => navigate("/admin/accountActivation")}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 text-white font-semibold cursor-pointer px-2 py-1 w-fit h-full rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Reject Activation
        </button>
        <button
          className="bg-blue-600 text-white font-semibold cursor-pointer px-2 py-1 w-fit h-full rounded-md"
          onClick={() => activationSubmit()}
        >
          Activate
        </button>
      </div>
      <ActivationRejectionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        rejectionSubmit={rejectionSubmit}
        activationRejectionRemarks={activationRejectionRemarks}
        setActivationRejectionRemarks={setActivationRejectionRemarks}
      />
    </>
  );
};

export default AccountActivation;
