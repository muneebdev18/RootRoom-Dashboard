import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectScreenSize } from '../../features/screenSize';
import { selectNotiModal, selectUpdateProfile } from '../../features/modal'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import UpdateModal from '../../components/modal/UpdateModal';
import './style.css';
import { IoMdCamera } from "react-icons/io";
import useSWR from 'swr';
import { BASE_URL } from '../../app/constants';
import { clearUpdateAdmin, updateAdminApi } from '../../app/features/admin/adminSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';

const EditProfile = () => {

   
    const navigate = useNavigate()
    const showNoti = useSelector(selectNotiModal);
    const updateProfile = useSelector(selectUpdateProfile);
    const screensize = useSelector(selectScreenSize);
    const dispatch = useDispatch();
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
    const {message,success,isLoading:loading} = useSelector((value)=>value.Admin)
    const [values, setValues] = useState({
        fullname: "" || data?.data?.fullname,
        file:""
    })
    const updateAdminHandler = () =>{
        dispatch(updateAdminApi(values))
    }
    useEffect(()=>{
        if(success){
            toast.success(message,{
                position:"top-right"
            })
            dispatch(clearUpdateAdmin())
            // navigate("/profile")
            setTimeout(()=>{
            window.location.href= "/profile"

            },1000)
        }
        else if(success === null){
            return ;
        }
        else {
            toast.error(message,{
                position:"top-right"
            })
            dispatch(clearUpdateAdmin())
        }
    },[success,message])
    
   
    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    }
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
                        <div className='w-full  bg-[#070029]  h-48 rounded-t-3xl object-cover' ></div>
                        <div className='flex 2xl:flex-row sm:flex-row xsm:flex-col relative bg-[#070029] w-full 2xl:h-28 sm:h-28 xsm:h-24 2xl:justify-between sm:justify-between xsm:justify-center'>
                            <div className='relative sm:bottom-16 xsm:bottom-12 sm:left-8 xsm:left-0 sm:mx-0 xsm:mx-auto'>
                                {
                                    isLoading ? (
                                        <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">

                                            <div class="flex items-center justify-center w-36 rounded-[50%] h-36 bg-gray-300  dark:bg-gray-700">
                                                <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='relative'>
                                            
                                            <img src={values?.file ? URL.createObjectURL(values?.file) : data?.data?.profile} alt='Admin' className='sm:w-36 xsm:w-28 sm:h-36 xsm:h-28 object-cover rounded-[50%]' />
                                            <label className={"absolute sm:right-[30px] xsm:right-[24px] sm:top-[123px] xsm:top-[97px]"}>
                                                <input type="file" hidden onChange={(e)=>setValues({...values,file:e.target.files[0]})} />
                                                <IoMdCamera style={{ cursor: "pointer" }} color='white' size={22} />
                                            </label>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='xl:p-12 lg:p-12 xsm:p-2 bg-white'>

                        {/* Name */}
                        <div className="pb-[35px]">
                            <label className='opacity-60 pl-6'>First Name</label>
                            <label className='flex pt-6 pl-6'>
                                <input
                                    name="copy-button"
                                    value={values?.fullname}
                                    onChange={(e)=>setValues({...values,fullname:e.target.value})}
                                    // placeholder={(isLoading === false || (values?.name || values.name.length === 0)) ? "Enter Name" : ""}
                                    defaultValue={data?.data?.fullname}
                                    className='sm:w-[900px] xsm:w-full h-[50px] rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]'
                                />
                            </label>
                        </div>
                        <div className='flex sm:flex-row xsm:flex-col'>
                            <div className={`${screensize < 641 && 'w-full'} px-4 py-8 2xl:mx-0 sm:mx-0 xsm:mx-auto`}>
                                <button
                                 onClick={updateAdminHandler}
                                    className='flex h-[64px]  flex-row items-center justify-center sm:w-60 xsm:w-full bg-[#070029] text-white p-4 rounded-lg text-[20px]'
                                >{loading ? <Loader loaderStyle={loaderStyle}/> :"Update"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;