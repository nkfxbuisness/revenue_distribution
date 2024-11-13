import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/AdminContext";
import axios from "axios";
import showToastMessage from "../toast/Toast";

const SuspendAUser = () => {
  const { token } = useContext(AdminContext);
  const [findBy, setFindBy] = useState("");
  const [value, setValue] = useState("");
  console.log(value);

  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  console.log(selectedUser);
  const [suspentionRemarks, setSuspentionRemarks] = useState("");
  const [submitted,setSubmitted] = useState(false);

  const findUserBy = async () => {
    if (!findBy || !value) {
      showToastMessage("warn", "fields cannot be blank");
      return;
    }
    try {
      // setLoading1(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/admin/findUserBy`,
        {
          findby: findBy,
          value,
        },
        config
      );
      console.log(data);
      if(data.data.length === 0){
        showToastMessage("warn","no users found")
      }

      if (data.success) {
        //   setLoading1(false);
        setSearchResult(data.data);
        //   showToastMessage("success", data.message);
      } else {
        //   setLoading1(false);
        showToastMessage("error", data.message);
      }
    } catch (error) {
      // setLoading1(false);
      showToastMessage("error", `${error}`);
    }
  };
  const suspendAUser = async () => {
    if (!selectedUser) {
      showToastMessage("warn", "select a user");
      return;
    }
    try {
      // setLoading1(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/admin/suspendAUser/${selectedUser._id}`,
        {
          suspentionRemarks
        },
        config
      );
      console.log(data);

      if (data.success) {
        //   setLoading1(false);s
        setFindBy("")
        setSelectedUser("");
        setSearchResult([]);
          showToastMessage("success", data.message);
      } else {
        //   setLoading1(false);
        showToastMessage("error", data.message);
      }
    } catch (error) {
      // setLoading1(false);
      showToastMessage("error", `${error}`);
    }
  };
  console.log(findBy);

  useEffect(() => {
    
  }, [submitted])
  

  return (
    <>
      <div className="flex mx-auto w-1/2   h-screen items-center ">
        <div className="h-5/6 w-full bg-blue-100 rounded-lg px-5 overflow-y-auto">

        {/* heading  */}
          <p className="flex justify-center font-bold text-2xl text-blue-600 py-5 mb-5">
            Suspend a User
          </p>

          {/* find user part  */}
          {selectedUser === "" ? (
            <div className="flex flex-col w-full">
              {/* findby  */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="findAUserBy"
                  className="font-bold text-lg text-blue-600 py-2 text-left"
                >
                  Find a user by
                </label>
                <select
                  id="findAUserBy"
                  className="py-1 rounded-md w-full shadow-md focus:outline-blue-400"
                  value={findBy}
                  onChange={(e) => setFindBy(e.target.value)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="mobileNo">Mobile No</option>
                </select>
              </div>

              {/* name  */}
              {findBy === "name" ? (
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="name"
                    className="font-bold text-lg text-blue-600 py-2 text-left"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter the name of the user to suspend"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="py-1 px-2 rounded-md w-full shadow-md focus:outline-blue-400"
                  />
                </div>
              ) : (
                ""
              )}

              {/* email  */}
              {findBy === "email" ? (
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="email"
                    className="font-bold text-lg text-blue-600 py-2 text-left"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter the email of the user to suspend"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="py-1 px-2 rounded-md w-full shadow-md focus:outline-blue-400"
                  />
                </div>
              ) : (
                ""
              )}

              {/* mobile no  */}
              {findBy === "mobileNo" ? (
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="mobileNo"
                    className="font-bold text-lg text-blue-600 py-2 text-left"
                  >
                    Mobile No
                  </label>
                  <input
                    type="text"
                    id="mobileNo"
                    placeholder="Enter the Mobile No of the user to suspend"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="py-1 px-2 rounded-md w-full shadow-md focus:outline-blue-400"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
         
         {/* find Uesr button  */}
          {selectedUser === "" ? (
            <button
              className="flex gap-2 items-center p-2 bg-blue-600 text-white font-semibold mt-3 rounded-md w-fit shadow-md"
              onClick={findUserBy}
            >
              Find User
            </button>
          ) : (
            ""
          )}

          {/* Search result part */}
          {selectedUser === "" ? (
            <div className=" flex flex-col gap-2 w-full">
              {searchResult.length ? (
                <p className="font-bold text-lg text-blue-600 py-2 text-left">
                  Search Results
                </p>
              ) : (
                ""
              )}
              {searchResult?.map((result) => (
                <div className="flex justify-center items-center px-5 py-2 text-blue-600 bg-white rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedUser(result)}>
                <p className="font-semibold w-1/3">{result?.name}</p>
                <div className="flex flex-col w-1/3 h-full">
                  <p className="font-thin text-sm ">{result?.email}</p>
                  <p className="font-thin text-sm">{result?.mobileNo}</p>
                </div>
                <div className="flex items-center justify-center w-1/3">
                  {result.activationStatus.suspended?
                    <span className="text-white bg-red-600 px-2 py-1 rounded-md font-semibold ">Suspended</span>:
                    <>{result.activationStatus.active?
                      <span className="text-white bg-green-600 px-2 py-1 rounded-md font-semibold ">Active</span>:
                      <span className="text-white bg-yellow-500 px-2 py-1 rounded-md font-semibold ">Inactive</span>
                    }</>}
                </div>
              </div>
              ))}
            </div>
          ) : (
            ""
          )}

          {/* select use part  */}
          {selectedUser ? (
            <div className="flex flex-col">
              {/* title: selected uder  */}
              <p className="font-bold text-lg text-blue-600 py-2 text-left">
                Selected user
              </p>

              {/* selected user  */}
              <div className="flex justify-center items-center px-5 py-2 text-white bg-blue-600 rounded-lg shadow-md cursor-pointer">
                <p className="font-semibold w-1/3">{selectedUser?.name}</p>
                <div className="flex flex-col w-1/3 h-full">
                  <p className="font-thin text-sm ">{selectedUser?.email}</p>
                  <p className="font-thin text-sm">{selectedUser?.mobileNo}</p>
                </div>
                <div className="flex items-center justify-center w-1/3">
                  {selectedUser.activationStatus.suspended?
                    <span className="text-white bg-red-600 px-2 py-1 rounded-md font-semibold ">Suspended</span>:
                    <>{selectedUser.activationStatus.active?
                      <span className="text-white bg-green-600 px-2 py-1 rounded-md font-semibold ">Active</span>:
                      <span className="text-white bg-yellow-500 px-2 py-1 rounded-md font-semibold ">Inactive</span>
                    }</>}
                </div>
              </div>

              {/* reason for rejection  */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="findAUserBy"
                  className="font-bold text-lg text-blue-600 py-2 text-left"
                >
                  Reason for rejection
                </label>
                <select
                  id="findAUserBy"
                  className="py-1 rounded-md w-full shadow-md focus:outline-blue-400"
                    value={suspentionRemarks}
                    onChange={(e) => setSuspentionRemarks(e.target.value)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="Not member any more">
                    Not member any more
                  </option>
                  <option value="Withdrawed amount form octa">
                    Withdrawed amount form octa{" "}
                  </option>
                  <option value="other reasons">other reasons</option>
                </select>
                {suspentionRemarks === "other reasons"?
                    <input type="text"
                    className="py-1 px-2 rounded-md w-full shadow-md focus:outline-blue-400" 
                    value={suspentionRemarks}
                    onChange={(e) => setSuspentionRemarks(e.target.value)}
                    placeholder="resason for suspention"/>
                    :""
                }
              </div>
              <button className="flex gap-2 items-center p-2 bg-red-600 text-white font-semibold mt-3 rounded-md w-fit shadow-md" onClick={()=>suspendAUser()}>
                Suspend User
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SuspendAUser;
