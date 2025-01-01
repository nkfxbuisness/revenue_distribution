import React from "react";

const Spinner = ({ size }) => {
  return (
    <>
      {size === "small" ? (
        <div className=" w-4 h-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
      ) : (
        <div className=" w-6 h-6 border-4 border-t-transparent border-blue-600 border-solid rounded-full animate-spin"></div>
      )}
    </>
  );
};

export default Spinner;
