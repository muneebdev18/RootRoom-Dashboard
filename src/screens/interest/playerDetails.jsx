/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    MdKeyboardArrowLeft, MdKeyboardArrowRight, MdMoreHoriz, MdEdit, MdRemoveRedEye,
    MdDelete, MdOutlineModeComment
} from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShare } from "react-icons/bi";

import { selectNotiModal } from '../../features/modal';
import { selectScreenSize } from '../../features/screenSize';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tabs/Tab';
import Pagination from '../../components/Pagination';
import UserData from '../../utils/userData';
import PostData from '../../utils/postData';

import PlayerAvatar from '../../assets/images/playerAvatar.png';
import Cover from '../../assets/images/cover.png';
import './style.css';

const playerDetails = () => {
    const showNoti = useSelector(selectNotiModal);
    const screensize = useSelector(selectScreenSize);

    const [toggle, setToggle] = useState(false);
    const [clickedView, setClickedView] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const Currentdata = UserData.slice(firstPostIndex, lastPostIndex);

    // Tabs
    const [active, setActive] = useState(0);
    const handleChange = newActive => setActive(newActive);

    // user Details Function
    const handleUserDetails = () => {
        setToggle(!toggle);
        window.location.href = '/playersmanagement/playerdetails';
    }

    return (
        <div>
            <Sidebar />
            <Header heading="Player Profile" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='animate-div'>
                    <div className='py-10 xl:m-8 sm:m-8 xsm:m-0 rounded-[11px]'>
                        <div className={`2xl:pl-12 lg:pl-12 md:pl-0 xsm:pl-0 ${screensize < 641 && 'mx-2'}`}>
                            <img src={Cover} alt='Cover' className='w-full h-48 rounded-t-3xl object-cover' />
                            <div className='flex 2xl:flex-row sm:flex-row xsm:flex-col relative bg-[#04A7EA] w-full 2xl:h-28 sm:h-28 xsm:h-64 2xl:justify-between sm:justify-between xsm:justify-center'>
                                <div className='relative bottom-16 2xl:left-8 sm:left-8 xsm:left-0 2xl:mx-0 sm:mx-0 xsm:mx-auto'>
                                    <img src={PlayerAvatar} alt='Player Avatar' className='w-36 h-36 object-cover rounded-[50%]' />
                                </div>
                                <div className='flex sm:flex-row xsm:flex-col px-4 py-8 sm:mx-0 xsm:mx-auto'>
                                    <select
                                        defaultValue='default'
                                        className="w-36 text-center bg-[#FAFAFA] text-[#04A7EA] px-[8px] py-[11px] cursor-pointer rounded-lg"
                                    >
                                        <option value="default" disabled hidden>Profile Status</option>
                                        <option value="Active">Approved</option>
                                        <option value="nonActive">Not Approved</option>
                                    </select>
                                    <select
                                        defaultValue='default'
                                        className={`w-36 text-center bg-[#FAFAFA] text-[#04A7EA] px-[8px] py-[11px] ${screensize > 640 ? 'ml-2' : 'mt-2'} cursor-pointer rounded-lg`}
                                    >
                                        <option value="default" disabled hidden>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="nonActive">nonActive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='xl:p-12 lg:p-12 xsm:p-2 bg-white'>
                            <div className='flex flex-row space-x-8 pb-8'>
                                <div className='flex flex-col font-bold opacity-40'>
                                    <p className='text-[16px]'>First Name:</p>
                                    <p className='text-[16px]'>Email:</p>
                                    <p className='text-[16px]'>Phone:</p>
                                    <p className='text-[16px]'>DoB</p>
                                </div>
                                <div className='flex flex-col font-bold '>
                                    <p className='text-[16px]'>Abc</p>
                                    <p className='text-[16px]'>abc@gmail.com</p>
                                    <p className='text-[16px]'>123123</p>
                                    <p className='text-[16px]'>DD/MM/YYYY</p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                {/* About Us */}
                                <div className="pb-[35px]">
                                    <label className='text-[16px] font-bold'>About Us</label>
                                    <label className='flex pt-6'>
                                        <textarea
                                            defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar'
                                            name="copy-button"
                                            disabled={true}
                                            className='w-full h-[90px] opacity-60 rounded-[4px] p-[16px] pr-[40px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD]'>
                                        </textarea>
                                    </label>
                                </div>
                                {/* Club */}
                                <div className="pb-[15px]">
                                    <label className='text-[16px] font-bold'>Clubs</label>
                                    <label className='flex 2xl:flex-row sm:flex-row xsm:flex-col pt-6'>
                                        <input
                                            name="copy-button" defaultValue='ABC Club' disabled={true}
                                            className='w-[150px] h-[50px] opacity-60 mb-4 text-center rounded-[4px] p-[16px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD] mr-4'
                                        />
                                        <input
                                            name="copy-button" defaultValue='ABC Club' disabled={true}
                                            className='w-[150px] h-[50px] opacity-60 text-center rounded-[4px] p-[16px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD] mr-4'
                                        />
                                    </label>
                                </div>
                                {/* Team */}
                                <div className="pb-[15px]">
                                    <label className='text-[16px] font-bold'>Team</label>
                                    <label className='flex pt-6'>
                                        <input
                                            name="copy-button" defaultValue='ABC Team' disabled={true}
                                            className='w-[150px] h-[50px] opacity-60 text-center rounded-[4px] p-[16px] text-[16px] mr-4 text-ellipsis border border-solid border-[#D0D5DD] mr-4 mr-4'
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='overflow-x-scroll lg:overflow-auto'>
                            <div className='flex justify-between items-center flex-col-reverse md:flex-row gap-3 bg-[#FBF7F4] px-4 py-8'>
                                <div className='flex sm:flex-row xsm:flex-col whitespace-nowrap items-center gap-6'>
                                    <div className='flex flex-row space-x-2'>
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
                                            className="w-40 text-center opacity-60 bg-[#FBF7F4] px-[8px] py-[11px] ml-2 cursor-pointer rounded-lg"
                                        >
                                            <option value="default" disabled hidden>Profile Status</option>
                                            <option value="Active">Active</option>
                                            <option value="nonActive">nonActive</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            defaultValue='default'
                                            className="w-28 text-center opacity-60 bg-[#FBF7F4] px-[8px] py-[11px] ml-2 cursor-pointer rounded-lg"
                                        >
                                            <option value="default" disabled hidden>Showing</option>
                                            <option value="Active">Show</option>
                                            <option value="nonActive">None</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Tabs active={active} onChange={handleChange}>
                                    <Tab title='Friends'>
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
                                                            USER NAME
                                                        </th>
                                                        <th className='text-start text-[#464F60] px-6'>
                                                            EMAIL
                                                        </th>
                                                        <th className='text-start text-[#464F60] px-6'>
                                                            REGISTERED ON
                                                        </th>
                                                        <th className='text-start text-[#464F60] px-6'>
                                                            STATUS
                                                        </th>
                                                        <th className='text-center text-[#464F60]'>
                                                            ACTIONS
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
                                                                    <td className='text-start text-sm px-6'>{item.Email}</td>
                                                                    <td className='text-start text-sm px-6'>{item.Created}</td>
                                                                    <td className='text-start text-sm px-6'>
                                                                        <div className='group text-sm'>
                                                                            <p
                                                                                className={`w-[100px] text-center cursor-pointer p-4 rounded-md border rounded-[100px]
                                                                            ${item.Status === "Active" ?
                                                                                        "text-[#4F5AED] bg-[#F0F1FA]" :
                                                                                        "text-[#14804A] bg-[#E1FCEF]"}`
                                                                                }
                                                                            >
                                                                                {item.Status}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td className=' text-sm text-center'>
                                                                        <div className={`${showNoti ? '' : 'relative'} group text-sm`}>
                                                                            <MdMoreHoriz onClick={() => { setToggle(!toggle); setClickedView(item.id); }} className="cursor-pointer m-auto" />
                                                                            {
                                                                                toggle && clickedView === item?.id && (
                                                                                    <ul className='absolute w-24 bg-white shadow rounded-lg -top-3 2xl:-left-16 xl:-left-20 xsm:-left-20'>
                                                                                        <li className='cursor-pointer border-b-2 p-2' onClick={() => setToggle(!toggle)}>
                                                                                            <span className='flex flex-row text-sm text-gray-500'><MdEdit /> <span className='pl-2'>Edit</span></span>
                                                                                        </li>
                                                                                        <li className='cursor-pointer border-b-2 p-2' onClick={handleUserDetails}>
                                                                                            <span className='flex flex-row text-sm text-gray-500'><MdRemoveRedEye /> <span className='pl-2'>View</span></span>
                                                                                        </li>
                                                                                        <li className='cursor-pointer p-2' onClick={() => setToggle(!toggle)}>
                                                                                            <span className='flex flex-row text-sm text-gray-500'><MdDelete /> <span className='pl-2'>Delete</span></span>
                                                                                        </li>
                                                                                    </ul>
                                                                                )
                                                                            }
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
                                            <p className='pl-4 text-[#687182] text-[14px]'>{firstPostIndex + 1}-{lastPostIndex} of {UserData.length}</p>

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
                                                    totalPost={UserData.length}
                                                    postPerPage={postPerPage}
                                                    setCurrentPage={setCurrentPage}
                                                    currentPage={currentPage}
                                                />
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab title='Posts'>
                                        <div className='flex flex-col px-4 pt-8 bg-white'>
                                            {
                                                PostData.map((item, key) => {
                                                    return (
                                                        <div key={key}>
                                                            <div className='flex flex-row w-full'>
                                                                <div className={
                                                                    `${screensize < 450 ? 'w-3/12' : screensize < 768 ? 'w-2/12' : 'w-1/12'}
                                                                xl:pt-6 sm:pt-6 xsm:pt-0`
                                                                }>
                                                                    <img src={item.pic} alt='Profile' className=' xl:w-20 md:w-20 sm:w-16 xsm:w-12 xl:h-20 md:h-20 sm:h-16 xsm:h-12 rounded-[50%]' />
                                                                </div>
                                                                <div className={
                                                                    `${screensize < 450 ? 'w-9/12' : screensize < 768 ? 'w-10/12' : 'w-11/12'}
                                                                text-start xl:p-4 sm:p-4 xsm:p-0 2xl:text-[20px] sm:text-[20px] xsm:text-[12px]`
                                                                }>
                                                                    <div className='flex sm:flex-row xsm:flex-col justify-between'>
                                                                        <p><span className='font-bold'>{item.name}</span> <span className='text-[#687684]'>{item.username}</span></p>
                                                                        <p className='text-[#687684] 2xl:text-[20px] sm:text-[20px] xsm:text-[12px]'>{item.time}</p>
                                                                    </div>
                                                                    <p className='text-[#141619] font-medium'>{item.content}</p>
                                                                    <p className='text-[#4C9EEB]'>{item.tags}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-row'>
                                                                <img src={item.post} alt='Posts' className='"h-auto 2xl:max-w-2xl lg:max-w-2xl md:min-w-2xl m-auto rounded-lg' />
                                                            </div>
                                                            <div className='flex flex-row sm:text-[25px] xsm:text-[16px] text-[#687684] pt-2 space-x-24 pb-8 border-b-2'>
                                                                <span className='flex flex-row'><span className='sm:pt-2 xsm:pt-1'><MdOutlineModeComment /></span> 7</span>
                                                                <span className='flex flex-row'><span className='sm:pt-2 xsm:pt-1'><AiOutlineHeart /></span> 5</span>
                                                                <span className='pt-2'><BiShare /></span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Tab>
                                    <Tab title='Live Videos'>
                                        <div className='flex flex-col px-4 pt-8 bg-white'>
                                            {
                                                PostData.map((item, key) => {
                                                    return (
                                                        <div key={key}>
                                                            <div className='flex flex-row w-full'>
                                                                <div className={
                                                                    `${screensize < 450 ? 'w-3/12' : screensize < 768 ? 'w-2/12' : 'w-1/12'}
                                                                xl:pt-6 sm:pt-6 xsm:pt-0`
                                                                }>
                                                                    <img src={item.pic} alt='Profile' className=' xl:w-20 md:w-20 sm:w-16 xsm:w-12 xl:h-20 md:h-20 sm:h-16 xsm:h-12 rounded-[50%]' />
                                                                </div>
                                                                <div className={
                                                                    `${screensize < 450 ? 'w-9/12' : screensize < 768 ? 'w-10/12' : 'w-11/12'}
                                                                text-start xl:p-4 sm:p-4 xsm:p-0 2xl:text-[20px] sm:text-[20px] xsm:text-[12px]`
                                                                }>
                                                                    <div className='flex sm:flex-row xsm:flex-col justify-between'>
                                                                        <p><span className='font-bold'>{item.name}</span> <span className='text-[#687684]'>{item.username}</span></p>
                                                                        <p className='text-[#687684] 2xl:text-[20px] sm:text-[20px] xsm:text-[12px]'>{item.time}</p>
                                                                    </div>
                                                                    <p className='text-[#141619] font-medium'>{item.content}</p>
                                                                    <p className='text-[#4C9EEB]'>{item.tags}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-row'>
                                                                <video className='"h-auto 2xl:max-w-2xl lg:max-w-2xl md:min-w-2xl m-auto rounded-lg' controls>
                                                                    <source src={item.video} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            </div>
                                                            <div className='flex flex-row sm:text-[25px] xsm:text-[16px] text-[#687684] pt-2 space-x-24 pb-8 border-b-2'>
                                                                <span className='flex flex-row'><span className='sm:pt-2 xsm:pt-1'><MdOutlineModeComment /></span> 7</span>
                                                                <span className='flex flex-row'><span className='sm:pt-2 xsm:pt-1'><AiOutlineHeart /></span> 5</span>
                                                                <span className='pt-2'><BiShare /></span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default playerDetails;