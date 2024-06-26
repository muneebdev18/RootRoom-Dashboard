import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
  MdEdit,
  MdRemoveRedEye,
  MdDelete,
  MdOutlineModeComment,
} from "react-icons/md";
import { AiOutlineMail, AiOutlineHeart } from "react-icons/ai";
import { BiShare } from "react-icons/bi";

import {
  selectNotiModal,
  selectActiveModal,
  changeActiveModal,
} from "../../features/modal";
import { selectScreenSize } from "../../features/screenSize";
import MultiModal from "../../components/modal/MultiModal";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Tabs from "../../components/Tabs";
import Tab from "../../components/Tabs/Tab";
import Pagination from "../../components/Pagination";
import UserData from "../../utils/userData";
import PostData from "../../utils/postData";

import "./style.css";

const AdminDetails = () => {
  const showNoti = useSelector(selectNotiModal);
  const screensize = useSelector(selectScreenSize);
  const activeModal = useSelector(selectActiveModal);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [clickedView, setClickedView] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const Currentdata = UserData.slice(firstPostIndex, lastPostIndex);

  // Active NonActive User Message object
  const MessageM = [
    {
      ConfirmationM: "Are you sure you want to active?",
      acceptM: "Are you sure you want to accept this?",
      SuccessM: "ABC has been activated",
    },
  ];

  // Tabs
  const [active, setActive] = useState(0);
  const handleChange = (newActive) => setActive(newActive);

  // user Details Function
  const handleUserDetails = () => {
    setToggle(!toggle);
    window.location.href = "/usermanagement/userdetails";
  };

  // Handle Active/nonActive User
  const handleActiveUser = () => {
    setToggle(!toggle);
    dispatch(changeActiveModal());
  };
 //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
 useEffect(() => {
  window.scroll(0, 0);
}, []);
  return (
    <div>
      {activeModal && (
        <div>
          {MessageM.map((item, i) => (
            <MultiModal
              key={i}
              con={item.ConfirmationM}
              sub={item.acceptM}
              suc={item.SuccessM}
            />
          ))}
        </div>
      )}
      <Sidebar />
      <Header
        heading="User Profile"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right">
        <div className="animate-div">
          <div className="py-10 rounded-[11px]">
            <div className="flex flex-col-reverse md:flex-row justify-between xl:mr-4 xl:ml-8 sm:mr-4 sm:ml-4 xsm:mr-0 xsm:ml-0 items-center gap-3 bg-[#FBF7F4] p-8">
              <div className="flex sm:flex-row xsm:flex-col whitespace-nowrap items-center gap-6 sm:mr-10 xsm:mr-0">
                <div className="flex flex-row">
                  <div className="border border-solid border-[#E0E7ED] bg-[#FBF7F4] rounded-md p-2">
                    <MdKeyboardArrowLeft color="#666E7D" size={30} />
                  </div>
                  <input type="date" className="bg-[#FBF7F4] rounded-lg p-2" />
                  <div className="border border-solid border-[#E0E7ED] bg-[#FBF7F4] rounded-md p-2">
                    <MdKeyboardArrowRight color="#666E7D" size={30} />
                  </div>
                </div>
                <div>
                  <select
                    defaultValue="default"
                    className="w-32 text-center text-[#666E7D] bg-[#FBF7F4] px-[8px] py-[11px] ml-2 cursor-pointer rounded-lg"
                  >
                    <option value="default" disabled hidden>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="nonActive">nonActive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="xl:px-16 xl:py-8 lg:px-16 lg:py-8 md:px-16 md:py-8 xsm:px-2 xsm:py-2 bg-white">
              <div className="flex xl:flex-row lg:flex-col xsm:flex-col">
                {/* Name */}
                <div className="pb-[35px]">
                  <label className="opacity-60">First Name</label>
                  <label className="flex pt-6">
                    <input
                      name="copy-button"
                      defaultValue="Alexa"
                      disabled={true}
                      className={`w-[400px] h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]`}
                    />
                    {screensize < 460 && <p className="pr-6"></p>}
                  </label>
                </div>
                {/* Email */}
                <div className="xl:pl-20 lg:pl-0 xsm:pl-0">
                  <label className="opacity-60">Email Address</label>
                  <label className="flex pt-6">
                    <input
                      name="copy-button"
                      defaultValue="abc@gmail.com"
                      disabled={true}
                      className="w-[400px] h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]"
                    />
                    <AiOutlineMail
                      color="#D0D5DD"
                      className={`relative right-[55px] top-[8px] w-8 h-8`}
                    />
                  </label>
                </div>
              </div>
              <div className="flex xl:flex-row lg:flex-col xsm:flex-col xl:pt-0 lg:pt-4 xsm:pt-4">
                {/* Phone */}
                <div className="pb-[15px]">
                  <label className="opacity-60">Phone</label>
                  <label className="flex pt-6">
                    <input
                      name="copy-button"
                      defaultValue="123123"
                      disabled={true}
                      className="w-[400px] h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD] mr-4"
                    />
                    {screensize < 460 && <p className="pr-6"></p>}
                  </label>
                </div>
                {/* DOB */}
                <div className="xl:pl-20 lg:pl-0 xsm:pl-0">
                  <label className="opacity-60">DOB</label>
                  <label className="flex pt-6">
                    <input
                      name="copy-button"
                      defaultValue="DD/MM/YYYY"
                      disabled={true}
                      className="w-[400px] h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD] mr-4 mr-4"
                    />
                    {screensize < 460 && <p className="pr-6"></p>}
                  </label>
                </div>
              </div>
              <div className="pt-4">
                <h1 className="text-[#4C4C66] text-[30px] font-bold">
                  Friend List
                </h1>
                <p className="text-[#6F6C99] text-[13px]">
                  With all of the styling tool options available in today's
                  market
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-3 bg-[#FBF7F4] px-2 py-8 md:ml-16 sm:ml-2 xsm:ml-0 md:mr-4 sm:mr-2">
              <div className="flex sm:flex-row xsm:flex-col whitespace-nowrap items-center gap-6">
                <div className="flex flex-row">
                  <div className="border border-solid border-[#E0E7ED] bg-[#FBF7F4] rounded-md p-2">
                    <MdKeyboardArrowLeft color="#666E7D" size={30} />
                  </div>
                  <input type="date" className="bg-[#FBF7F4] rounded-lg p-2" />
                  <div className="border border-solid border-[#E0E7ED] bg-[#FBF7F4] rounded-md p-2">
                    <MdKeyboardArrowRight color="#666E7D" size={30} />
                  </div>
                </div>
                <div>
                  <select
                    defaultValue="default"
                    className="w-32 text-center text-[#666E7D] bg-[#FBF7F4] px-[8px] py-[11px] ml-2 cursor-pointer rounded-lg"
                  >
                    <option value="default" disabled hidden>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="nonActive">nonActive</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              className={`text-center ${
                screensize > 768 ? "pl-16 pr-4" : "px-2"
              }`}
            >
              <Tabs active={active} onChange={handleChange}>
                <Tab title="Friends">
                  <div className="overflow-x-scroll lg:overflow-auto">
                    <table className="w-full mt-10">
                      <thead>
                        <tr className="w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500">
                          <th scope="col" className="text-start text-base px-6">
                            <div className="flex items-center">
                              <input
                                id="checkbox-all-search"
                                type="checkbox"
                                className="w-4 h-4"
                              />
                              <label
                                htmlFor="checkbox-all-search"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </th>
                          <th className="text-start text-[#464F60] px-6">#</th>
                          <th className="text-start text-[#464F60] px-6">
                            NAME
                          </th>
                          <th className="text-start text-[#464F60] px-6">
                            EMAIL
                          </th>
                          <th className="text-start text-[#464F60] px-6">
                            REGISTERED ON
                          </th>
                          <th className="text-start text-[#464F60] px-6">
                            SUBSCRIBER
                          </th>
                          <th className="text-start text-[#464F60] px-6">
                            STATUS
                          </th>
                          <th className="text-center text-[#464F60]">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {Currentdata.map((item) => {
                          return (
                            <tr
                              className="h-20 cursor-pointer font-semibold text-[#292D32]"
                              key={item.id}
                            >
                              <td className="text-start text-sm px-6">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4"
                                  />
                                  <label
                                    htmlFor="checkbox-all-search"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="text-start text-sm px-6">
                                {item.id}
                              </td>
                              <td className="text-start text-sm px-6">
                                <p>{item.Name}</p>
                                <p className="text-[#687182]">{item.phone}</p>
                              </td>
                              <td className="text-start text-sm px-6">
                                {item.Email}
                              </td>
                              <td className="text-start text-sm px-6">
                                {item.Created}
                              </td>
                              <td className="text-start text-sm px-6">
                                <div className="group text-sm">
                                  <p
                                    className={`w-16 py-2 text-center cursor-pointer rounded-md border rounded-[100px]
                                                                            ${
                                                                              item.subscriber ===
                                                                              "Yes"
                                                                                ? "text-[#4F5AED] bg-[#F0F1FA]"
                                                                                : "text-[#14804A] bg-[#E1FCEF]"
                                                                            }`}
                                  >
                                    {item.subscriber}
                                  </p>
                                </div>
                              </td>
                              <td className="text-start text-sm px-6">
                                <div className="group text-sm">
                                  <p
                                    className={`w-[100px] text-center cursor-pointer py-2 rounded-md border rounded-[100px]
                                                                            ${
                                                                              item.Status ===
                                                                              "Active"
                                                                                ? "text-[#4F5AED] bg-[#F0F1FA]"
                                                                                : "text-[#14804A] bg-[#E1FCEF]"
                                                                            }`}
                                  >
                                    {item.Status}
                                  </p>
                                </div>
                              </td>
                              <td className=" text-sm text-center">
                                <div
                                  className={`${
                                    showNoti ? "" : "relative"
                                  } group text-sm`}
                                >
                                  <MdMoreHoriz
                                    onClick={() => {
                                      setToggle(!toggle);
                                      setClickedView(item.id);
                                    }}
                                    className="cursor-pointer m-auto"
                                  />
                                  {toggle && clickedView === item?.id && (
                                    <ul className="absolute w-24 bg-white shadow rounded-lg -top-3 2xl:-left-16 xl:-left-20 xsm:-left-20">
                                      <li
                                        className="cursor-pointer border-b-2 p-2"
                                        onClick={handleActiveUser}
                                      >
                                        <span className="flex flex-row text-sm text-gray-500">
                                          <MdEdit
                                            size={15}
                                            className="mt-[3px]"
                                          />{" "}
                                          <span className="pl-2">Edit</span>
                                        </span>
                                      </li>
                                      <li
                                        className="cursor-pointer border-b-2 p-2"
                                        onClick={handleUserDetails}
                                      >
                                        <span className="flex flex-row text-sm text-gray-500">
                                          <MdRemoveRedEye
                                            size={15}
                                            className="mt-[3px]"
                                          />{" "}
                                          <span className="pl-2">View</span>
                                        </span>
                                      </li>
                                      <li
                                        className="cursor-pointer p-2"
                                        onClick={() => setToggle(!toggle)}
                                      >
                                        <span className="flex flex-row text-sm text-gray-500">
                                          <MdDelete
                                            size={15}
                                            className="mt-[3px]"
                                          />{" "}
                                          <span className="pl-2">Delete</span>
                                        </span>
                                      </li>
                                    </ul>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-10 flex md:flex-row justify-between items-center flex-col gap-3 text-[11px]">
                    <p className="pl-4 text-[#687182] text-[14px]">
                      {firstPostIndex + 1}-{lastPostIndex} of {UserData.length}
                    </p>

                    <div className="flex sm:flex-row xsm:flex-col space-x-4">
                      <div className="flex flex-row text-[11px]">
                        <span className="pt-3 text-[#687182] text-[14px]">
                          Rows per page:
                        </span>
                        <select
                          value={postPerPage}
                          onChange={(e) => setPostPerPage(e.target.value)}
                          className="w-20 text-center bg-[#FBF7F4] px-[8px] py-[11px] ml-2 cursor-pointer rounded-lg"
                        >
                          <option value="10">10</option>
                          <option value="5">5</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </select>
                      </div>
                      <Pagination
                        totalPost={UserData.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab title="Posts">
                  <div className="flex flex-col pt-8 bg-white">
                    {PostData.map((item, key) => {
                      return (
                        <div key={key}>
                          <div className="flex flex-row w-full">
                            <div
                              className={`${
                                screensize < 450
                                  ? "w-3/12"
                                  : screensize < 768
                                  ? "w-2/12"
                                  : "w-1/12"
                              }
                                                                xl:pt-6 sm:pt-6 xsm:pt-0`}
                            >
                              <img
                                src={item.pic}
                                alt="Profile"
                                className=" xl:w-20 md:w-20 sm:w-16 xsm:w-12 xl:h-20 md:h-20 sm:h-16 xsm:h-12 rounded-[50%]"
                              />
                            </div>
                            <div
                              className={`${
                                screensize < 450
                                  ? "w-9/12"
                                  : screensize < 768
                                  ? "w-10/12"
                                  : "w-11/12"
                              }
                                                                text-start xl:p-4 sm:p-4 xsm:p-0 2xl:text-[20px] sm:text-[20px] xsm:text-[12px]`}
                            >
                              <div className="flex sm:flex-row xsm:flex-col justify-between">
                                <p>
                                  <span className="font-bold">{item.name}</span>{" "}
                                  <span className="text-[#687684]">
                                    {item.username}
                                  </span>
                                </p>
                                <p className="text-[#687684] 2xl:text-[20px] sm:text-[20px] xsm:text-[12px]">
                                  {item.time}
                                </p>
                              </div>
                              <p className="text-[#141619] font-medium">
                                {item.content}
                              </p>
                              <p className="text-[#4C9EEB]">{item.tags}</p>
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <img
                              src={item.post}
                              alt="Posts"
                              className='"h-auto 2xl:max-w-2xl lg:max-w-2xl md:min-w-2xl m-auto rounded-lg'
                            />
                          </div>
                          <div className="flex flex-row sm:text-[25px] xsm:text-[16px] text-[#687684] pt-2 space-x-24 pb-8 border-b-2">
                            <span className="flex flex-row">
                              <span className="sm:pt-2 xsm:pt-1">
                                <MdOutlineModeComment />
                              </span>{" "}
                              7
                            </span>
                            <span className="flex flex-row">
                              <span className="sm:pt-2 xsm:pt-1">
                                <AiOutlineHeart />
                              </span>{" "}
                              5
                            </span>
                            <span className="pt-2">
                              <BiShare />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
