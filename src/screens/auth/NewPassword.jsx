import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";

import Logo2 from "../../assets/images/Coverimage.png";
const NewPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: true,
    showConfirmPassword: true,
  });

  // new password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // confirm password
  const handleConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/success";
  };

  return (
    <div className="flex flex-row bg-white">
      <div className="xl:w-1/2 sm:w-8/12 xsm:w-full h-screen xl:px-24 lg:px-0 xsm:px-0 xsm:pl-6 xl:mx-12 lg:mx-auto xsm:mx-auto animate-auth-div">
        <h1 className="font-[500] xl:pt-[120px] lg:pt-0 xsm:pt-0 sm:text-[40px] xsm:text-[20px] text-[#202020]">
          New Password
        </h1>
        <h1 className="sm:text-[16px] xsm:text-[12px] text-[#667085] pb-[30px]">
          Set the new password for your account so you can login and access all
          features.
        </h1>

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="pb-[15px]">
            <label className="text-[#344054]">New Password</label>
            <label htmlFor="copy-button" className="label-input">
              <input
                name="copy-button"
                aria-label="copy-button"
                className="input-tag"
                placeholder="Enter New Password"
                type={values.showPassword ? "password" : "text"}
                onChange={handlePasswordChange("password")}
              />
              <div onClick={handleClickShowPassword}>
                {values.showPassword ? (
                  <MdRemoveRedEye
                    color="#667085"
                    id="icon"
                    className="cursor-pointer"
                  />
                ) : (
                  <AiFillEyeInvisible
                    color="#667085"
                    id="icon"
                    className="cursor-pointer"
                  />
                )}
              </div>
            </label>
          </div>

          {/* Confirm Password */}
          <div className="pb-[15px]">
            <label className="text-[#344054]">Confirm Password</label>
            <label htmlFor="copy-button" className="label-input">
              <input
                name="copy-button"
                aria-label="copy-button"
                className="input-tag"
                placeholder="Confirm Password"
                type={values.showConfirmPassword ? "password" : "text"}
                onChange={handlePasswordChange("password")}
              />
              <div onClick={handleConfirmPassword}>
                {values.showConfirmPassword ? (
                  <MdRemoveRedEye
                    color="#667085"
                    id="icon"
                    className="cursor-pointer"
                  />
                ) : (
                  <AiFillEyeInvisible
                    color="#667085"
                    id="icon"
                    className="cursor-pointer"
                  />
                )}
              </div>
            </label>
          </div>

          <div className="pr-6">
            <div className="sm:pt-[24px] xsm:pt-[15px]">
              <button
                type="submit"
                className="rounded-[10px] text-white hover:bg-[#3a2a88] transition-transform bg-[#070029] h-[50px] w-full text-[14px]"
              >
                Update Password
              </button>
            </div>
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

export default NewPassword;
