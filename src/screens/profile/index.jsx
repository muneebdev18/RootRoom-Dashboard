import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

import { selectScreenSize } from '../../features/screenSize';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

import PlayerAvatar from '../../assets/images/playerAvatar.png';
import Cover from '../../assets/images/cover.png';
import './style.css';

const Profile = () => {
    const screensize = useSelector(selectScreenSize);

    return (
        <div className='profile-div'>
            <Sidebar />
            <Header heading="My Profile" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='py-10 xl:m-8 sm:m-8 xsm:m-0 rounded-[11px]'>
                    <div className={`2xl:pl-8 lg:pl-8 md:pl-0 xsm:pl-0 ${screensize < 641 && 'mx-2'}`}>
                        <img src={Cover} alt='Cover' className='w-full h-48 rounded-t-3xl object-cover' />
                        <div className='flex 2xl:flex-row sm:flex-row xsm:flex-col relative bg-[#070029] w-full 2xl:h-28 sm:h-28 xsm:h-48 sm:justify-between xsm:justify-center'>
                            <div className='relative sm:bottom-16 xsm:bottom-8 sm:left-8 xsm:left-0 sm:mx-0 xsm:mx-auto'>
                                <img src={PlayerAvatar} alt='Player Avatar' className='sm:w-36 xsm:w-28 sm:h-36 xsm:h-28 object-cover rounded-[50%]' />
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
                            <label className='opacity-60'>First Name</label>
                            <label className='flex pt-6'>
                                <input
                                    name="copy-button" defaultValue='Alexa' disabled={true}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]'
                                />
                            </label>
                        </div>
                        {/* Name */}
                        <div className="pb-[35px] pl-6">
                            <label className='opacity-60'>Last Name</label>
                            <label className='flex pt-6'>
                                <input
                                    name="copy-button" defaultValue='Andriana' disabled={true}
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
                                    name="copy-button" defaultValue='abc@gmail.com' disabled={true}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] pl-20 p-[16px] pr-[40px] text-[16px] mr-4 border border-solid border-[#D0D5DD]'
                                />
                            </label>
                        </div>
                        {/* <div className='flex sm:flex-row xsm:flex-col py-4 sm:space-y-0 xsm:space-y-4'>
                            <Link to='/profile/editprofile'>
                                <div className={`${screensize < 641 && 'w-full'} px-4 2xl:mx-0 sm:mx-0 xsm:mx-auto`}>
                                    <button className='flex flex-row items-center justify-center sm:w-60 xsm:w-full bg-[#04A7EA] text-white p-4 rounded-lg text-[20px]'>
                                        Edit
                                    </button>
                                </div>
                            </Link>
                            <Link to='/profile/changepassword'>
                                <div className={`${screensize < 641 && 'w-full'} w-full px-4 2xl:mx-0 sm:mx-0 xsm:mx-auto`}>
                                    <button className='flex flex-row items-center justify-center sm:w-60 xsm:w-full bg-white text-[#04A7EA] p-4 rounded-lg text-[20px] border-[1px] border-[#04A7EA]'>
                                        <FaRegEdit className='text-[20px] mr-2 mt-1' /> Change Password
                                    </button>
                                </div>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;