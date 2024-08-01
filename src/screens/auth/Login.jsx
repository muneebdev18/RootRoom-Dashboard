import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineHighlightOff, MdRemoveRedEye } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import Logo2 from "../../assets/images/Coverimage.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { clearLogin, loginApi } from '../../app/features/auth/auth'
import { toast } from "react-toastify";
import Loader from '../../components/loader'
const Login = () => {
  const dispatch = useDispatch()
  const { message, success, isLoading, errorMessage } = useSelector((value) => value.Auth)

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    email: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginApi({
      email: values.email,
      password: values.password
    }))
  };

  useEffect(() => {
    if (success === true) {
      
      window.location.href = "home"
      toast.success(message, {
        position: "top-right",
        
      })
      // dispatch(clearLogin())
    }

    else if (success === null) {
      return;
    }
    else {
      toast.error(message, {
        position: "top-right",
      })
      dispatch(clearLogin())
  }
  }, [success, message, errorMessage, dispatch])

  const loaderStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",

  }

  return (
    <div className="flex flex-row bg-white">
      <div className="xl:w-1/2 sm:w-8/12 xsm:w-full h-screen xl:px-24 lg:px-0 xsm:px-0 xsm:pl-6 xl:mx-12 lg:mx-auto xsm:mx-auto animate-auth-div">
        <div className="xl:hidden lg:contents">
        </div>
        <h1 className="font-[500] xl:pt-[120px] lg:pt-0 xsm:pt-0 sm:text-[40px] xsm:text-[20px] text-[#202020]">
          Enlightened Dashboard
        </h1>
        <h1 className="sm:text-[16px] xsm:text-[12px] text-[#667085] pb-[30px]">
          Please fill your detail to access your account.
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="pb-[15px]">
            <label className="text-[#344054]">Email</label>
            <label className="label-input">
              <input
                name="copy-button"
                value={values.email}
                className="input-tag"
                placeholder="Enter Email Address"
                type="email"
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
              {values?.email?.length > 0 ? (
                <MdOutlineHighlightOff
                  color="#667085"
                  onClick={() => setValues({ ...values, email: "" })}
                  id="icon"
                  className="cursor-pointer"
                />
              ) : (
                <p className="pr-6"></p>
              )}
            </label>
          </div>

          {/* Password */}
          <div className="pb-[15px]">
            <label className="text-[#344054]">Password</label>
            <label htmlFor="copy-button" className="label-input">
              <input
                name="copy-button"
                aria-label="copy-button"
                className="input-tag"
                placeholder="Enter Password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
              <div onClick={() => setValues({ ...values, showPassword: !values.showPassword })}>
                {values.showPassword ? (
                  <AiFillEyeInvisible
                    color="#667085"
                    id="icon"
                    className="cursor-pointer"
                  />
                ) : (

                  <MdRemoveRedEye
                    color="#667085"
                    id="icon"
                    className="cursor-pointer"
                  />
                )}
              </div>
            </label>
          </div>
          <div className="flex flex-row justify-between pr-6 relative">
            <div className="flex flex-row items-center space-x-2">
              <input type="checkbox" className="h-[18px] w-[18px]" />
              <p className="text-[#344054] sm:text-[16px] xsm:text-[12px] font-medium">
                Rememder me
              </p>
            </div>
            <div className="text-[#5429FF] flex flex-row justify-end sm:text-[16px] xsm:text-[12px] font-medium">
              <Link to="/forgetpassword">Forgot Password?</Link>
            </div>
          </div>
          <div className="pr-6">
            <div className="sm:pt-[24px] xsm:pt-[15px]">
              <button
                type="submit"
                className="rounded-[10px] text-white hover:bg-[#3a2a88] transition-transform bg-[#070029]  h-[50px] w-full text-[16px]"
              >
  
                {isLoading ? <Loader loaderStyle={loaderStyle}/> :"Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Right Side */}
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

export default Login;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { MdOutlineHighlightOff, MdRemoveRedEye } from "react-icons/md";
// import { AiFillEyeInvisible } from "react-icons/ai";
// import Logo2 from "../../assets/images/Coverimage.png";
// import "./style.css";
// import { useDispatch, useSelector } from "react-redux";
// import { clearLogin, loginApi } from '../../app/features/auth/auth';
// import { toast } from "react-toastify";
// import Loader from '../../components/loader';

// const Login = () => {
//   const dispatch = useDispatch();
//   const { message, success, isLoading, errorMessage } = useSelector((state) => state.Auth);

//   const [values, setValues] = useState({
//     password: "",
//     showPassword: false,
//     email: "",
//   });

//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginApi({
//       email: values.email,
//       password: values.password,
//       rememberMe: rememberMe
//     }));
//   };

//   useEffect(() => {
//     if (success === true) {
//       const token = localStorage.getItem('admin_user');
      
//       if (rememberMe) {
//         localStorage.setItem('admin_user', token);
//       } else {
//         sessionStorage.setItem('admin_user', token);
//         localStorage.removeItem('admin_user');
//       }

//       window.location.href = "home";
//       toast.success(message, {
//         position: "top-right",
//       });
//       // dispatch(clearLogin())
//     } else if (success === null) {
//       return;
//     } else {
//       toast.error(message, {
//         position: "top-right",
//       });
//       dispatch(clearLogin());
//     }
//   }, [success, message, errorMessage, dispatch, rememberMe]);

//   useEffect(() => {
//     const token = localStorage.getItem('admin_user') || sessionStorage.getItem('admin_user');
//     if (token) {
//       // Redirect to home if already logged in
//       window.location.href = "home";
//     }

//     const handleBeforeUnload = () => {
//       sessionStorage.clear();
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   const loaderStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   };

//   return (
//     <div className="flex flex-row bg-white">
//       <div className="xl:w-1/2 sm:w-8/12 xsm:w-full h-screen xl:px-24 lg:px-0 xsm:px-0 xsm:pl-6 xl:mx-12 lg:mx-auto xsm:mx-auto animate-auth-div">
//         <div className="xl:hidden lg:contents"></div>
//         <h1 className="font-[500] xl:pt-[120px] lg:pt-0 xsm:pt-0 sm:text-[40px] xsm:text-[20px] text-[#202020]">
//           Enlightened Dashboard
//         </h1>
//         <h1 className="sm:text-[16px] xsm:text-[12px] text-[#667085] pb-[30px]">
//           Please fill your detail to access your account.
//         </h1>

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="pb-[15px]">
//             <label className="text-[#344054]">Email</label>
//             <label className="label-input">
//               <input
//                 name="copy-button"
//                 value={values.email}
//                 className="input-tag"
//                 placeholder="Enter Email Address"
//                 type="email"
//                 onChange={(e) => setValues({ ...values, email: e.target.value })}
//               />
//               {values?.email?.length > 0 ? (
//                 <MdOutlineHighlightOff
//                   color="#667085"
//                   onClick={() => setValues({ ...values, email: "" })}
//                   id="icon"
//                   className="cursor-pointer"
//                 />
//               ) : (
//                 <p className="pr-6"></p>
//               )}
//             </label>
//           </div>

//           {/* Password */}
//           <div className="pb-[15px]">
//             <label className="text-[#344054]">Password</label>
//             <label htmlFor="copy-button" className="label-input">
//               <input
//                 name="copy-button"
//                 aria-label="copy-button"
//                 className="input-tag"
//                 placeholder="Enter Password"
//                 type={values.showPassword ? "text" : "password"}
//                 value={values.password}
//                 onChange={(e) => setValues({ ...values, password: e.target.value })}
//               />
//               <div onClick={() => setValues({ ...values, showPassword: !values.showPassword })}>
//                 {values.showPassword ? (
//                   <AiFillEyeInvisible
//                     color="#667085"
//                     id="icon"
//                     className="cursor-pointer"
//                   />
//                 ) : (
//                   <MdRemoveRedEye
//                     color="#667085"
//                     id="icon"
//                     className="cursor-pointer"
//                   />
//                 )}
//               </div>
//             </label>
//           </div>
//           <div className="flex flex-row justify-between pr-6 relative">
//             <div className="flex flex-row items-center space-x-2">
//               <input
//                 type="checkbox"
//                 className="h-[18px] w-[18px]"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <p className="text-[#344054] sm:text-[16px] xsm:text-[12px] font-medium">
//                 Remember me
//               </p>
//             </div>
//             <div className="text-[#070029] flex flex-row justify-end sm:text-[16px] xsm:text-[12px] font-medium">
//               <Link to="/forgetpassword">Forgot Password?</Link>
//             </div>
//           </div>
//           <div className="pr-6">
//             <div className="sm:pt-[24px] xsm:pt-[15px]">
//               <button
//                 type="submit"
//                 className="rounded-[10px] text-white hover:bg-[#3a2a88] transition-transform bg-[#070029]  h-[50px] w-full text-[16px]"
//               >
//                 {isLoading ? <Loader loaderStyle={loaderStyle} /> : "Sign In"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Right Side */}
//       <div className="relative w-1/2 xl:contents lg:hidden md:hidden sm:hidden xsm:hidden overflow-hidden">
//         <div className="h-screen flex flex-col items-center justify-center">
//           <img
//             src={Logo2}
//             alt="pickle-banner"
//             className="rounded-[10%] h-[95%] w-full pr-6"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
