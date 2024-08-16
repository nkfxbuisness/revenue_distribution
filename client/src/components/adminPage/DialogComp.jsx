import React, { useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const DialogComp = ({ name, amount, date, isOpen, setIsOpen }) => {
  const [transactionID, setTransactionID] = useState("");
  const [reciept, setReciept] = useState("");
  const submit = ()=>{
    setIsOpen(false)
    console.log(transactionID)
    console.log(reciept);
    setTransactionID("")
    setReciept("")
  }
  return (
    <>
      {/* <button onClick={() => setIsOpen(true)}>Open dialog</button> */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
          <DialogPanel className="w-1/3 mr-[270px] space-y-4 border bg-white p-12">
            <DialogTitle className="text-lg font-bold text-center text-blue-600">
              {name}
            </DialogTitle>
            <div className="flex flex-col gap-1">
              {/* <p className="text-sm font-semibold text-left text-blue-600">Name : {name}</p> */}
              <p className="text-sm font-semibold text-left text-blue-600">
                Amount : {amount}
              </p>
              <p className="text-sm font-semibold text-left text-blue-600">
                Date : {date}
              </p>
              <label
                htmlFor="transaction"
                className="text-sm font-semibold text-left text-blue-600"
              >
                Transaction / UTR No.
              </label>
              <input
                type="text"
                id="transaction"
                value={transactionID}
                onChange={(e)=>setTransactionID(e.target.value)}
                className="bg-blue-100 py-1 px-3"
              />
              <label
                htmlFor="recipt"
                className="text-sm font-semibold text-left text-blue-600"
              >
                Payment Recipt
              </label>
              <input 
                type="file" 
                id="recipt" 
                onChange={(e)=>setReciept(e.target.files[0])}
                className="text-blue-600" 
              />
            </div>
            <div className="flex gap-4">
              <button
                className="bg-red-500 text-white font-semibold rounded-md px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white font-semibold rounded-md px-2 py-1"
                onClick={() => submit()}
              >
                Mark as Paid
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DialogComp;
