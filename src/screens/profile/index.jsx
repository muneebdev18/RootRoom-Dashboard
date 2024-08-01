import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { selectScreenSize } from '../../features/screenSize';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import { IoMdCamera } from "react-icons/io";

import './style.css';
import useSWR from 'swr';
import { BASE_URL } from '../../app/constants';

const Profile = () => {
    const screensize = useSelector(selectScreenSize);
    // Data from LocalStorage
    const adminData = JSON.parse(localStorage.getItem("admin_user"));
    const token = adminData?.token;

    // ---- GET Profile Api --------------------------------
    const fetcherWithToken = async (url, ...args) => {
        const response = await fetch(url, {
            ...args,
            headers: {
                ...args.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    };
    const { data, isLoading, error } = useSWR([`${BASE_URL}admin/getLoggedInAdmin`], fetcherWithToken);
    return (
        <div className='profile-div'>
            <Sidebar />
            <Header heading="My Profile" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='py-10 xl:m-8 sm:m-8 xsm:m-0 rounded-[11px]'>
                    <div className={`2xl:pl-8 lg:pl-8 md:pl-0 xsm:pl-0 ${screensize < 641 && 'mx-2'}`}>
                        <div className='w-full bg-[#070029] h-48 rounded-t-3xl object-cover' ></div>
                        <div className='flex 2xl:flex-row sm:flex-row xsm:flex-col relative bg-[#070029] w-full 2xl:h-28 sm:h-28 xsm:h-48 sm:justify-between xsm:justify-center'>
                            <div className='relative sm:bottom-16 xsm:bottom-8 sm:left-8 xsm:left-0 sm:mx-0 xsm:mx-auto'>
                                {isLoading ? (
                                    <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">

                                        <div class="flex items-center justify-center w-36 rounded-[50%] h-36 bg-gray-300  dark:bg-gray-700">
                                            <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='relative'>
                                        <img src={data?.data?.profile} alt='Admin' className='sm:w-36 xsm:w-28 sm:h-36 xsm:h-28 object-cover rounded-[50%]' />
                                    </div>
                                )}

                            </div>
                            <div className='flex flex-row  items-center'>
                                <Link to='/profile/editprofile' className='sm:m-0 xsm:m-auto'>
                                    <div className=' '>
                                        <button className='flex flex-row w-32 bg-white text-[#070029] p-4 rounded-lg text-[20px]'>
                                            <FaRegEdit size={20} className='mr-2 mt-1' /> Edit
                                        </button>
                                    </div>
                                </Link>
                                <Link to='/profile/changepassword'>
                                    <div className={`${screensize < 641 && 'w-full'} w-full px-4 2xl:mx-0 sm:mx-0 xsm:mx-auto`}>
                                        <button className='flex flex-row items-center justify-center sm:w-60 xsm:w-full bg-white text-[#070029] p-4 rounded-lg text-[20px] border-[1px] border-[#04A7EA]'>
                                            <FaRegEdit className='text-[20px] mr-2 mt-1' /> Change Password
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='xl:p-12 lg:p-12 xsm:p-2 bg-white'>
                        {/* Name */}
                        <div className="pb-[35px] pl-6">
                            <label className='opacity-60'> Name</label>
                            <label className='flex pt-6'>
                                <input
                                    name="copy-button" defaultValue={data?.data?.fullname} disabled={true}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]'
                                />

                            </label>
                        </div>
                       
                        {/* Email */}
                        <div className="text-black">
                            <label className='opacity-60 pl-6'>Email Address</label>
                            <label className='flex pt-6'>
                                <AiOutlineMail color='#BABABA' size={24} className='relative -right-[45px] top-[12px]' />
                                <input
                                    name="copy-button" 
                                    defaultValue={data?.data?.email} 
                                    disabled={true}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] pl-20 p-[16px] pr-[40px] text-[16px] mr-4 border border-solid border-[#D0D5DD]'
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;