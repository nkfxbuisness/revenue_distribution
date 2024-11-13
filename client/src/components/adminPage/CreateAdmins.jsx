import React, { useContext, useEffect, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import showToastMessage from "../toast/Toast";
import AdminContext from "../../context/AdminContext";
import axios from "axios";
import EditAdminAccessDialog from "./EditAdminAccessDialog";
import getFormattedDate from "../toast/getFormattedDate";
import Spinner from "../toast/animation/Spinner";
import PulseLoader from "../toast/animation/PulseLoader";

const CreateAdmins = () => {
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [selectedRoales, setSelectedRoales] = useState([]);
  // console.log(selectedRoales);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedRoales([...selectedRoales, value]);
    } else {
      setSelectedRoales(selectedRoales.filter((option) => option !== value));
    }
  };
  const uncheckAllCheckboxes = () => {
    // Get all checkboxes within the admin roles section
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Loop through each checkbox and set its checked property to false
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  const { token } = useContext(AdminContext);
  const [show, setShow] = useState(false);
  const getAllAdmins = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/getAllAdmins`,
        config
      );
      console.log(data.data);
      setAdmins(data.data);
      setLoading(false);
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading(false);
    }
  };
  const handleEditAccess = (Admin) => {
    setIsOpen(true);
    setAdmin(Admin);
  };
  const deleteElementByValue = (array, value) => {
    return array.filter((element) => element !== value);
  };
  const createAdmin = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !confPassword ||
      selectedRoales.length === 0
    ) {
      showToastMessage("warn", "fill all mandatory fields first");
      return;
    }
    if (password !== confPassword) {
      showToastMessage("warn", "password and confirm password not same !! ");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/admin/createAdmin/`,
        {
          name,
          email,
          password,
          roles: selectedRoales,
        },
        config
      );
      console.log(data.data);
      let temp = data.data;
      admins.push(temp);

      showToastMessage(
        "success",
        `Admin ${data.data.name} created successfully !`
      );
      setName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
      setSelectedRoales([]);
      uncheckAllCheckboxes();
    } catch (error) {
      showToastMessage("error", `${error}`);
      // setLoading(false);
    }
  };
  const deleteAdmin = async (Admin) => {
    if (window.confirm(`Do you want to delete ${Admin.name}`)) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        };
        await axios.delete(
          `http://localhost:4000/api/admin/deleteAdmin/${Admin._id}`,
          config
        );
        let temp = admins;
        temp = deleteElementByValue(admins, Admin);
        setAdmins(temp);
        showToastMessage("success", `${Admin.name} deleted successfully`);
      } catch (error) {
        showToastMessage("error", `${error}`);
      }
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);
  useEffect(() => {
    console.log("admins updated");
  }, [admins]);

  return (
    <>
      <div className="w-5/6 h-full flex flex-col mx-auto ">
        <p className="flex justify-center items-center font-semibold text-2xl gap-3 text-blue-600 pb-5 mt-4">
          Existing Admin{" "}
          <span>{loading ? <Spinner size={"large"} /> : ""}</span>
        </p>
        {loading ? (
          <PulseLoader repeat={5} />
        ) : (
          <>
            {admins.length === 0 ? (
              <div className="flex h-20 bg-white rounded-lg  mt-2 items-center justify-center text-blue-600 font-semibold text-xl shadow-md">No admins present expect superAdmin</div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  {admins?.map((admin, index) => (
                    <div
                      key={index}
                      className="flex px-2 items-center bg-white py-1 rounded-lg shadow-md"
                    >
                      <p className="text-blue-500 text-left font-semibold w-2/12">
                        {admin.name}
                      </p>
                      <div className="flex flex-wrap gap-2 w-5/12">
                        {admin.roles?.map((role, roleIndex) => (
                          <span
                            key={roleIndex}
                            className="px-2 py-1 bg-blue-200 text-blue-600 font-semibold rounded-lg"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                      <p className="text-blue-500 font-semibold w-2/12">
                        {getFormattedDate(admin?.createdAt)}
                      </p>
                      <div className="w-3/12 flex justify-around items-center">
                        <button
                          className="w-fit px-2 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                          onClick={() => handleEditAccess(admin)}
                        >
                          Edit Access
                        </button>
                        <button
                          className="w-fit px-2 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg"
                          onClick={() => deleteAdmin(admin)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <p className="pt-5 mt-10 flex justify-center font-semibold text-2xl text-blue-600 pb-5">
          Create a new Admin
        </p>
        <div className="flex flex-col w-4/5 mx-auto">
          <label
            htmlFor="adminName"
            className="font-bold text-left py-2 text-lg text-blue-600"
          >
            Admin Name
          </label>
          {/* admin name  */}
          <input
            type="text"
            id="adminName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
          />
          <label
            htmlFor="adminRoles"
            className="font-bold text-left py-2 text-lg text-blue-600"
          >
            Admin Roles
          </label>
          {/* admin roles checkbox  */}
          <div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="accountActivation"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Account Activation
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="withdrawRequest"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Withdrawl Request
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="profitUpdate"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Profit Update
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="updateDiposite"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Deposit Update
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value="ComissionDistribution"
                onChange={handleCheckboxChange}
              />
              <label className="font-bold text-sm py-1 text-blue-600">
                Comission Distribution
              </label>
            </div>
          </div>
          <label
            htmlFor="adminEmail"
            className="font-bold text-left py-2 text-lg text-blue-600"
          >
            Email
          </label>
          {/* admin email  */}
          <input
            type="text"
            id="adminEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
          />
          {/* set password   */}
          <div className="flex flex-col w-full text-left gap-1 py-2">
            <label
              htmlFor="password"
              className="font-bold text-lg text-blue-600"
            >
              Set Password
            </label>
            <div className="flex w-full gap-2">
              <input
                type={show ? "text" : "password"}
                id="adminPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full shadow-md"
                required
              />
              <div
                className="flex justify-center items-center py-1 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer shadow-md"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <HiOutlineEyeOff className="text-2xl" />
                ) : (
                  <HiOutlineEye className="text-2xl" />
                )}
              </div>
            </div>
          </div>

          {/* confPassword  */}
          <div className="flex flex-col w-full text-left gap-1 py-2">
            <label
              htmlFor="adminConfPassword"
              className="font-bold text-lg text-blue-600"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="adminConfPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
              required
            />
          </div>
          {/* create admin  */}
          <button
            className="bg-blue-600 text-white font-semibold my-5 py-1 px-2 rounded-lg w-fit"
            onClick={() => createAdmin()}
          >
            Create Admin
          </button>
        </div>
      </div>
      <EditAdminAccessDialog
        admin={admin}
        setAdmin={setAdmin}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedRoales={selectedRoales}
        setSelectedRoales={setSelectedRoales}
        handleCheckboxChange={handleCheckboxChange}
      />
    </>
  );
};

export default CreateAdmins;
