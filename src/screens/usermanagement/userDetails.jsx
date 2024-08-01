/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card1 from '../../assets/images/groupCardImg1.png'
import { selectScreenSize } from "../../features/screenSize";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { CiLock } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import UserImg from '../../assets/images/image-gallery-2.jpg'
import { Link, useParams } from "react-router-dom";
import "./style.css";
import useSWR from "swr";
import { BASE_URL } from "../../app/constants";
import { TextSkeleton } from "../../components/skeleton";
import Loader from "../../components/loader";

const UserDetails = () => {
  const { userId } = useParams()

  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  //  --------- GET A Single User Data API ---------------

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
  const { data, isLoading, error } = useSWR([`${BASE_URL}admin/getUserDetailById/${userId}`], fetcherWithToken);
  const userData = data?.data
  console.log(userData);
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }
  return (
    <div className="rep-details">
      <Sidebar />
      <Header
        heading="User Details"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right">
        <div className="animate-div">
          <div className="py-10 rounded-[11px]">
            <div className="flex flex-col justify-between gap-3 bg-[#FBF7F4] lg:pl-8 md:pl-0 pt-8">
              <div className="xl:px-8 lg:px-8 xsm:px-2 py-12 bg-white">
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-12">
                        <div>
                          <p className="text-[17px] font-semibold mb-2">First Name:</p>
                          <p className="text-[17px] font-semibold mb-2">Email:</p>
                          <p className="text-[17px] font-semibold mb-2">Bio:</p>
                          <p className="text-[17px] font-semibold mb-2">Status:</p>
                        </div>
                        <div>
                          <p className="text-[17px] text-gray-500  font-semibold mb-2 ">{userData ? userData?.fullname : <TextSkeleton width={'w-28'} />}</p>
                          <p className="text-[17px] text-gray-500  font-semibold mb-2 ">{userData ? userData?.email : <TextSkeleton width={'w-48'} />}</p>
                          <p className="text-[17px] text-gray-500  font-semibold mb-2 ">{userData ? userData?.bio : <TextSkeleton width={'w-56'} />}</p>
                          {/* <p className="text-[17px] text-gray-500  font-semibold mb-2 ">{userData?.isBlocked ? "}</p> */}
                          {userData ?
                            userData?.isBlocked ? <p className="text-[17px] text-gray-500  font-semibold mb-2">User is <span className="text-[#ff0000] font-bold">Blocked</span></p> : <p className="text-[17px] text-gray-500  font-semibold mb-2">User is <span className="text-[#06d001] font-bold">Unblock</span></p>
                            :
                            <TextSkeleton width={'w-56'} />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    // Skeleton if image is not specified
                    !userData?.profile ? <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                      <div class="flex items-center m-auto justify-center w-[200px] rounded-[50%] h-[200px] bg-gray-300  dark:bg-gray-700">
                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    </div> :
                      <div className="overflow-hidden" >
                        <img className="h-[200px] object-cover m-auto w-[200px] rounded-[50%]" src={userData?.profile} alt="" />
                      </div>
                  }

                </div>
                {/*------- Interest------- */}
                <p className="text-3xl mb-3 font-semibold">Interests </p>
                <div className="flex flex-wrap gap-2">

                  {isLoading ? <Loader loaderStyle={loaderStyle} /> : userData?.interests.length > 0 ? userData?.interests?.map((item) => {
                    return (
                      <div key={item?._id} className=" flex w-[115px] my-8 cursor-pointer bg-white border border-1 border-[#070029] rounded-3xl text-[#070029] py-[8px] gap-1 justify-center items-center md:my-3 xsm:my-3">
                        <img className="h-[14px] w-[14px]" src={item?.icon} alt="" />
                        <p className="font-semibold">{item?.name}</p>
                      </div>
                    )
                  })
                    : <p className=" text-[18px] my-5">No Interests To Show</p>
                  }

                </div>
                {/* ------- Languages ------- */}
                <p className="text-3xl my-4 font-semibold">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {
                    isLoading ? <Loader loaderStyle={loaderStyle} /> : userData?.languages?.length > 0 ? userData?.languages?.map((item) => {
                      return (
                        <div key={item?._id} className="flex justify-center w-[115px] my-8 cursor-pointer bg-white border border-1 border-[#070029] rounded-3xl text-[#070029] py-[8px] gap-1 md:my-3 xsm:my-3">
                          <p className="font-semibold">{item?.name}</p>
                        </div>
                      )
                    }) : <p className=" text-[18px] my-5">No Langauges To Show</p>

                  }
                </div>

                {/*------- Groups------- */}
                <p className="text-3xl mt-4 font-semibold">Groups</p>
                <div className="grid mt-8 gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2">
                  {isLoading ? <Loader loaderStyle={loaderStyle} /> : userData?.groups?.length > 0 ? userData?.groups?.map((item) => {
                    return (
                      <div key={item?.id} className="mb-5 rounded-lg overflow-hidden h-[350px] border  bg-white">
                        <img className="h-[175px] w-full object-cover rounded-lg" src={item?.coverPictures[0]?.picture} alt="groupcard1" />
                        <div className="px-6 py-4">
                          <p className="text-[#333333] text-[22px] font-[500] mb-2">{item?.groupName}</p>
                          <p className="text-[#333333] text-[16px] gap-1  mb-3 flex items-center">
                            {item?.privacy === "Public" ? <><CiGlobe size={16} /> Public Group</> : <><CiLock size={16} /> Private Group</>} - {item?.members?.length} Members
                          </p>
                          <Link to={`/groupmanagement/groupdetails/${item?._id}`} ><button className="flex font-medium justify-center items-center w-full border py-3 px-4 rounded-[50px] border-[#333333] transition hover:bg-[#070029] hover:text-white">View Group</button></Link>
                        </div>
                      </div>
                    )
                  }) : <p className=" text-[18px] ">No Interests To Show</p>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
