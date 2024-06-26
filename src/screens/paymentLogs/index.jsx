import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Pagination from '../../components/Pagination';
import paymentData from '../../utils/paymentLogs';

import './style.css';

const PaymentLogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const Currentdata = paymentData.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='pay-div'>
            <Sidebar />
            <Header heading="Payment Logs" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='animate-div'>
                    <div className='py-10 md:m-8 sm:m-4 xsm:m-2 rounded-[11px]'>
                        <div className='flex justify-between items-center flex-col-reverse md:flex-row gap-3 bg-[#FBF7F4] p-8'>
                            <div className='flex sm:flex-row xsm:flex-col whitespace-nowrap items-center gap-6 sm:mr-10 xsm:mr-0'>
                                <div className='flex flex-row'>
                                    <div className='border border-solid border-[#E0E7ED] bg-[#FBF7F4] rounded-md p-2'>
                                        <MdKeyboardArrowLeft color='#666E7D' size={30} />
                                    </div>
                                    <input type="date" className='bg-[#FBF7F4] rounded-lg p-2' />
                                    <div className='border border-solid border-[#E0E7ED] bg-[#FBF7F4] rounded-md p-2'>
                                        <MdKeyboardArrowRight color='#666E7D' size={30} />
                                    </div>
                                </div>
                                <div>
                                    <select
                                        defaultValue='default'
                                        className="w-32 text-center bg-[#FBF7F4] px-[8px] py-[11px] ml-2 cursor-pointer rounded-lg"
                                    >
                                        <option value="default" disabled hidden>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="nonActive">nonActive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='overflow-x-scroll lg:overflow-auto'>
                            <table className='w-full mt-10'>
                                <thead>
                                    <tr className='w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500'>
                                        <th scope="col" className="text-start text-base px-6">
                                            <div className="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            #
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            NAME
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            SUBSCRIPTION PLAN
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            PURCHASED DATE
                                        </th>
                                        <th className='text-start text-[#464F60] px-6'>
                                            EXPIRY DATE
                                        </th>
                                        <th className='text-center text-[#464F60]'>
                                            AMOUNT PAID
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        Currentdata.map((item) => {

                                            return (
                                                <tr className='border-b-2 h-20 cursor-pointer font-semibold text-[#292D32]' key={item.id}>
                                                    <td className='text-start text-sm px-6'>
                                                        <div className="flex items-center">
                                                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4" />
                                                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td className='text-start text-sm px-6'>{item.id}</td>
                                                    <td className='text-start text-sm px-6'>
                                                        <p>{item.Name}</p>
                                                        <p className='text-[#687182]'>{item.phone}</p>
                                                    </td>
                                                    <td className='text-start text-sm px-6'>{item.plan}</td>
                                                    <td className='text-start text-sm px-6'>{item.purchasedDate}</td>
                                                    <td className='text-start text-sm px-6'>{item.expiryDate}</td>
                                                    <td className=' text-sm text-center'>{item.amountPaid}</td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-10 flex justify-between items-center flex-col gap-3 md:flex-row text-[11px]'>
                            <p className='pl-4 text-[#687182] text-[14px]'>{firstPostIndex + 1}-{lastPostIndex} of {paymentData.length}</p>

                            <div className='flex sm:flex-row xsm:flex-col space-x-4'>
                                <div className='flex flex-row text-[11px]'>
                                    <span className='pt-3 text-[#687182] text-[14px]'>Rows per page:</span>
                                    <select
                                        value={postPerPage}
                                        onChange={e => setPostPerPage(e.target.value)}
                                        className="w-20 text-center bg-[#FBF7F4] px-[8px] py-[11px] ml-2 cursor-pointer rounded-lg"
                                    >
                                        <option value="10">10</option>
                                        <option value="5">5</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="25">25</option>
                                    </select>
                                </div>
                                <Pagination
                                    totalPost={paymentData.length}
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

export default PaymentLogs;