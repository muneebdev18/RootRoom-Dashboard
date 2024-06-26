import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineHighlightOff, MdRemoveRedEye } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";

import GoogleButton from "../../components/googleButton";
import Logo2 from "../../assets/images/Coverimage.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // For password eye button
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: true,
    showConfirmPassword: true,
  });

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
    window.location.href = "/home";
  };

  // remove value
  const handleRemove = () => {
    setEmail("");
  };

  return (
    <div className="flex flex-row bg-white">
      <div className="xl:w-1/2 sm:w-8/12 xsm:w-full h-screen overflow-auto xl:px-16 lg:px-0 xsm:px-0 xsm:pl-6 xl:mx-12 lg:mx-auto xsm:mx-auto animate-auth-div">
        <h1 className="font-[500] xl:pt-[80px] lg:pt-0 xsm:pt-0 sm:text-[40px] xsm:text-[20px] text-[#202020]">
          3D Avatar game
        </h1>
        <h1 className="sm:text-[16px] xsm:text-[12px] text-[#667085] pb-[30px]">
          Please fill your detail to Create your account.
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="pb-[15px]">
            <label className="text-[#344054]">Username</label>
            <label className="label-input">
              <input
                name="copy-button"
                value={username}
                className="input-tag"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="pr-6"></p>
            </label>
          </div>
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

          <div className="flex sm:flex-row xsm:flex-col justify-between">
            {/* Password */}
            <div className="pb-[15px] w-full">
              <label className="text-[#344054]">Password</label>
              <label htmlFor="copy-button" className="label-input">
                <input
                  name="copy-button"
                  aria-label="copy-button"
                  className="input-tag"
                  placeholder="Enter Password"
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
            <div className="pb-[15px] w-full">
              <label className="text-[#344054]">Confirm Password</label>
              <label htmlFor="copy-button" className="label-input">
                <input
                  name="copy-button"
                  aria-label="copy-button"
                  className="input-tag"
                  placeholder="Enter Confirm Password"
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
          </div>

          <div className="pr-6 relative">
            <div className="flex flex-row text-[14px] space-x-2">
              <input type="checkbox" className="h-[18px] w-[18px]" />
              <p className="text-[#344054] sm:text-[16px] xsm:text-[12px] font-medium">
                Rememder me
              </p>
            </div>
          </div>
          <div className="pr-6">
            <div className="sm:pt-[24px] xsm:pt-[15px]">
              <button
                type="submit"
                className="rounded-[10px] text-white bg-bgBtn h-[50px] w-full text-[16px]"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-row pt-[10px] pr-6 pb-[20px]">
          {/* content is button text */}
          <GoogleButton content="Sign Up with Google" />
        </div>
        <div className="text-center sm:pb-0 xsm:pb-12 sm:mr-0 xsm:mr-4">
          <p className="text-[#344054] sm:text-[16px] xsm:text-[12px]">
            Already have an account?{" "}
            <span className="text-[#5429FF]">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
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

export default SignUp;
