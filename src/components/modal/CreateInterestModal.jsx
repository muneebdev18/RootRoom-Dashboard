import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateInterest,
  clearEditInterest,
  createInterestApi,
  editInterestApi,
} from "../../app/features/interest/interestSlice";
import { toast } from "react-toastify";
import Loader from "../loader";

const CreateInterestModal = ({
  setModalActive,
  title,
  buttonName,
  defaultName,
  defaultImage,
  modalActive,
  id,
  interestId,
  mutate,
}) => {
  // ----- File Upload ----------
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const [name, setName] = useState(defaultName || "");
  const dispatch = useDispatch();
  const { isLoading, message, success } = useSelector(
    (value) => value.Interest
  );
  //  ----------- DISABLE SCROLL THROUGH OUT THE MODAL -----------
  useEffect(() => {
    // Disable scrolling on the body element when the modal is active
    if (modalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Clean up function to restore scrolling when component unmounts or modal is closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalActive]);

  // ----------- Create Interest API Handler ------------
  const createInterestHandler = () => {
    dispatch(
      createInterestApi({
        name: name,
        file: file,
        mutate: mutate
      })
    );
  };

  // ----------- Edit Interest API Handler ------------
  const editInterestHandler = () => {
    dispatch(
      editInterestApi({
        name: name,
        file: file,
        id: interestId?.id,
        mutate: mutate,
      })
    );
  };

  useEffect(() => {
    if (success) {
      toast.success(message,{delay:2000} ,{
        position: "top-right",
      });
      setModalActive(false)

      if (id === 'edit-interest') {
        dispatch(clearEditInterest());
        
      } else {
        dispatch(clearCreateInterest());
      }
    }
    else if (success === null) {
      return;
    }
    else {
      toast.error(message, {delay:2000},{
        position: "top-right",
      });
      setFile(null);

      if (id === 'edit-interest') {
        dispatch(clearEditInterest());
      } else {
        dispatch(clearCreateInterest());
      }
    }
  }, [success, message, dispatch]);
  // ------ Loader Style ---------
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
              Name
            </label>
            <input
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="py-2 px-3 w-[500px] border-2 border-gray-500 outline-none rounded-md "
              type="text"
              name=""
              defaultValue={defaultName}
            />
          </div>

          <div className="flex flex-col my-3">
            <label className="mb-2" htmlFor="">
              Upload Image:
            </label>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
            <p className="mt-3 text-center font-semibold capitalize">
              {file
                ? `File name: ${file?.name}`
                : defaultImage
                  ? defaultImage
                  : "no files uploaded yet"}
            </p>
          </div>
          <div className="flex flex-col my-3">
            <button
              onClick={
                id === "create-interest"
                  ? ()=>createInterestHandler()
                  : ()=>editInterestHandler()
              }
              className="h-[50px] bg-[#070029] px-[20px] text-[15px] rounded-md text-white hover:bg-[#3a2a88]"
            >
              {isLoading ? (
                <Loader loaderStyle={loaderStyle} />
              ) : (
                `${buttonName}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterestModal;
