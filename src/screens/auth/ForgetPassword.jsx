import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineHighlightOff } from "react-icons/md";

import Logo2 from "../../assets/images/Coverimage.png";
import "./style.css";

const ForgetPassword = () => {
  // For password eye button
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/verifycode";
  };

  // remove value
  const handleRemove = () => {
    setEmail("");
  };

  return (
    <div className="flex flex-row bg-white">
      <div className="xl:w-1/2 sm:w-8/12 xsm:w-full h-screen xl:px-24 lg:px-0 xsm:px-0 xsm:pl-6 xl:mx-12 lg:mx-auto xsm:mx-auto animate-auth-div">
        <h1 className="font-[500] xl:pt-[120px] lg:pt-0 xsm:pt-0 sm:text-[40px] xsm:text-[20px] text-[#202020]">
          Forgot Password
        </h1>
        <h1 className="sm:text-[16px] xsm:text-[12px] text-[#667085] pb-[30px] pr-6">
          Enter your email for the verification proccess,we will send 4 digits
          code to your email.
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="pb-[15px]">
            <label className="text-[#344054]">Email</label>
            <label className="label-input">
              <input
                name="copy-button"
                value={email}
                className="input-tag"
                placeholder="Enter Email Address"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {email ? (
                <MdOutlineHighlightOff
                  color="#667085"
                  onClick={handleRemove}
                  id="icon"
                  className="cursor-pointer"
                />
              ) : (
                <p className="pr-6"></p>
              )}
            </label>
          </div>

          <div className="pr-6">
            <div className="sm:pt-[24px] xsm:pt-[15px]">
              <button
                type="submit"
                className="rounded-[10px] text-white hover:bg-[#3a2a88] transition-transform bg-[#070029] h-[50px] w-full text-[14px]"
              >
                Continue
              </button>
            </div>
          </div>
          <div className="text-center sm:mr-0 xsm:mr-4">
            <p className="text-[#344054] pt-4">
              Remember Password ?{" "}
              <span className="text-[#070029] font-semibold">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </div>
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

export default ForgetPassword;
