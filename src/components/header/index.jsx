import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  MdMenu,
  MdPerson,
  MdLogout,
  MdKeyboardArrowDown

} from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import {
  selectNotiModal,
  selectLogout,
  changeLogout,
} from "../../features/modal";
import { changeActiveMenu, changeMobileMenu } from "../../features/menubar";
import { selectScreenSize } from "../../features/screenSize";
import SingleModal from "../../components/modal/singleModal";
import Notification from "../Notification";


import ProfilePic from "../../assets/images/Face.png";
import "./style.css";

const Header = ({ heading, content }) => {
  const [plopen, setplopen] = useState(false);
  const screensize = useSelector(selectScreenSize);
  const showNoti = useSelector(selectNotiModal);
  const logout = useSelector(selectLogout);
  const dispatch = useDispatch();

  // Profile div for smaller screen
  const profileLinks = () => {
    setplopen(!plopen);
  };

  // Handle logOut User
  const handleLogOut = () => {
    dispatch(changeLogout());
    setplopen(!plopen);
  };

  return (
    <div className={`relative pb-12 ${logout ? "" : "z-10"}`}>
      {logout && <SingleModal con="Are you sure you want to logout?" />}
      <div className="fixed top-0 lg:left-64 md:left-0 xsm:left-0 right-0 bg-[#F9F9F9]">
        <div className="w-full">
          <div className="flex justify-between items-center px-6 py-4 rounded-b-3xl">
            <MdMenu
              onClick={() => {
                dispatch(changeActiveMenu());
                dispatch(changeMobileMenu(true));
              }}
              className={`mr-4 cursor-pointer transition 2xl:hidden xl:hidden lg:contents ${
                screensize < 1025 && "pl-2"
              }`}
              size={40}
            />

            <div className="flex flex-col animate-header">
              <h1 className="text-pageHeading xl:text-[30px] sm:text-[30px] xsm:text-[18px] font-bold">
                {heading}
              </h1>
              <h3 className="text-content 2xl:contents md:contents xsm:hidden">
                {content}
              </h3>
            </div>
            {showNoti && <Notification />}
            <div className="flex justify-center items-center gap-8">
              <div className="lg:contents md:hidden xsm:hidden">
                <div
                  className="flex flex-row cursor-pointer gap-x-2"
                  onClick={profileLinks}
                >
                  <img
                    src={ProfilePic}
                    alt="Profile"
                    className="rounded-[50%] w-8 h-8"
                  />
                  <p className="text-[#6F6C99] text-[13px] my-auto">
                    Pixelz Warrios
                  </p>
                  <MdKeyboardArrowDown
                    color="#6F6C99"
                    size={20}
                    className="my-auto"
                  />
                </div>
                {plopen && (
                  <div className="absolute -bottom-12 right-12 bg-white rounded-xl shadow-md w-32 h-20 flex items-center pl-[10px]">
                    <ul>
                      <li className="" onClick={() => setplopen(!plopen)}>
                        <Link
                          to="/Profile"
                          className="flex justify-start items-center gap-1 p-1 my-1"
                        >
                          <MdPerson color="#344054" size={22} />
                          <span className="text-sm text-gray-400 pl-2 pr-5">
                            Profile
                          </span>
                        </Link>
                      </li>
                      <li className="cursor-pointer" onClick={handleLogOut}>
                        <p className="flex justify-start items-center gap-1 p-1 my-1">
                          <MdLogout color="#344054" size={22} />
                          <span className="text-sm text-gray-400 pl-2 pr-5">
                            logOut
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="2xl:hidden xl:hidden lg:hidden md:contents">
                <div onClick={profileLinks}>
                  <img
                    src={ProfilePic}
                    alt="Profile"
                    className="rounded-[50%] w-10 h-10"
                  />
                </div>
                {plopen && (
                  <div className="absolute -bottom-28 right-12 bg-white rounded-2xl shadow-md w-40 h-36 flex items-center pl-[10px]">
                    <ul>
                      <li onClick={() => setplopen(!plopen)}>
                        <Link
                          to="/Profile"
                          className="flex justify-start items-center gap-1 p-1 my-1"
                        >
                          <MdPerson color="#344054" size={22} />
                          <span className="text-sm text-gray-400 pl-2 pr-5">
                            Profile
                          </span>
                        </Link>
                      </li>
                      <li onClick={() => setplopen(!plopen)}>
                        <Link
                          to="/notif"
                          className="flex justify-start items-center gap-1 p-1 my-1"
                        >
                          <IoMdNotifications color="#344054" size={22} />
                          <span className="text-sm text-gray-400 pl-2 pr-5">
                            Notification
                          </span>
                        </Link>
                      </li>
                      <li className="cursor-pointer" onClick={handleLogOut}>
                        <div className="flex justify-start items-center gap-1 p-1 my-1">
                          <MdLogout color="#344054" size={22} />
                          <span className="text-sm text-gray-400 pl-2 pr-5">
                            logOut
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
