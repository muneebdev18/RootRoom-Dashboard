import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";

import { selectActiveModal, changeActiveModal } from '../../features/modal';
import { changeMobileMenu } from '../../features/menubar';
import { selectScreenSize } from '../../features/screenSize';

const MultiModal = ({ con, sub, suc }) => {
    const [multiModal, setMultiModal] = useState(false);
    const activeModal = useSelector(selectActiveModal);
    const screensize = useSelector(selectScreenSize);
    const dispatch = useDispatch();

    const CloseSucsess = () => {
        setMultiModal(false);
        dispatch(changeActiveModal());

        if (screensize <= 1024) {
            dispatch(changeMobileMenu(false));
        } else {
            dispatch(changeMobileMenu(true));
        }
    }

    // close user Modal
    const closeUserModal = () => {
        dispatch(changeActiveModal());

        if (screensize <= 1024) {
            dispatch(changeMobileMenu(false));
        } else {
            dispatch(changeMobileMenu(true));
        }
    }

    return (
        <div>
            {
                activeModal && (
                    <div className='fixed flex justify-center items-center inset-0 bg-noti z-40'>
                        <div className='flex flex-col bg-white sm:py-12 sm:px-12 xsm:py-10 xsm:px-4 py-12 relative shadow rounded-xl gap-y-2'>
                            <AiOutlineClose onClick={closeUserModal} className="absolute right-0 p-2 top-0 text-black z-50 cursor-pointer text-[40px]" />
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
                                    onClick={() => setMultiModal(true)}
                                    className='bg-[#D9001B] text-white sm:px-20 xsm:px-12 py-2 rounded-lg mt-4 transition hover:bg-white hover:font-bold hover:border-2 hover:border-[#D9001B] hover:text-[#D9001B]'
                                >Yes</button>
                                <button
                                    onClick={closeUserModal}
                                    className='text-[#4F4F4F] bg-white border-2 border-[#4F4F4F] text-hoverbg sm:px-20 xsm:px-12 py-2 rounded-lg mt-4 transition hover:bg-[#4F4F4F] hover:text-white hover:font-bold'
                                >No</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                multiModal && (
                    <div className='fixed flex justify-center items-center inset-0 w-screen h-screen bg-noti z-40'>
                        <div className='flex flex-col bg-white mx-2 sm:p-12 xsm:p-8 relative shadow rounded-xl gap-y-2'>
                            <AiOutlineClose onClick={() => setMultiModal(!multiModal)} className="absolute right-0 p-2 top-0 text-black z-50 cursor-pointer text-[40px]" />
                            <h3 className='sm:text-[20px] xsm:text-[16px] font-bold text-[#54595E]'>{suc}</h3>
                            <h4 className='text-[#54595E99] text-[14px]'>{sub}</h4>
                            <button
                                onClick={CloseSucsess}
                                className='text-base bg-[#D9001B] text-white px-2 py-2 rounded-lg mt-4 transition hover:border-2 hover:border-[#D9001B] hover:bg-white hover:text-[#D9001B] hover:font-bold'
                            >Continue</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default memo(MultiModal);