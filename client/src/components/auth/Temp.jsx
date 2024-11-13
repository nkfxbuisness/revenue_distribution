import React, { useState, useRef, useEffect } from "react";

const Temp = ({verifyOTP,enterOTP,setEnterOTP,OTPverified,resendOTP}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Only allow numeric values

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setEnterOTP(newOtp.join(""))
    setOtp(newOtp);

    // Move to the next input field if not on the last one
    if (element.nextSibling && element.value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace moves to the previous input box
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  // const handleSubmit = () => {
  //   alert("Entered OTP is: " + otp.join(""));
  //   // You can add form submission logic here
  // };
  useEffect(() => {
    if(OTPverified.success===false && OTPverified.message==="invalid OTP : reenter correct OTP."){
      setOtp(new Array(6).fill(""))
    }
  }, [OTPverified])
  

  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" flex items-center gap-4">
        <div className="flex justify-center space-x-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}

              className={`w-9 h-9 border-2 border-blue-200 rounded-lg text-center text-blue-600 text-2xl font-semibold focus:outline-none focus:border-blue-600 `}
            />
          ))}
        </div>
        <button
          onClick={verifyOTP}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Verify
        </button>
      </div>
      <p className="text-sm text-center mt-4 mb-2">
        Didn’t get the code?{" "}
        <span className="text-blue-600 font-medium" onClick={resendOTP}>
          Click to resend.
        </span>
      </p>
    </div>
  );
};

export default Temp;
