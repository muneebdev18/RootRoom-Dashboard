import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { clearCreateAdmin, createAdminApi } from "../../app/features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../loader";
const CreateAdminModal = ({
  modalActive,
  title,
  defaultName,
  defaultEmail,
  defaultPassword,
  buttonName,
  setModalActive,
  id
}) => {


  const dispatch = useDispatch()
  const { isLoading, message, success } = useSelector((value) => value.Admin)
  // -------- Input Fields Values -----------
  const [value, setValue] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  //--------- Create Admin API Handler --------------
  const createAdminHandler = () => {
    dispatch(createAdminApi(value))
  }
  //  ----------- DISABLE SCROLL THROUGH OUT THE MODAL -----------

  useEffect(() => {
    // Disable scrolling on the body element when the modal is active
    if (modalActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Clean up function to restore scrolling when component unmounts or modal is closed
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalActive]); // Ensure this effect runs when modalActive changes



  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-right"
      })
      setValue({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      dispatch(clearCreateAdmin())
    }
    else if (success === null) {
      return;
    }
    else {
      toast.error(message, {
        position: "top-right"
      })
      dispatch(clearCreateAdmin())
    }
  }, [success, message])

  // ------------- Loader Styles -------------
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    // rgba(32, 32, 32, 0.72)
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-noti z-40">
      <div className="flex flex-col  bg-white sm:p-12 xsm: p-4 mx-2 relative shadow rounded-xl items-center justify-center">
        <p className="text-black font-semibold text-[23px] text-center">
          {title}
        </p>
        <AiOutlineClose
          onClick={() => setModalActive(false)}
          className="absolute right-0 p-2 top-0 text-black z-50 cursor-pointer sm:text-[40px] xsm:text-[30px]"
        />
        <div className="flex flex-col gap-x-8">
          <div className="flex flex-col my-3 ">
            <label className="mb-2" htmlFor="">
              Name
            </label>
            <input
              placeholder="Enter Name"
              value={value.fullname}
              onChange={(e) => setValue({ ...value, fullname: e.target.value })}
              className="py-2 px-3 sm:w-[500px] xsm:w-[300px]  border-2 border-gray-500 outline-none rounded-md "
              type="text"
              name=""
              id=""
              defaultValue={defaultName}
            />
          </div>
          <div className="flex flex-col  my-3">
            <label className="mb-2" htmlFor="">
              Email
            </label>
            <input
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              placeholder="Enter Email"
              className="py-2 px-3 w-[500px] border-2 border-gray-500 outline-none rounded-md "
              type="email"
              name=""
              defaultValue={defaultEmail}
            />
          </div>
          <div className="flex flex-col  my-3">
            <label className="mb-2" htmlFor="">
              Password
            </label>
            <input
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              placeholder="Enter Password"
              className="py-2 px-3 w-[500px] border-2 border-gray-500 outline-none rounded-md "
              type="password"
              name=""
              defaultValue={defaultPassword}
            />
          </div>
          <div className="flex flex-col  my-3">
            <label className="mb-2" htmlFor="">
              Confirm Password
            </label>
            <input
              value={value.confirmPassword}
              onChange={(e) => setValue({ ...value, confirmPassword: e.target.value })}
              placeholder="Enter Confirm Password"
              className="py-2 px-3 w-[500px] border-2 border-gray-500 outline-none rounded-md "
              type="password"
              name=""
              defaultValue={defaultPassword}
            />
          </div>

          <div className="flex flex-col  my-3">
            <button
              onClick={id === "create-admin" ? createAdminHandler : () => { alert("Comming Soon") }}
              className="h-[55px] bg-[#070029] px-[20px] text-[15px] rounded-md text-white"
            >
              {isLoading ? <Loader loaderStyle={loaderStyle}/> :`${buttonName}`}
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminModal;
