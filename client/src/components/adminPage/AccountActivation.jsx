import React, { useState } from "react";
import user from "../toast/user";
import { IoMdInformationCircleOutline } from "react-icons/io";

const AccountActivation = () => {
  console.log(user);
  
  // {
  //   "referral": "1234",
  //   "email": "test@gmail.com",
  //   "password": "1234",
  //   "name": "Sunirmal",
  //   "mobile": "2233445566",
  //   "address": "singur",
  //   "DOB": "1-2-2001",
  //   "bank": "SBI",
  //   "IFSC": "12df45",
  //   "accountNumber": "123456",
  //   "panNo": "12345",
  //   "aadhaarNo": "12345",
  //   "isActive": true
  // }
  const [imageToShow, setImageToShow] = useState();
  console.log(imageToShow)
  return (
    <>
      <div className="grid grid-cols-2 h-full">
        <div className="col-span-1 h-full  flex flex-col py-10 px-5 w-4/5 mx-auto overflow-auto">
          {/* name  */}
          <div className="flex flex-col w-full text-left gap-1">
            <label htmlFor="name" className="font-bold text-lg text-blue-600">
              Name
            </label>
            <input
              type="text"
              value={user.name}
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
              value={user.address}
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
              value={user.panNo}
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
              value={user.aadhaarNo}
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
              value={user.accountNumber}
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
              value={user.IFSC}
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
              value={user.bank}
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
              value="1234567890"
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
            <div className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer" onClick={()=>setImageToShow(user.aadhaaarCard)}>
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
            <div className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer" onClick={()=>setImageToShow(user.panCard)}>
              {user.name}_panCard
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
            <div className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer" onClick={()=>setImageToShow(user.bankPassbook)}>
              {user.name}_passBook
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
            <div className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer" onClick={()=>setImageToShow(user.registrationFeesReciept)}>
              {user.name}_transactionReciept
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full overflow-y-auto flex py-10">
          {!imageToShow?
          <div className='flex flex-col w-4/5 my-auto  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg h-fit'>
            <span className='flex py-3 items-center gap-4 justify-center text-xl font-semibold border-b-2 border-yellow-600'>
              <IoMdInformationCircleOutline className='text-2xl'/>
              <p>Things that are needed to be checked before mark as Active</p>
            </span>
            <ul className="list-disc text-sm text-start px-5 py-2">
              <li>Make sue entered address is as per of KYC documents  </li>
              <li>Make sue entered Aadhaar number is right  </li>
              <li>Make sue entered PAN number is right </li>
              <li>Make sue entered Bank account details  is as per of the uploaded passbook </li>
              <li>Check if the entered transaction details is valid or not </li>
              
            </ul>
          </div>:
          <img src={imageToShow} alt="Nothing to display" className="w-full h-fit my-auto" />}
        </div>
      </div>
      <div className="px-2 py-2 w-full bg-blue-600 text-white font-semibold rounded-md cursor-pointer fixed bottom-0">
        Activate
      </div>
    </>
  );
};

export default AccountActivation;
