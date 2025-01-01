import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import showToastMessage from "../../util/toast/Toast";
import getFormattedDate from "../../util/date/getFormattedDate";
import AdminContext from "../../context/AdminContext";
import { LuRefreshCw } from "react-icons/lu";
import Spinner from "../../util/animation/Spinner";
import PulseLoader from "../../util/animation/PulseLoader";


const AccountActivationList = () => {
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const { token } = useContext(AdminContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchAllInactiveUsers = async () => {
    setLoading(true)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        "http://localhost:4000/api/admin/accountActivation",
        config
      );
      setLoading(false);
      setInactiveUsers(data.data);
      console.log(data.data);
      // showToastMessage("info","hello");
    } catch (error) {
      setLoading(false)
      showToastMessage("error", `${error.message}`);
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllInactiveUsers();
  }, [refresh]);

  return (
    <>
      <div className="p-5 ">
        <p className="flex justify-center items-center gap-4 font-semibold text-2xl text-blue-600 pb-5">
          Activate Account
          {loading ? (
            <Spinner size={"large"} />
          ) : (
            <span>
              <LuRefreshCw
                className="cursor-pointer"
                onClick={() => setRefresh(!refresh)}
              />
            </span>
          )}
        </p>

        {/* table header  */}
        <div className="sticky top-12 mt-2 flex px-3 py-1 text-sm w-full  bg-blue-600 text-white text-center font-semibold rounded-md items-center text-wrap">
          <div className=" text-center py-2 px-2  w-1/12">No</div>
          <div className=" text-center py-2 px-2 border-l-2 border-white w-3/12">
            Name
          </div>
          <div className=" text-center py-2 px-2 border-l-2 border-white w-3/12">
            Contact
          </div>
          <div className=" text-center py-2 px-2 border-l-2 border-white w-2/12">
            Registered On
          </div>
          <div className=" text-center py-2 px-2 border-l-2 border-white w-2/12">
            Status
          </div>
          <div className=" text-center py-2 px-2 border-l-2 border-white w-1/12">
            Active
          </div>
        </div>

        {loading ? (
          <PulseLoader repeat={5} />
        ) : (
          <>
            {inactiveUsers?.length === 0 ? (
              <div className="h-96 flex justify-center items-center text-xl font-semibold">
                No Pending Activation Requests
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-2 w-full mt-2">
              {inactiveUsers &&
                inactiveUsers.map((user, index) => (
                  <div
                    className="flex px-3 py-2 text-sm w-full  bg-white text-center rounded-md shadow-md items-center"
                    key={index}
                  >
                    <p className="w-1/12">{index + 1}</p>
                    <p className="w-3/12">{user.name}</p>
                    <p className="w-3/12">{user.mobileNo}</p>
                    <p className="w-2/12">{getFormattedDate(user.createdAt)}</p>
                    <span className="w-2/12 flex justify-center">
                      {user?.activationStatus.requestRejected ? (
                        <p className="bg-red-600 text-white px-2 py-1  font-semibold rounded-md">
                          rejected
                        </p>
                      ) : (
                        <p className="bg-yellow-200 text-yellow-600 px-2 py-1  font-semibold rounded-md">
                          Pending
                        </p>
                      )}
                    </span>
                    <span className="w-1/12 flex cursor-pointer justify-center">
                      {user?.activationStatus.requestRejected ? (
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
          </>
        )}
      </div>
    </>
  );
};

export default AccountActivationList;
