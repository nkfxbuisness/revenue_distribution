import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import showToastMessage from "../../util/toast/Toast";
import UserContext from "../../context/UserContext";
import getFormattedDate from "../../util/date/getFormattedDate";
import { GoArrowDownLeft } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import {useNavigate} from "react-router-dom"
import WhiteSpinner from '../../util/animation/WhiteSpinner'
import PulseLoader from '../../util/animation/PulseLoader'

const Wallet = ({ifSuspendedOrInactive}) => {
  let navigate = useNavigate();
  const { user, token } = useContext(UserContext);
  const [loading,setLoading]=useState(false);
  // const ifSuspendedOrInactive=()=>{
  //   if(user.activationStatus.suspended){
  //     navigate(`/user/suspended/${user._id}`);
  //     return false;
  //   }
  //   if(!user.activationStatus.active){
  //     navigate(`/user/activeAccount/${user._id}`)
  //     return false;
  //   }
  //   return true;
  // }
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const getWalletPageData = async () => {
    try {
      setLoading(true)
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getWalletPageData/${user._id}`,
        config
      );
      console.log(data);
      if (data.success) {
        setWalletBalance(data.walletBalance);
        setTransactions(data.withdrawalRequests);
        setLoading(false);
        return;
      } else {
        showToastMessage("error", data.message);
        setLoading(false);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading(false)
    }
  };
  useEffect(() => {
    let temp = ifSuspendedOrInactive();
    if(temp) getWalletPageData();
  }, []);

  return (
    <>
      <div className="w-3/4  h-screen flex flex-col mx-auto my-5">
        <div className="flex justify-center flex-col gap-2 w-full h-44  bg-blue-600  text-yellow-600 mx-auto rounded-xl px-5 pb-5 shadow-md mt-5">
          <span className="text-lg text-white font-semibold text-left pl-4">
            Balance
          </span>
          <span className="text-4xl text-white font-extrabold text-left pl-4">
            {loading? <WhiteSpinner size={"large"}/>: <>$ {walletBalance}</>}
          </span>
        </div>

        {/* Wallet Transactions  */}
        <p className="flex font-bold text-3xl text-blue-600 py-5 text-left">
          Wallet Transactions
        </p>

        {/* table  */}
        <div className="w-full text-left rounded-md">
          {/* table header  */}
          <div className="sticky top-12 mt-2 flex px-3 py-1 text-sm w-full  bg-blue-600 text-white text-center font-semibold rounded-md items-center text-wrap">
            <div className=" text-center py-2 px-2  w-1/12">No</div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-2/12">
              Dedit/Credit
            </div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-3/12">
              Date
            </div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-3/12">
              Paid on
            </div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-1/12">
              Amount
            </div>
            <div className=" text-center py-2 px-2 border-l-2 border-white w-2/12">
              Status
            </div>
          </div>

          {loading?<PulseLoader repeat={5}/>:<>
          {/* table rows  */}
          {transactions.length === 0 ? (
            <div className="flex w-full mt-2 py-5 rounded-md justify-center items-center bg-white">
              <p className="text-blue-600 font-semibold text-lg">No transactions found</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2 w-full mt-2 py-2 rounded-md">
                {transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center text-wrap shadow-md"
                  >
                    {/* no  */}
                    <p className="w-1/12 pl-5">{index + 1}</p>
                    {/* debir/credit  */}
                    <div className="w-2/12 flex justify-center">
                      {transaction.debit ? (
                        <p className="flex gap-1 bg-red-200 rounded-md py-1 px-1 w-fit justify-center">
                          Debit
                          <GoArrowUpRight className="text-red-600 font-bold text-xl" />
                        </p>
                      ) : (
                        <p className="flex gap-1 bg-green-200 rounded-md py-1 px-1 w-fit justify-center">
                          Credit
                          <GoArrowDownLeft className="text-green-600 font-bold text-xl" />
                        </p>
                      )}
                    </div>

                    {/* date */}
                    <p className="w-3/12 text-center">
                      {getFormattedDate(transaction.date)}
                    </p>
                    {/* paid on  */}
                    <p className="w-3/12 text-center">
                      {transaction.paidOn
                        ? getFormattedDate(transaction?.paidOn)
                        : "not paid yet"}
                    </p>
                    {/* amount  */}
                    <p className="w-1/12 text-center">{transaction.amount}</p>
                    {/* status  */}
                    <div className="w-2/12 text-center flex justify-center">
                      {transaction.paid ? (
                        <p className="bg-green-200 text-green-600 font-semibold rounded-md py-1 px-1 w-fit">
                          success
                        </p>
                      ) : (
                        <p className="bg-yellow-200 text-yellow-600 font-semibold rounded-md py-1 px-1 w-fit">
                          pending
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          </>}
        </div>
      </div>
    </>
  );
};

export default Wallet;
