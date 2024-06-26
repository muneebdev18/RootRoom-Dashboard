/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai";

import { selectLogout, changeLogout } from '../../features/modal';
import { selectScreenSize } from '../../features/screenSize';
import { changeMobileMenu } from '../../features/menubar';

const singleModal = ({ con }) => {
    const logout = useSelector(selectLogout);
    const screensize = useSelector(selectScreenSize);
    const dispatch = useDispatch();

    //Logout
    const handleLogOut = () => {
        window.location.href = "/";
        localStorage.removeItem("admin_user")
    }

    const cancelLogOut = () => {
        dispatch(changeLogout());

        if (screensize <= 1024) {
            dispatch(changeMobileMenu(false));
        } else {
            dispatch(changeMobileMenu(true));
        }
    }

    return (
        <div>
            {
                logout && (
                    <div
                        className='fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-noti z-40'
                    >
                        <div className='flex flex-col bg-white sm:p-12 xsm:p-4 mx-2 relative shadow rounded-xl items-center justify-center'>
                            <AiOutlineClose
                                onClick={cancelLogOut}
                                className="absolute right-0 p-2 top-0 text-black z-50 cursor-pointer sm:text-[40px] xsm:text-[30px]"
                            />
                            <h3 className='sm:text-lg xsm:text-sm font-bold'>{con}</h3>
                            <div className="flex flex-row gap-x-8">
                                <button
                                    onClick={handleLogOut}
                                    className='text-base bg-[#D9001B] text-white sm:px-20 xsm:px-10 py-2 rounded-lg mt-4 transition hover:bg-white hover:border-2 hover:border-[#D9001B] hover:text-[#D9001B]'
                                >Yes</button>
                                <button
                                    onClick={cancelLogOut}
                                    className='text-[#4F4F4F] bg-white border-2 border-[#4F4F4F] text-hoverbg sm:px-20 xsm:px-10 py-2 rounded-lg mt-4 transition hover:bg-[#4F4F4F] hover:text-white hover:font-bold'
                                >No</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default singleModal;