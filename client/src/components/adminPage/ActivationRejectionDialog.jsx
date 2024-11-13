import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const ActivationRejectionDialog = ({
  isOpen,
  setIsOpen,
  rejectionSubmit,
  activationRejectionRemarks,
  setActivationRejectionRemarks,
}) => {
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
              Remarks
            </DialogTitle>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="remarks"
                className="text-sm font-semibold text-left text-blue-600"
              >
                Reason for rejection
              </label>
              <textarea
                id="remarks"
                rows={5}
                value={activationRejectionRemarks}
                onChange={(e) => setActivationRejectionRemarks(e.target.value)}
                className="bg-blue-100 py-1 px-3"
              />
            </div>
            <div className="flex gap-4">
              <button
                className="bg-gray-600 text-white font-semibold rounded-md px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white font-semibold rounded-md px-2 py-1"
                onClick={() => rejectionSubmit()}
              >
                Reject Activation
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ActivationRejectionDialog;
