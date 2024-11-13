import React from "react";

const ProgressBar = ({ lower, upper, range, business }) => {
  // console.log(lower, upper);
  const progress = ((business - lower) / range) * 100;

  return (
    <>
      <div className="flex items-center gap-2 w-5/12 px-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          {business > lower && business < upper ? (
            <div
              className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          ) : (
            ""
          )}
          {business >= upper ? (
            <div
              className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
              style={{ width: `100%` }}
            ></div>
          ) : (
            ""
          )}
          {business <= lower ? (
            <div
              className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
              style={{ width: `0%` }}
            ></div>
          ) : (
            ""
          )}
        </div>
        {business > lower && business < upper ? (
          <p className="text-blue-600 font-thin text-xs w-16">
            {business - lower}/{range}
          </p>
        ) : (
          ""
        )}
        {business >= upper ? (
          <p className="text-blue-600 font-thin text-xs w-16">
            {range}/{range}
          </p>
        ) : (
          ""
        )}
        {business <= lower ? (
          <p className="text-blue-600 font-thin text-xs w-16">
            {0}/{range}
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProgressBar;
