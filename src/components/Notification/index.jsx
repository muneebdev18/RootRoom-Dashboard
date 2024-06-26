import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown, MdCheckCircleOutline } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { selectNotiModal, changeNotiModal } from '../../features/modal';
import { selectScreenSize } from '../../features/screenSize';
import notiData from '../../utils/notificationData';

const Notification = () => {
    const [showAll, setShowAll] = useState(false);
    const showNoti = useSelector(selectNotiModal);
    const screensize = useSelector(selectScreenSize);
    const dispatch = useDispatch();

    // Render only the first 3 items from the Notification array
    const notifLimit = notiData.slice(0, 4);

    useEffect(() => {
        if (screensize < 1024) {
            dispatch(changeNotiModal());
        }
    }, [dispatch, screensize]);

    return (
        <>
            {
                showNoti && screensize > 1024 && (
                    <div className='fixed flex top-0 left-0 w-screen h-screen bg-noti'>
                        <AiOutlineCloseCircle
                            size={48}
                            color='#04A7EA'
                            onClick={() => dispatch(changeNotiModal())}
                            className="absolute right-[250px] top-[50px] z-10 cursor-pointer"
                        />
                        <div className='absolute right-[60px] top-[75px] w-[440px] bg-white shadow rounded-xl scroll-smooth overflow-y-scroll'>
                            <div className='flex flex-row px-4 py-6 justify-between'>
                                <h1 className='flex flex-row text-[14px]'>
                                    <span className='text-[#4C4C66] font-medium text-[14px]'>NOTIFICATIONS</span>
                                    <span className='flex flex-row pl-2 text-[#9EA0AA] cursor-pointer' onClick={() => setShowAll(!showAll)}>
                                        <span>All</span>
                                        <span><MdKeyboardArrowDown size={24} /></span>
                                    </span>
                                    <div className='absolute'>
                                        {
                                            showAll && (
                                                <div className='relative top-6 left-20 w-[64px] h-[68px] bg-[#515669] text-[12px] text-white rounded-md p-2 z-10'>
                                                    <p><Link>All</Link></p>
                                                    <p><Link>Unread</Link></p>
                                                    <p><Link>Unseen</Link></p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </h1>
                                <p className='flex flex-row text-[#4C4C66] cursor-pointer'>
                                    Mark all as read <MdCheckCircleOutline size={20} className='pt-[3px]' />
                                </p>
                            </div>
                            <div className='text-md px-4'>
                                {
                                    notifLimit && notifLimit.map((data, index) => {
                                        return (
                                            <div key={index} className='text-[#6F6C99] border-b-[1px]'>
                                                <div className='flex flex-row py-2'>
                                                    <div className='w-2/12'>
                                                        <img src={data.pic} alt="Profile" width='60px' className='rounded-[50%]' />
                                                    </div>
                                                    <div className='w-10/12 px-2'>
                                                        <p className='font-bold'>{data.user}</p>
                                                        <p>{data.message}</p>
                                                        <p className='flex flex-row text-[#A5ACB8]'>{data.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='py-8 text-center text-[#3279CC]' onClick={() => dispatch(changeNotiModal())}>
                                    <Link to='/notif'>See All</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Notification;