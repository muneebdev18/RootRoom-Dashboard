import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageGallery from "react-image-gallery";
import Gimage1 from '../../assets/images/image-gallery-2.jpg'
import Gimage2 from '../../assets/images/image-gallery-3.jpg'
import Gimage3 from '../../assets/images/image-gallery-5.jpg'
import Gimage4 from '../../assets/images/image-gallery-4.jpg'
import Card from '../../assets/images/groupCardImg1.png'
import Profile from '../../assets/images/sampleProfile.webp'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import './style.css';
import LikeCommentModal from '../../components/modal/LikeCommentModal';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { BASE_URL } from '../../app/constants';
import { TextSkeleton } from '../../components/skeleton';
import Loader from '../../components/loader';
import { AiOutlineClose } from 'react-icons/ai';

const GroupDetails = () => {

  const [modalActive, setModalActive] = useState({
    likes: false,
    comments: false,
    likeId: '',
    commentId: ''
  })

  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);



  // Get the id from the url parameter
  const { id } = useParams()

  // -------- GET Group Details -------------
  const adminData = JSON.parse(localStorage.getItem('admin_user'))
  const token = adminData?.token
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
  const { data, isLoading, error } = useSWR([`${BASE_URL}admin/groupDetailsWithPost/${id}`], fetcherWithToken);
  const groupData = data?.data
  console.log(groupData);
  const groupImg = groupData?.coverPictures
  //  ----------- Image Gallery --------------
  const images = groupImg?.map((item) => {
    return (
      {
        original: item?.picture,
        thumbnail: item?.picture,
      }
    )
  })

  const [memberModal, setMemberModal] = useState(false)

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }

  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    // Disable scrolling on the body element when the modal is active
    if (memberModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Clean up function to restore scrolling when component unmounts or modal is closed
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [memberModal]); // Ensure this effect runs when modalActive changes

  // ------ Modal State ------

  return (
    <div className='feedback-details'>
      <Sidebar />
      <Header heading="Group Details" content="With all of the styling tool options available in today's market" />
      <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
        <div className='animate-div'>
          <div className='py-10 rounded-[11px]'>
            <div className='flex flex-col justify-between gap-3 2xl:pl-8 xl:pl-8 lg:pl-0 xsm:pl-0 pt-8'>
              <div className='xl:p-12 lg:p-12 xsm:p-2 bg-white'>
                {/* <h1 className='text-[20px] font-medium pb-8'>Group Details</h1> */}
                {/* ------- Lables &  Details of Dashboard --------*/}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-12">
                        <div>
                          <p className=" text-[17px] font-semibold mb-2">Group Name:</p>
                          <p className="text-[17px] font-semibold mb-2">Owner of Group:</p>
                          <p className=" text-[17px] font-semibold mb-2">Total Members:</p>
                          <p className=" text-[17px] font-semibold mb-2">Total Posts:</p>
                        </div>
                        <div>
                          <p className="text-[17px] text-gray-500  font-semibold mb-2 ">
                            {isLoading ? <TextSkeleton width="w-40" /> : groupData?.groupName}
                          </p>
                          <p className="text-[17px] text-gray-500  font-semibold mb-2 ">
                            {isLoading ? <TextSkeleton width="w-40" /> : groupData?.userId?.fullname}
                          </p>
                          <div className='flex items-center gap-6'>
                            <p className="text-[17px] text-gray-500  font-semibold mb-2 ">
                              {isLoading ? <TextSkeleton width="w-40" /> : groupData?.members?.length}
                            </p>
                          </div>
                          <p className="text-[17px] text-gray-500  font-semibold mb-2 ">
                            {isLoading ? <TextSkeleton width="w-40" /> : groupData?.posts?.length}
                          </p>
                        </div>

                      </div>
                    </div>
                    {
                      !isLoading && <button onClick={() => setMemberModal(!memberModal)} className=' mb-2 mt-7 border text-white bg-[#070029] py-1 px-4 rounded-lg'>View Members</button>
                    }

                  </div>
                  <div className="col-span-1">
                    {isLoading ? (
                      <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                        <div className="flex items-center m-auto justify-center w-[400px] rounded-[5%] h-[250px] bg-gray-300 dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <ImageGallery autoPlay={false} showNav={false} showPlayButton={false} showFullscreenButton={false} showBullets={false} items={images} />
                    )}
                  </div>
                </div>
                {/* ------------- View Members ---------- */}
                {
                  memberModal && (

                    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-noti z-[9999]">
                      <div className="relative flex flex-col h-[500px] w-[500px] bg-white mx-2 shadow rounded-xl">
                        <div className="sticky top-0 bg-white p-4 shadow z-50 flex justify-between items-center">
                          <p className="text-black text-center font-semibold text-[23px]">
                            Group Members
                          </p>
                          <AiOutlineClose
                            onClick={() => setMemberModal(false)}
                            className="text-black cursor-pointer sm:text-[30px] xsm:text-[30px]"
                          />
                        </div>
                        <div className="flex flex-col h-full overflow-y-auto sm:p-5 xsm:p-4">
                          {
                            isLoading ? <Loader loaderStyle={loaderStyle} /> : groupData?.members?.length > 0 ? groupData?.members?.map((item, index) => {
                              return (
                                <div key={item?.id} className="flex w-full my-1 items-center justify-between">
                                  <div className="flex items-center my-[2px] gap-[30px]">
                                    <img
                                      src={item?.user?.profile}
                                      className="w-10 h-10 rounded-full"
                                      alt=""
                                    />
                                    <p className="font-medium">{item?.user?.fullname}</p>
                                  </div>
                                  {/* <FaThumbsUp color="blue" size={18} /> */}
                                </div>
                              )
                            }) : <p>No Data To Show</p>
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
                {/* ------ Posts ------- */}
                <div className='mt-10'>
                  <p className='text-[20px] font-medium'>Group Posts</p>
                  <div className='grid mt-8 3xl:gap-4 2xl:grid-cols-4 xl:grid-cols-3 gap-4 md:grid-cols-2'>
                    {isLoading ? <Loader loaderStyle={loaderStyle} /> : groupData?.posts?.length > 0 ? groupData?.posts?.map((item) => {
                      return (
                        <>
                          <div key={item?.id} class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div class="relative   h-full overflow-hidden rounded-xl  bg-clip-border text-white ">
                              <img className='w-full object-cover h-[175px]' src={item?.media} alt="" />
                            </div>
                            <div class="p-6">
                              <p class="block  text-base font-light leading-relaxed text-inherit antialiased">
                                {item?.content.slice(0, 150)}
                              </p>
                              <p className='flex gap-3 items-center mt-5' >
                                <span onClick={() => {
                                  item?.likes?.length > 0 && setModalActive({ likes: true, comments: false, likeId: item._id })
                                }} className='border cursor-pointer border-black font-medium rounded-lg py-1 px-2'>Likes: {item?.likes?.length}</span>
                                <span onClick={() => {
                                  item?.comments?.length > 0 && setModalActive({ comments: true, likes: false, commentId: item._id })
                                }} className='border cursor-pointer border-black font-medium rounded-lg py-1 px-2'>Comments: {item?.comments?.length}</span>
                              </p>
                            </div>
                          </div>
                        </>
                      )
                    }) : <p className=" text-[18px] ">No Posts To Show</p>
                    }
                    {
                      modalActive.likes && (
                        <LikeCommentModal modalActive={modalActive} setModalActive={setModalActive} />
                      )
                    }
                    {
                      modalActive?.comments && (
                        <LikeCommentModal modalActive={modalActive} setModalActive={setModalActive} />

                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupDetails;