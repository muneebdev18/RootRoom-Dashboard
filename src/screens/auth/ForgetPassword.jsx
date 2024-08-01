import React, { useEffect, useState } from "react";
import "./style.css";
import Loader from '../../components/loader/'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineHighlightOff } from "react-icons/md";
import Logo2 from "../../assets/images/Coverimage.png";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPasswordApi,clearForgotPassword } from "../../app/features/auth/auth";
const ForgetPassword = () => {
  // For password eye button
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const { message, success, isLoading,data } = useSelector((value) => value.Auth)
  const navigate = useNavigate()

  // ------------- Forgot Password API Handler ---------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordApi({
      email:email
    }))
  };

  // remove value
  const handleRemove = () => {
    setEmail("");
  };

  useEffect(()=>{
    if(success === true){
      toast.success(message,{
        position:"top-right"
      })
      setEmail("")
      navigate("/verifycode",{state:{data:data}})
      dispatch(clearForgotPassword())
    }
    else if(success === null){
      return;
    }
    else{
      toast.error(message,{
        position:"top-right"
      })
      dispatch(clearForgotPassword())
    }
  },[success,message])
  // ---------------- Styling For Loader -----------------
  const loaderStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  }
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
            <label className="text-[#344054]">Email:</label>
            <label className="label-input  mt-1">
              <input
                name="copy-button"
                value={email}
                className="input-tag"
                placeholder="Enter Email Address"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {email.length > 0 &&(
                <MdOutlineHighlightOff
                  color="#667085"
                  onClick={handleRemove}
                  id="icon"
                  className="cursor-pointer"
                />
              ) }
            </label>
          </div>

          <div className="pr-6">
            <div className="sm:pt-[24px] xsm:pt-[15px]">
              <button
                type="submit"
                className="rounded-[10px] text-white hover:bg-[#3a2a88] transition-transform bg-[#070029] h-[50px] w-full text-[14px]"
              >
                {isLoading ? <Loader loaderStyle={loaderStyle}/>:"Continue"}
                
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
