import React, { useEffect, useState } from 'react';
import { ViewButton } from '../../components/tableButtons/index'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Pagination from '../../components/Pagination';
import feedbackData from '../../utils/feedbackData';

import './style.css';
import { Link } from 'react-router-dom';

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
    return (
        <div className='feedback-div'>
            <Sidebar />
            <Header heading="Group Management" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='animate-div'>
                    <div className='py-10 md:m-8 sm:m-4 xsm:m-2 rounded-[11px]'>
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
                                            GROUP NAME
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            CREATED BY
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            TOTAL MEMBERS
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            STATUS
                                        </th>
                                        <th className='text-center text-[#464F60] px-6'>
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        Currentdata.map((item) => {

                                            return (
                                                <tr className='border-b-2 h-20 cursor-pointer font-semibold text-[#292D32]' key={item.id}>

                                                    <td className='text-start text-sm px-6'>{item.id}</td>
                                                    <td className='text-start text-sm px-6'>
                                                        <p>{item.Name}</p>
                                                        <p className='text-[#687182]'>{item.phone}</p>
                                                    </td>
                                                    <td className='text-start text-sm px-6'>
                                                    Jason Smith
                                                    </td>
                                                    <td className='text-start text-sm px-6'>{item.lastname}</td>
                                                    <td className='text-start text-sm px-6'>{item.date}</td>
                                                    <td className='text-start text-sm px-6'>
                                                        <div className='group text-center text-sm'>
                                                            <Link to={"/groupmanagement/groupdetails"}>
                                                            <ViewButton />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>
                        </div>
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupManagement;