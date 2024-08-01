import React, { useEffect, useState } from 'react';
import { ViewButton } from '../../components/tableButtons/index'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Pagination from '../../components/Pagination';
import feedbackData from '../../utils/feedbackData';

import './style.css';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { BASE_URL } from '../../app/constants';
import Loader from '../../components/loader';

const GroupManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const Currentdata = feedbackData.slice(firstPostIndex, lastPostIndex);
    //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const adminData = JSON.parse(localStorage.getItem("admin_user"));
    const token = adminData?.token;
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
    const { data, isLoading, error, mutate } = useSWR(
        [`${BASE_URL}admin/getAllGroupList`],
        fetcherWithToken
    );
    const groupData = data?.data

    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "350px"
    };
    //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div className='feedback-div'>
            <Sidebar />
            <Header heading="GROUP MANAGEMENT" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] bg-[#F9F9F9] md:w-full xsm:w-full float-right'>
                <div className='animate-div'>
                    <div className='ml-[60px] m-8 rounded-[22px] '>
                        <div className='flex justify-between items-center flex-col-reverse md:flex-row gap-3 bg-[#FBF7F4] '>

                        </div>
                        <div className='overflow-x-scroll lg:overflow-auto'>
                            <table className='w-full mt-10'>
                                <thead>
                                    <tr className='w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500'>

                                        <th className='text-start text-[#464F60] px-6'>
                                            #
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            TITLE
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            CREATED BY
                                        </th>
                                        <th className='text-center text-[#464F60] px-6'>
                                            NO OF MEMBERS
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            TYPES
                                        </th>
                                        <th className='text-center text-[#464F60] px-6'>
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        groupData?.length > 0 ? groupData?.map((item, index) => {

                                            return (
                                                <tr className='border-b-2 h-20 cursor-pointer font-semibold text-[#292D32]' key={item._id}>

                                                    <td className='text-start text-sm px-6'>{index + 1}</td>
                                                    <td className='text-start text-sm px-6'>
                                                        <p>{item?.groupName}</p>
                                                        {/* <p className='text-[#687182]'>{item.phone}</p> */}
                                                    </td>
                                                    <td className='text-start text-sm px-6'>
                                                        {item?.userId?.fullname}
                                                    </td>
                                                    <td className='text-center text-sm px-6'>{item?.members?.length}</td>
                                                    <td className='text-start text-sm px-6'>{item?.privacy}</td>
                                                    <td className='text-start text-sm px-6'>
                                                        <div className='group text-center text-sm'>
                                                            <Link to={`/groupmanagement/groupdetails/${item?._id}`}>
                                                                <ViewButton />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }) : ''

                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            isLoading ? (
                                <Loader loaderStyle={loaderStyle} />
                            ) : groupData?.length > 0 ?
                                (
                                    <div className='mt-10 flex justify-between items-center flex-col gap-3 md:flex-row text-[11px]'>
                                        <p className='pl-4 text-[#687182] text-[14px]'>{firstPostIndex + 1}-{lastPostIndex} of {feedbackData.length}</p>

                                        <div className='flex sm:flex-row xsm:flex-col space-x-4'>
                                            <Pagination
                                                totalPost={feedbackData.length}
                                                postPerPage={postPerPage}
                                                setCurrentPage={setCurrentPage}
                                                currentPage={currentPage}
                                            />
                                        </div>
                                    </div>
                                ) : ''
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupManagement;