import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiTeamLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { RiUserAddFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { GrAnnounce } from "react-icons/gr";
import { MdBlock } from "react-icons/md";
import { FaTrophy } from "react-icons/fa6";
import AdminContext from "../../context/AdminContext";

const Sidebar = () => {
  let navigate = useNavigate();
  const { admin, setAdmin, setToken } = useContext(AdminContext);
  console.log("admin", admin);

  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminToken");
    setAdmin("");
    setToken("");
    navigate("/admin/login");
  };
  const location = useLocation();
  const currentPath = location.pathname;
  const fields = [
    {
      name: "Account Activation",
      route: "accountActivation",
      icon: <SiTicktick />,
      isActive: currentPath.includes("accountActivation"),
    },
    {
      name: "Withdrawl Requests",
      route: "withdrawRequest",
      icon: <BiTransfer />,
      isActive: currentPath.includes("withdrawRequest"),
    },
    {
      name: "Profit Update",
      route: "profitUpdate",
      icon: <GrUpdate />,
      isActive: currentPath.includes("profitUpdate"),
    },
    // {
    //   name: "Update Diposite",
    //   route: "updateDiposite",
    //   icon: <GrValidate />,
    //   isActive: currentPath.includes("updateDiposite"),
    // },
    {
      name: "Comission Distribution",
      route: "ComissionDistribution",
      icon: <RiTeamLine />,
      isActive: currentPath.includes("ComissionDistribution"),
    },
    {
      name: "Create Admin",
      route: "createAdmin",
      icon: <RiUserAddFill />,
      isActive: currentPath.includes("createAdmin"),
    },
    {
      name: "Post Announcement",
      route: "postAnnouncement",
      icon: <GrAnnounce />,
      isActive: currentPath.includes("postAnnouncement"),
    },
    {
      name: "Claims",
      route: "rewards",
      icon: <FaTrophy />,
      isActive: currentPath.includes("rewards"),
    },
    {
      name: "Suspend a User",
      route: "suspendAUser",
      icon: <MdBlock />,
      isActive: currentPath.includes("suspendAUser"),
    },
    // {
    //   name: "Logout",
    //   route: "",
    //   icon: <BiLogOut />,
    // },
  ];
  const [allowed, setAllowed] = useState(admin.roles);
  const filteredFields = allowed.includes("superAdmin") // Render all fields if "superAdmin" is in allowed
    ? fields
    : fields.filter((field) => allowed.includes(field.route));

  return (
    <>
      <div
        className=" flex flex-col h-screen fixed right-0 bg-white pl-0 pr-3 py-5 mx-2 mt-12"
        style={{ width: 285 }}
      >
        {filteredFields.map((field, index) => (
          <Link to={`${field.route}`} key={index}>
            <div
              className={`w-full h-10 flex my-2 rounded-r-md pr-2 pl-5 py-4 gap-2 items-center ${
                field.isActive
                  ? "bg-blue-50 text-blue-800 border-l-2 border-blue-800 font-bold"
                  : "bg-white"
              }`}
            >
              <span className="text-2xl items-center ">{field.icon}</span>
              {field.name}
            </div>
          </Link>
        ))}
        <div
          className="w-full h-10 bg-white flex  my-2 rounded-r-md pr-2 pl-5 py-4  gap-2 items-center cursor-pointer"
          onClick={() => logoutHandler()}
        >
          <span className="text-2xl items-center ">
            <BiLogOut />
          </span>
          Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
