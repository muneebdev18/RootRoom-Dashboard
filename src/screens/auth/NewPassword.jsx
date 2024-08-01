import React, { useState, useEffect } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Logo2 from "../../assets/images/Coverimage.png";
import { useDispatch, useSelector } from "react-redux";
import { clearNewPassword, newPasswordApi } from "../../app/features/auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
const NewPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: true,
    showConfirmPassword: true,
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { success, isLoading, data, message } = useSelector((value) => value.Auth)
  // -------- Recieving Data from Verification Code --------
  const location = useLocation()
  const tempData = location?.state?.tempData


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(newPasswordApi({
      adminId: tempData?.userId,
      password: values?.password,
      confirmPassword: values?.confirmPassword
    }))
  };

  useEffect(() => {
    if (success === true) {
      toast.success(message, {
        position: "top-right"
      })
      navigate("/success")
      setValues({ ...values, password: "", confirmPassword: "" })
      dispatch(clearNewPassword())
    }
    else if (success === null) {
      return;
    }
    else {
      toast.error(message, {
        position: "top-right"
      })
      dispatch(clearNewPassword())

    }
  }, [success, message])
  const loaderStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  }
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
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                value={values?.password}
              />
              <div onClick={() => setValues({ ...values, showPassword: !values.showPassword })}>
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
                onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                value={values?.confirmPassword}
              />
              <div onClick={() => setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })}>
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
                {isLoading ? <Loader loaderStyle={loaderStyle}/>:"Update Password"}
               
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
