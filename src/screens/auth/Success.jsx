import React from "react";
import Lottie from "react-lottie";

import successAnimation from "../../assets/animations/success-animation.json";

import Logo2 from "../../assets/images/Coverimage.png";
import "./style.css";

const Success = () => {
  // Animation options
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Password Change Successfully
  const handleSuccess = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-row bg-white">
      <div className="w-1/2 success-tick">
        <Lottie options={defaultOptions} width={220} />
        <h1 className="font-bold text-[#344054] xl:text-[40px] xsm:text-[20px]">
          Successfully
        </h1>
        <p className="pb-[8px] text-[#828282]">
          Your password has been reset successfully
        </p>
        <div className="pt-[31px]">
          <button
            onClick={handleSuccess}
            type="submit"
            className="rounded-[10px] text-white hover:bg-[#3a2a88] transition-transform bg-[#070029] h-[50px] xl:w-[420px] lg:w-[370px] md:w-[320px] sm:w-[280px] xsm:w-full"
          >
            Continue
          </button>
        </div>
      </div>
      <div className="relative w-1/2 xl:contents lg:hidden md:hidden sm:hidden xsm:hidden overflow-hidden">
        <div className="h-screen flex flex-col items-center justify-center">
          <img
            src={Logo2}
            alt="pickle-banner"
            className="rounded-[10%] h-[95%] w-full pr-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
