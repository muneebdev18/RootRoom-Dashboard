import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { changeScreenSize, selectScreenSize } from "../../features/screenSize";
import { changeMobileMenu, selectMobileMenu } from "../../features/menubar";
import { selectNotiModal } from "../../features/modal";
import Logo from "../../assets/images/LogoRootRoom.png";
import pageLinks from "../../utils/PageLinks";

import "./style.css";

const Sidebar = () => {
  const mobileMenu = useSelector(selectMobileMenu);
  const screensize = useSelector(selectScreenSize);
  const showNoti = useSelector(selectNotiModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // The link which is active
  const Active =
    "[&>div]:w-[220px] [&>div]:rounded-lg [&>div]:bg-[#070029] [&>div>p]:text-white [&>div]:flex [&>div]:justify-start [&>div]:gap-2 [&>div>p]:w-full";
  // All Links
  const Normal =
    "[&>div]:w-[220px] [&>div>p]:text-[#202020] [&>div]:flex [&>div]:justify-start [&>div]:gap-2 [&>div>p]:w-full [&>div]:hover:bg-[#DFF4FC] [&>div]:hover:rounded-lg [&>div]:hover:text-white";

  // Responsive for small Screen
  // The link which is active
  const ActiveRes =
    "z-20 [&>div]:w-100 [&>div]:bg-[#070029] [&>div]:rounded-md [&>div]:text-white [&>div>p]:text-white [&>div]:flex [&>div]:justify-start [&>div]:item-center [&>div]:gap-3 [&>div>p]:w-full";
  // All Links
  const NormalRes =
    "z-20 [&>div]:w-100 [&>div>p]:text-[#202020] [&>div]:text-black [&>div]:flex [&>div]:justify-start [&>div]:item-center [&>div]:gap-3 [&>div>p]:w-full [&>div]:hover:bg-[#DFF4FC] [&>div]:hover:rounded-lg [&>div]:hover:text-white";

  useEffect(() => {
    const handleResize = () => dispatch(changeScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // hide realtime menu
  useEffect(() => {
    if (screensize <= 1024) {
      dispatch(changeMobileMenu(false));
    } else {
      dispatch(changeMobileMenu(true));
    }
  }, [screensize, dispatch]);

  return (
    <>
      {mobileMenu && (
        <div className="flex">
          <div
            className={`
                            ${
                              screensize > 1024
                                ? "w-64 overflow-hidden"
                                : "w-full"
                            } 
                            ${
                              showNoti ? "" : "z-20"
                            } flex flex-col h-screen fixed top-0 left-0 right-0 shadow
                            ${screensize < 1025 && "animate-sidebar-div"}
                            `}
          >
            {screensize > 1024 ? (
              <div
                onClick={() => {
                  navigate("/home");
                }}
                className="bg-[#070029] h-[25%] flex justify-center cursor-pointer items-center"
              >
                <img src={Logo} alt="Logo" className="w-[200px] " />
              </div>
            ) : (
              <div className="flex flex-row bg-[#070029] h-24 justify-between">
                <div className="pl-2">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-20  m-auto items-center pt-4"
                  />
                </div>
                <div className="pr-6 py-8">
                  <AiOutlineCloseCircle
                    size={34}
                    color="#FFFFFF"
                    cursor="pointer"
                    onClick={() => dispatch(changeMobileMenu(false))}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3 bg-white h-screen">
              <div className="flex-1">
                <ul className="p-4 space-y-1 text-sm">
                  <li className="rounded-sm">
                    {pageLinks.map((item, key) => {
                      return (
                        <div key={key}>
                          {screensize > 1025 ? (
                            <NavLink
                              to={`/${item.page}`}
                              className={({ isActive }) =>
                                isActive ? Active : Normal
                              }
                            >
                              <div className="my-1 px-1 pl-4 py-4 text-[14px] group-hover:bg-hoverbg">
                                {item.icon}
                                <p>{item.name}</p>
                              </div>
                            </NavLink>
                          ) : (
                            <NavLink
                              onClick={() => dispatch(changeMobileMenu(false))}
                              to={`/${item.page}`}
                              className={({ isActive }) =>
                                isActive ? ActiveRes : NormalRes
                              }
                            >
                              <div className="my-1 px-1 pl-4 py-4 text-[14px] group-hover:bg-hoverbg">
                                {item.icon}
                                <p>{item.name}</p>
                              </div>
                            </NavLink>
                          )}
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
