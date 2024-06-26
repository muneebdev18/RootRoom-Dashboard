import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMail } from "react-icons/ai";

import { selectScreenSize } from '../../features/screenSize';
import { selectNotiModal, selectUpdateProfile, changeUpdateProfile } from '../../features/modal'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import UpdateModal from '../../components/modal/UpdateModal';

import PlayerAvatar from '../../assets/images/playerAvatar.png';
import Cover from '../../assets/images/cover.png';
import './style.css';

const EditProfile = () => {
    const [firstName, setFirstName] = useState('Alexa');
    const [lastName, setlastName] = useState('Alexa');
    const [email, setEmail] = useState('abc@gmail.com');

    const showNoti = useSelector(selectNotiModal);
    const updateProfile = useSelector(selectUpdateProfile);
    const screensize = useSelector(selectScreenSize);
    const dispatch = useDispatch();

    return (
        <div className='profile-div'>
            {
                updateProfile && <UpdateModal con='Profile has been updated' sub='Are you sure you want to accept this?' />
            }
            <Sidebar />
            <Header heading="Edit Profile" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='py-10 xl:m-8 sm:m-8 xsm:m-0 rounded-[11px]'>
                    <div className={`2xl:pl-8 lg:pl-8 md:pl-0 xsm:pl-0 ${screensize < 641 && 'mx-2'}`}>
                        <img src={Cover} alt='Cover' className='w-full h-48 rounded-t-3xl object-cover' />
                        <div className='flex 2xl:flex-row sm:flex-row xsm:flex-col relative bg-[#070029] w-full 2xl:h-28 sm:h-28 xsm:h-24 2xl:justify-between sm:justify-between xsm:justify-center'>
                            <div className='relative sm:bottom-16 xsm:bottom-12 sm:left-8 xsm:left-0 sm:mx-0 xsm:mx-auto'>
                                <img src={PlayerAvatar} alt='Player Avatar' className='sm:w-36 xsm:w-28 sm:h-36 xsm:h-28 object-cover rounded-[50%]' />
                            </div>
                        </div>
                    </div>
                    <div className='xl:p-12 lg:p-12 xsm:p-2 bg-white'>
                        {/* Name */}
                        <div className="pb-[35px]">
                            <label className='opacity-60 pl-6'>First Name</label>
                            <label className='flex pt-6 pl-6'>
                                <input
                                    name="copy-button" placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]'
                                />
                            </label>
                        </div>
                        {/* Name */}
                        <div className="pb-[35px]">
                            <label className='opacity-60 pl-6'>First Name</label>
                            <label className='flex pt-6 pl-6'>
                                <input
                                    name="copy-button" placeholder='Enter Last Name' value={lastName} onChange={(e) => setlastName(e.target.value)}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]'
                                />
                            </label>
                        </div>
                        {/* Email */}
                        <div className="text-black">
                            <label className='opacity-60 pl-6'>Email Address</label>
                            <label className='flex pt-6'>
                                <AiOutlineMail color='#BABABA' size={24} className={`${showNoti ? '' : 'relative'} -right-[45px] top-[12px]`} />
                                <input
                                    name="copy-button" placeholder='Enter Email Address' value={email} onChange={(e) => setEmail(e.target.value)}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] pl-20 p-[16px] pr-[40px] text-[16px] mr-4 border border-solid border-[#D0D5DD]'
                                />
                            </label>
                        </div>
                        <div className='flex sm:flex-row xsm:flex-col'>
                            <div className={`${screensize < 641 && 'w-full'} px-4 py-8 2xl:mx-0 sm:mx-0 xsm:mx-auto`}>
                                <button
                                    onClick={() => dispatch(changeUpdateProfile())}
                                    className='flex flex-row items-center justify-center sm:w-60 xsm:w-full bg-[#070029] text-white p-4 rounded-lg text-[20px]'
                                >Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;