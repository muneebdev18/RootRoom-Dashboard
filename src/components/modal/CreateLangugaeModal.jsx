import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createLanguageApi, clearCreateLanguage, editLanguageApi, clearEditLanguage } from "../../app/features/languages/languageSlice";
import { toast } from "react-toastify";
import Loader from "../loader";
const CreateLangugaeModal = ({
  setModalActive,
  title,
  buttonName,
  defaultName,
  modalActive,
  id,
  languageId,
  mutate
}) => {
  //  ----------- DISABLE SCROLL THROUGH OUT THE MODAL -----------
  const dispatch = useDispatch()
  const [value, setValue] = useState(defaultName || "")
  const { isLoading, success, message } = useSelector((value) => value.Langauge)

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


  const languageHandler = () => {
    dispatch(createLanguageApi({
      name: value
    }))

  }
  const editLanguageHandler = () => {
    dispatch(editLanguageApi({
      id: languageId?.id,
      name: value,
      mutate: mutate
    }))
  }
  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-right",

      })
      setModalActive(false)
      setValue("")
      if (id === 'create-language') {
        dispatch(clearCreateLanguage())
      }
      else {
        dispatch(clearEditLanguage())
      }
    }
    else if (success === null) {
      return;
    }
    else {
      toast.error(message, {
        position: "top-right",
      })
      if (id === 'create-language') {
        dispatch(clearCreateLanguage())
      }
      else {
        dispatch(clearEditLanguage())
      }

    }
  }, [success, message])

  //  ---------- Loader Style ------------

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-noti z-40">
      <div className="flex flex-col bg-white sm:p-12 xsm:p-4 mx-2 relative shadow rounded-xl items-center justify-center">
        <p className="text-black font-semibold text-[23px] text-center">
          {title}
        </p>
        <AiOutlineClose
          onClick={() => setModalActive(false)}
          className="absolute right-0 p-2 top-0 text-black z-50 cursor-pointer sm:text-[40px] xsm:text-[30px]"
        />
        <div className="flex flex-col gap-x-8">
          <div className="flex flex-col my-3">
            <label className="mb-2" htmlFor="">
              Language Name
            </label>
            <input
              placeholder="Enter Language Name"
              className="py-2 px-3 w-[500px] border-2 border-gray-500 outline-none rounded-md "
              type="text"
              name=""
              defaultValue={defaultName}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="flex flex-col  my-3">
            <button
              // onClick={languageHandler}
              onClick={id === 'create-language' ? languageHandler : editLanguageHandler}
              className="h-[50px] bg-[#070029] px-[20px] text-[15px] rounded-md text-white hover:bg-[#3a2a88]"
            >
              {isLoading ? <Loader loaderStyle={loaderStyle} /> : `${buttonName}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLangugaeModal;
