import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const ActiveAccount = () => {

  const [disclosure,setDisclosure]=useState(false);
  return (
    <>
      <div className="w-1/2 bg-green-100 h-screen flex mx-auto my-5">
        <div className="flex flex-col w-4/5  bg-yellow-100 p-5 text-yellow-600 mx-auto rounded-lg">
          <p className="text-center font-semibold text-lg">Your account is Inactive initially !</p>

          <Disclosure>
            <DisclosureButton className="group flex items-center gap-2" onClick={()=>setDisclosure(!disclosure)}>
            Follow the instructions to active your account
              {disclosure?
              <IoIosArrowUp className="" />:
              <IoIosArrowDown className="" />}
            </DisclosureButton>

            <DisclosurePanel className="text-start font-light pl-5">
                <ul className="list-disc text-sm">
                  <li>
                    Pay the Registration Amount of 1200 INR <br />
                    <span>Account details</span>  <br />
                    <span>Account No. : 1211111111111</span>  <br />
                    <span>IFSC No. BOBSINGUR</span>  <br />
                    <span>Branch : Singur</span>  <br />
                  </li>
                  <li>Provide Octa Account Details</li>
                  <li>Provide the Deposite Proof</li>
                  <li>Contact the Admin or Consult to your Referrer</li>
                </ul>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </>
  );
};

export default ActiveAccount;
