import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdRemoveRedEye } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";

import { selectScreenSize } from '../../features/screenSize';
import { selectUpdateProfile, changeUpdateProfile } from '../../features/modal'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import UpdateModal from '../../components/modal/UpdateModal';

import PlayerAvatar from '../../assets/images/playerAvatar.png';
import Cover from '../../assets/images/cover.png';
import './style.css';

const ChangePassword = () => {
    // For password eye button
    const [values, setValues] = useState({
        currPassword: "",
        showCurrPassword: true,
        newPassword: "",
        showNewPassword: true,
        confirmPassword: "",
        showConfPassword: true
    });

    const updateProfile = useSelector(selectUpdateProfile);
    const screensize = useSelector(selectScreenSize);
    const dispatch = useDispatch();

    // Current password
    const handleClickCurrPassword = () => {
        setValues({ ...values, showCurrPassword: !values.showCurrPassword });
    }

    // new password
    const handleClickNewPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword });
    }

    // confirm password
    const handleConfirmPassword = () => {
        setValues({ ...values, showConfPassword: !values.showConfPassword });
    }

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    return (
        <div className='profile-div'>
            {
                updateProfile && <UpdateModal con='Password has been updated' sub='Are you sure you want to accept this?' />
            }
            <Sidebar />
            <Header heading="Edit Profile" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='py-10 xl:m-8 sm:m-8 xsm:m-0 rounded-[11px]'>
                    <div className={`2xl:pl-8 lg:pl-8 md:pl-0 xsm:pl-0 ${screensize < 641 && 'mx-2'}`}>
                        <img src={Cover} alt='Cover' className='w-full h-48 rounded-t-3xl object-cover' />
                        <div className='flex 2xl:flex-row sm:flex-row xsm:flex-col relative bg-[#070029] w-full 2xl:h-28 sm:h-28 xsm:h-24 2xl:justify-between sm:justify-between xsm:justify-center'>
                            <div className='relative 2xl:bottom-16 sm:bottom-16 xsm:bottom-4 2xl:left-8 sm:left-8 xsm:left-0 2xl:mx-0 sm:mx-0 xsm:mx-auto'>
                                <img src={PlayerAvatar} alt='Player Avatar' className='sm:w-36 xsm:w-28 sm:h-36 xsm:h-28 object-cover rounded-[50%]' />
                            </div>
                        </div>
                    </div>
                    <div className='xl:pl-12 lg:pl-12 xsm:pl-6 py-4 bg-white'>
                        {/* Current Password */}
                        <div className="pb-[15px]">
                            <label className='opacity-60'>Current Password*</label>
                            <label htmlFor="copy-button" className='label-input'>
                                <input
                                    name="copy-button" aria-label="copy-button" className='input-tag'
                                    type={values.showCurrPassword ? "password" : "text"}
                                    onChange={handlePasswordChange("password")}
                                />
                                <div onClick={handleClickCurrPassword}>
                                    {
                                        values.showCurrPassword ? (
                                            <MdRemoveRedEye id='icon' color='#667085' cursor='pointer' />
                                        ) : (
                                            <AiFillEyeInvisible id='icon' color='#667085' cursor='pointer' />
                                        )

                                    }
                                </div>
                            </label>
                        </div>
                        {/* New Password */}
                        <div className="pb-[15px]">
                            <label className='opacity-60'>New Password*</label>
                            <label htmlFor="copy-button" className='label-input'>
                                <input
                                    name="copy-button" aria-label="copy-button" className='input-tag'
                                    type={values.showNewPassword ? "password" : "text"}
                                    onChange={handlePasswordChange("password")}
                                />
                                <div onClick={handleClickNewPassword}>
                                    {
                                        values.showNewPassword ? (
                                            <MdRemoveRedEye id='icon' color='#667085' cursor='pointer' />
                                        ) : (
                                            <AiFillEyeInvisible id='icon' color='#667085' cursor='pointer' />
                                        )

                                    }
                                </div>
                            </label>
                        </div>
                        {/* Confirm Password */}
                        <div className="pb-[15px]">
                            <label className='opacity-60'>Confirm Password*</label>
                            <label htmlFor="copy-button" className='label-input'>
                                <input
                                    name="copy-button" aria-label="copy-button" className='input-tag'
                                    type={values.showConfPassword ? "password" : "text"}
                                    onChange={handlePasswordChange("password")}
                                />
                                <div onClick={handleConfirmPassword}>
                                    {
                                        values.showConfPassword ? (
                                            <MdRemoveRedEye id='icon' color='#667085' cursor='pointer' />
                                        ) : (
                                            <AiFillEyeInvisible id='icon' color='#667085' cursor='pointer' />
                                        )

                                    }
                                </div>
                            </label>
                        </div>
                        <div className='flex sm:flex-row xsm:flex-col sm:mr-0 xsm:mr-6'>
                            <div className={`${screensize < 641 && 'w-full'} py-8 2xl:mx-0 sm:mx-0 xsm:mx-auto`}>
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

export default ChangePassword;