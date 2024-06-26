import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";

import { selectUpdateProfile, changeUpdateProfile } from '../../features/modal';
import { selectScreenSize } from '../../features/screenSize';
import { changeMobileMenu } from '../../features/menubar';

const UpdateModal = ({ con, sub }) => {
    const updateProfile = useSelector(selectUpdateProfile);
    const screensize = useSelector(selectScreenSize);
    const dispatch = useDispatch();

    // Handle Change Profile
    const handleProfile = () => {
        dispatch(changeUpdateProfile());
        window.location.href = '/profile';
    }

    const cancelUpdate = () => {
        dispatch(changeUpdateProfile());

        if (screensize <= 1024) {
            dispatch(changeMobileMenu(false));
        } else {
            dispatch(changeMobileMenu(true));
        }
    }

    return (
        <div>
            {
                updateProfile && (
                    <div
                        className='fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-noti z-40'
                    >
                        <div className='w-[500px] bg-white mx-2 sm:px-12 xsm:py-10 xsm:px-4 py-12 relative shadow rounded-xl gap-y-2'>
                            <AiOutlineClose onClick={cancelUpdate} className="absolute right-0 p-2 top-0 text-black z-50 cursor-pointer text-[40px]" />
                            <div className='flex flex-row space-x-4'>
                                <div className='w-2/12 bg-[#F5F5F5] rounded-xl sm:contents xsm:hidden'>
                                    <AiOutlineCheckCircle className='w-8 h-8 sm:mt-2 xsm:mt-4 m-auto text-[#4F4F4F]' />
                                </div>
                                <div className='w-10/12'>
                                    <h3 className='sm:text-[20px] xsm:text-[13px] font-bold text-[#54595E]'>{con}</h3>
                                    <h4 className='text-[#54595E99] sm:text-[14px] xsm:text-[12px]'>{sub}</h4>
                                </div>
                            </div>

                            <div className='flex flex-row sm:gap-x-6 xsm:gap-x-2'>
                                <button
                                    onClick={handleProfile}
                                    className='bg-[#04A7EA] w-full text-white sm:px-20 xsm:px-12 py-2 rounded-lg mt-4 transition hover:bg-white hover:font-bold hover:border-2 hover:border-[#D9001B] hover:text-[#D9001B]'
                                >ok</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdateModal;