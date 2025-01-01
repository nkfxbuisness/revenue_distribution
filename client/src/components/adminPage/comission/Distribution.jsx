import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import showToastMessage from "../../../util/toast/Toast";
import AdminContext from "../../../context/AdminContext";
import axios from "axios";
import WhiteSpinner from "../../../util/animation/WhiteSpinner";

const Distribution = () => {
  const navigate = useNavigate();
  const { token } = useContext(AdminContext);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("");
  const [totalProfit, setTotalProfit] = useState(0);
  const [step, setStep] = useState("step1");
  const [progress, setProgress] = useState(0);
  const [calculateProfitClicked, setCalculateProfitClicked] = useState(false);
  const [distributionStarted, setDistributionStarted] = useState(false);
  console.log("progress", progress);

  const [distributionDone, setDistributionDone] = useState(false);

  const getTotalProfit = async () => {
    if (!month) {
      showToastMessage("warn", "select the month first");
      return;
    }
    try {
      setLoading(true);
      setCalculateProfitClicked(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };

      const { data } = await axios.get(
        `http://localhost:4000/api/admin/totalProfitForAMonth/${month}`,
        config
      );
      console.log(data);
      setLoading(false);
      setTotalProfit(data.totalProfit);
      if (data.totalProfit === 0) {
        showToastMessage(
          "warn",
          `Total profit for ${month} is 0 , no need to proceed farther`
        );
        setMonth("");
        return;
      }
      showToastMessage("success", `Profit calculated for ${month}`);
      // Introduce a delay of 5 seconds before setting the step to "step2"
      setTimeout(() => {
        setStep("step2");
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      setLoading(false);
      showToastMessage("error", `${error}`);
    }
  };
  const getLevelData = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/getVariable/levelwiseComission`,
        config
      );
      setLevels(data.data);
    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  };
  const distribute = async () => {
    setLoading(true);
    setDistributionStarted(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/admin/calculateComission`,
        {
          totalProfit: totalProfit,
          arr: levels,
          month: month,
        },
        config
      );
      console.log(data);
      if (data.success === false) {
        showToastMessage("warn", data.message);
      } else {
        showToastMessage("success", data.message);
      }
      setLoading(false);
      setDistributionDone(true);
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading(false);
    }
  };

  const trackProgress = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/trackProgress/${month}`,
        config
      );
      console.log(data);
      if (data.success) {
        setProgress((data.processedUsers / data.totalUsers) * 100);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
      console.error(error);
    }
  };

  useEffect(() => {
    getLevelData();
  }, []);

  useEffect(() => {
    if (!distributionStarted){
      return;
    }
    if(distributionDone){
      return ;
    }
    console.log("started");
    
    const interval = setInterval(trackProgress, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [distributionStarted,distributionDone]);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center ">
        <div className=" w-1/2 min-h-screen h-full flex flex-col  items-center gap-5 mb-10">
          {/* heading */}
          <p className="flex justify-center font-bold text-3xl text-blue-600 mt-10 mb-5">
            Start Distributing Comission
          </p>

          {/* instructions  */}
          <div className="flex flex-col gap-2 bg-yellow-200 w-full items-start p-5 rounded-md shadow-md">
            <p className="font-semibold text-xl text-yellow-600">
              Instructions
            </p>
            <div className="px-5">
              <ul className="list-disc text-yellow-600">
                <li>Resource Intensive process....might take long time</li>
                <li>Resource Intensive process....might take long time</li>
                <li>Resource Intensive process....might take long time</li>
                <li>Resource Intensive process....might take long time</li>
              </ul>
            </div>
          </div>

          {/* get monthly profit  */}
          {step === "step1" ? (
            <>
              <div className="w-full bg-blue-100 flex flex-col gap-6 items-center justify-center p-5 rounded-md shadow-md">
                <p className="flex justify-center font-bold text-2xl text-blue-600 pb-5">
                  Get Monthly Profit
                </p>
                <div className="flex justify-center items-center gap-2">
                  <label
                    htmlFor="start"
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
                {calculateProfitClicked ? (
                  <p className=" font-bold  text-blue-600 text-lg flex gap-3 items-center">
                    Monthly Profit for {month}
                    <span className="bg-blue-600 rounded-md text-white font-bold px-2 py-1">
                      {loading ? <WhiteSpinner /> : <>$ {totalProfit}</>}
                    </span>
                  </p>
                ) : (
                  ""
                )}
                <button
                  className="p-2 bg-blue-600 text-white rounded-md w-fit"
                  onClick={() => getTotalProfit()}
                  disabled={calculateProfitClicked}
                >
                  Calculate Monthly Profit
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          {/* comission split  */}
          {step === "step2" ? (
            <>
              <div className="w-full bg-blue-100 flex flex-col gap-6 items-center justify-center p-5 rounded-md shadow-md">
                <p className="flex justify-center font-bold text-2xl text-blue-600 pb-5">
                  Levelwise Comission Split
                </p>
                <div className="w-1/2 flex flex-col gap-2">
                  {levels.map((level, index) => (
                    <div key={index} className="flex w-full gap-3 ">
                      <div className="bg-white w-1/2 flex justify-center rounded-md shadow-md">
                        Level {index + 1}
                      </div>
                      <div className="bg-white w-1/2 flex justify-center rounded-md shadow-md">
                        {" "}
                        {level}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center gap-10">
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded-md w-fit flex items-center gap-2 font-semibold"
                    onClick={() =>
                      navigate("/admin/ComissionDistribution/setComission")
                    }
                  >
                    Edit <FaEdit />
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded-md w-fit flex items-center gap-2 font-semibold"
                    onClick={() => setStep("step3")}
                  >
                    Confirm <MdKeyboardArrowRight />
                  </button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {/* start distribution  */}
          {step === "step3" ? (
            <>
              <div className="w-full bg-blue-100 flex flex-col gap-6 items-center justify-center p-5 rounded-md shadow-md">
                <p className="flex justify-center font-bold text-2xl text-blue-600 pb-5">
                  Start Distribution
                </p>

                {/* progressbar  */}
                {distributionStarted && !distributionDone ?
                <div className="h-4 w-full bg-blue-200 shadow-md rounded-lg relative">
                  {/* <div className="h-full w-[20%] bg-blue-600 rounded-lg"></div> */}
                  <div className="animate-pulse flex space-x-4 w-full">
                    <div
                      style={{ width: `${progress}%` }}
                      className={`h-4 bg-blue-600 rounded-lg `}
                    ></div>
                  </div>
                </div>:""}

                {!distributionDone ? (
                  <button
                    className="p-2 bg-blue-600 text-white rounded-md w-4/5 flex items-center justify-center gap-3"
                    onClick={() => distribute()}
                    disabled={distributionStarted}
                  >
                    Start Distribution
                    {loading ? <WhiteSpinner /> : ""}
                  </button>
                ) : (
                  ""
                )}

                {distributionDone ? (
                  <button
                    className="p-2 bg-blue-600 text-white rounded-md w-4/5 flex items-center justify-center gap-2"
                    onClick={() =>
                      navigate("/admin/ComissionDistribution/report")
                    }
                  >
                    Download Report{" "}
                    <MdKeyboardArrowRight className="text-2xl font-bold " />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Distribution;
