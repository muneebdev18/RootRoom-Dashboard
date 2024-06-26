import React from 'react';
import { BsFillTrash3Fill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { MdCheckCircleOutline } from "react-icons/md";

import { selectScreenSize } from '../../features/screenSize';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import notiData from '../../utils/notificationData';

import './style.css';

const Notification = () => {
    const screensize = useSelector(selectScreenSize);

    return (
        <div className='notif-div'>
            <Sidebar />
            <Header heading="Dashboard" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-280px)] md:w-full sm:w-full xsm:w-full float-right pt-4'>
                <div className={`${screensize < 1025 && 'pl-4'} ${screensize < 1060 && 'pt-4'}`}>
                    <div className="flex flex-row justify-between pt-8 pb-8">
                        <div>
                            <p className={`text-[#202020] font-normal text-[28px] ${screensize < 361 && 'text-[19px]'}`}>Notifications</p>
                            <p className={`text-[16px] text-[#898989] ${screensize < 361 && 'text-[11px]'}`}>You've got 6 recommendations to solve</p>
                        </div>
                        {
                            screensize > 520 ? (
                                <div className={`bg-[#EAF8FD] mr-4 w-48`}>
                                    <p className='text-[16px] text-[#04A7EA] font-normal p-4'>Mark all as completed</p>
                                </div>
                            ) : (
                                <MdCheckCircleOutline color='#898989' className={`w-16 h-16 pt-4 pr-2 ${screensize < 361 && 'pt-2 w-8 h-9'}`} />
                            )
                        }
                    </div>
                    <p className='text-[20px] font-normal pb-4 text-[#898989]'>Today</p>
                    <div className='text-md'>
                        {
                            notiData && notiData.map((data, index) => {
                                return (
                                    <div key={index} className='text-[#6F6C99]'>
                                        <div className='flex flex-row pt-2 pb-6 mr-4 bg-white mb-8 space-y-2 border-2 border-[#EAEAEA]'>
                                            <div className='2xl:w-1/12 sm:w-1/12 xsm:w-2/12'>
                                                <img src={data.pic} alt="Profile" width='90px' className='rounded-[50%] sm:pl-4 xsm:pl-2 pt-4' />
                                            </div>
                                            <div className={`2xl:w-10/12 sm:w-10/12 xsm:w-8/12 px-2 ${screensize < 361 && 'text-[11px]'}`}>
                                                <p className='font-bold'>{data.user}</p>
                                                <p>{data.message}</p>
                                                <div className='flex flex-row text-[#A5ACB8]'>{data.date}</div>
                                            </div>
                                            <div className='2xl:w-1/12 sm:w-1/12 xsm:w-2/12 pt-8 pl-4'>
                                                <BsFillTrash3Fill color='#898989' size={24} className={` ${screensize < 361 && 'w-4 h-4'}`} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <p className='text-[20px] font-normal pb-4 text-[#898989]'>Yesterday</p>
                    <div className='text-md'>
                        {
                            notiData && notiData.map((data, index) => {
                                return (
                                    <div key={index} className='text-[#6F6C99]'>
                                        <div className='flex flex-row pt-2 pb-6 mr-4 bg-white mb-8 space-y-2 border-2 border-[#EAEAEA]'>
                                            <div className='2xl:w-1/12 sm:w-1/12 xsm:w-2/12'>
                                                <img src={data.pic} alt="Profile" width='90px' className='rounded-[50%] sm:pl-4 xsm:pl-2 pt-4' />
                                            </div>
                                            <div className={`2xl:w-10/12 sm:w-10/12 xsm:w-8/12 px-2 ${screensize < 361 && 'text-[11px]'}`}>
                                                <p className='font-bold'>{data.user}</p>
                                                <p>{data.message}</p>
                                                <div className='flex flex-row text-[#A5ACB8]'>{data.date}</div>
                                            </div>
                                            <div className='2xl:w-1/12 sm:w-1/12 xsm:w-2/12 pt-8 pl-4'>
                                                <BsFillTrash3Fill color='#898989' size={24} className={`${screensize < 361 && 'w-4 h-4'}`} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification;