import React from "react";

const PulseLoader = ({ repeat }) => {
  return (
    <>
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-2 py-1">
          {Array.from({ length: repeat }).map((_, index) => (
              <div className="h-9 bg-blue-400 rounded shadow-md" key={index}></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PulseLoader;
