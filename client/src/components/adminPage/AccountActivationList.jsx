import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import showToastMessage from "../toast/Toast";
import getFormattedDate from "../toast/getFormattedDate";
import AdminContext from '../../context/AdminContext'
const AccountActivationList = () => {
  let navigate = useNavigate();
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const {token}=useContext(AdminContext)
  const fetchAllInactiveUsers = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        "http://localhost:4000/api/admin/accountActivation",
        config
      );
      setInactiveUsers(data.data);
      console.log(data.data);
    } catch (error) {
      showToastMessage("error", `${error}`);
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllInactiveUsers();
  }, []);

  return (
    <>
      <div className="p-5 bg-green-200">
        <p className="flex justify-center font-semibold text-2xl text-blue-600 pb-5">
          Activate Account
        </p>
        <div className="flex flex-col gap-2 w-full">
          {inactiveUsers &&
            inactiveUsers.map((user, index) => (
              <div className="flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center">
                <p className="w-1/12">{index + 1}</p>
                <p className="w-3/12">{user.name}</p>
                <p className="w-3/12">{user.mobileNo}</p>
                <p className="w-2/12">{getFormattedDate(user.createdAt)}</p>
                <span className="w-2/12 flex ">
                  {user?.activationRequestRejected ? (
                    <p className="bg-red-600 text-white px-2 py-1  font-semibold rounded-md">
                      rejected
                    </p>
                  ) : (
                    <p className="bg-yellow-200 text-yellow-600 px-2 py-1  font-semibold rounded-md">
                      Pending
                    </p>
                  )}
                </span>
                <span className="w-1/12 flex cursor-pointer ">
                  {user?.activationRequestRejected ? (
                    <p className="bg-blue-600 text-white px-2 py-1  font-semibold rounded-md cursor-not-allowed">
                      Activate
                    </p>
                  ) : (
                    <Link
                      to={`/admin/accountActivation/${user._id}`}
                      state={{ user: user }}
                    >
                      <p className="bg-blue-600 text-white px-2 py-1  font-semibold rounded-md">
                        Activate
                      </p>
                    </Link>
                  )}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AccountActivationList;
