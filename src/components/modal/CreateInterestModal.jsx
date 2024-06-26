import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";
import IconList from "../iconlist/IconList";

const CreateInterestModal = ({
  setModalActive,
  title,
  buttonName,
  defaultName,
  defaultImage,
}) => {
  // ----- File Upload ----------
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
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
              //   value={value?.title}
              //   onChange={(e) => setValue({ ...value, title: e.target.value })}
              className="py-2 px-3 w-[500px] border-2 border-gray-500 outline-none rounded-md "
              type="text"
              name=""
              defaultValue={defaultName}
            />
          </div>

          <div className="flex flex-col  my-3">
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
          {/* <div className="flex flex-col  my-3">
            <div>
              <IconList />
            </div>
          </div> */}
          <div className="flex flex-col  my-3">
            <button
              //   onClick={clickHandler}
              className="py-[12px] bg-[#070029] px-[20px] text-[15px] rounded-md text-white"
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterestModal;
