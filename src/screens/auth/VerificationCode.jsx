import React, { useState, useEffect } from "react";
import Pin from "../../components/pinInput";
import Logo2 from "../../assets/images/Coverimage.png";
const VerificationCode = () => {
  const [timer, setTimer] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/newpassword";
  };

  useEffect(() => {
    const time = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);

    return () => clearInterval(time);
  }, [timer]);

  return (
    <div className="flex flex-row bg-white">
      <div className="xl:w-1/2 sm:w-9/12 xsm:w-full h-screen xl:px-40 lg:px-44 md:px-32 xsm:px-6 xl:mx-12 lg:mx-auto xsm:mx-auto animate-auth-div">
        <h1 className="font-[500] xl:pt-[120px] lg:pt-0 xsm:pt-0 sm:text-[40px] xsm:text-[20px] text-[#202020]">
          Verification
        </h1>
        <h1 className="sm:text-[16px] xsm:text-[12px] text-[#667085] pb-[30px] pr-6">
          Enter your 4 digits code that you received on your email.
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Verification Code */}
          <div className="pb-[15px]">
            <Pin />
          </div>
          <p className="text-center text-[#F2451C]">
            00:{timer < 10 ? `0${timer}` : timer}
          </p>

          <div className="sm:pt-[24px] xsm:pt-[15px]">
            <button
              type="submit"
              className="rounded-[10px] text-white  hover:bg-[#3a2a88] transition-transform bg-[#070029] h-[50px] w-full text-[14px]"
            >
              Continue
            </button>
          </div>
          {timer < 1 && (
            <div className="text-center">
              <p className="text-[#344054] pt-4">
                If you didn't receive a code!{" "}
                <span
                  onClick={() => setTimer(30)}
                  className="text-[#070029] cursor-pointer font-semibold"
                >
                  Resend
                </span>
              </p>
            </div>
          )}
        </form>
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

export default VerificationCode;
