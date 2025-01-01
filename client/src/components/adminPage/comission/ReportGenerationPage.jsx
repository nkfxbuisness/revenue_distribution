import React, { useContext, useState } from "react";
import AdminContext from "../../../context/AdminContext";
import showToastMessage from "../../../util/toast/Toast";
import axios from "axios";

const ReportGenerationPage = () => {
  const { token } = useContext(AdminContext);
  const [month, setMonth] = useState("");
  console.log(month);
  
  const downlaodReport = async () => {
    if(!month){
      showToastMessage("warn","select month first !!");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };

      const { data } = await axios.get(
        `http://localhost:4000/api/admin/downloadComissionRepost/${month}`,
        config
      );
      console.log(data);
      // showToastMessage("success", "updated successfully");
    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  };
  return (
    <>
      <div className="h-full w-full flex items-center justify-center ">
        <div className=" w-1/2 h-96 flex flex-col p-5 items-center gap-5">
          <p className="flex justify-center font-bold text-3xl text-blue-600">
            Report Generation
          </p>
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <div className="flex justify-center items-center gap-2">
              <label
                for="start"
                className="font-bold text-lg text-blue-600 py-2 text-left text-nowrap"
              >
                Select month{" "}
              </label>
              <input
                type="month"
                id="start"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="py-1 px-5 rounded-md w-full shadow-md focus:outline-blue-400"
              />
            </div>
            <button className="p-2 bg-blue-600 text-white font-semibold rounded-md w-fit"
            onClick={()=>downlaodReport()}
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportGenerationPage;
