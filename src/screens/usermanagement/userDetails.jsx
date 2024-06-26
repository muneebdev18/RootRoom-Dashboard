/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card1 from '../../assets/images/groupCardImg1.png'
import { selectScreenSize } from "../../features/screenSize";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { CiLock } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
 

import "./style.css";

const UserDetails = () => {
  const screensize = useSelector(selectScreenSize);
  // Handle User Profile Screen
  const handleProfile = () => {
    window.location.href = "/usermanagement/userdetails";
  };

  const Cards = [{
    id: 1,
    image: Card1,
    title: "Bibile Studies ",
    visibility:"private",
    totalMembers:150
  },
  {
    id: 2,
    image: Card1,
    title: "Social Studies ",
    visibility:"private",
    totalMembers:160
  },{
    id: 3,
    image: Card1,
    title: "Facts Studies ",
    visibility:"private",
    totalMembers:178
  },{
    id: 4,
    image: Card1,
    title: "Visual Studies ",
    visibility:"private",
    totalMembers:110
  },{
    id: 5,
    image: Card1,
    title: "Political Studies ",
    visibility:"private",
    totalMembers:190
  },]
   //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
   useEffect(() => {
    window.scroll(0, 0);
  }, []);
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
                <div className="grid grid-cols-2">
                  <div>
                    <p className="opacity-60 text-[16px] mb-2">First Name:</p>
                    <p className="opacity-60 text-[16px] mb-2">Last Name:</p>
                    <p className="opacity-60 text-[16px] mb-2">Email:</p>
                    <p className="opacity-60 text-[16px] mb-2">Total Posts:</p>
                    <p className="opacity-60 text-[16px] mb-2">Bio:</p>
                  </div>
                  <div>
                    <p className="text-[16px] mb-2 font-semibold ">Alexa</p>
                    <p className="text-[16px] mb-2 font-semibold ">Shaun</p>
                    <p className="text-[16px] mb-2 font-semibold ">alexa.shaun@gmail.com</p>
                    <p className="text-[16px] mb-2 font-semibold ">9</p>
                    <p className="text-[16px] mb-2 font-semibold ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis hic optio veniam, consequuntur adipisci commodi iste ea blanditiis officiis eligendi illo, eaque ratione earum nesciunt minima. Est voluptatem distinctio aliquam.</p>

                  </div>
                </div>
                <p className="text-3xl font-semibold">Groups</p>
                {/*------- Groups------- */}
                <div className="grid mt-8 gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2">
                  {Cards?.map((item)=>{
                    return(
                      <div key={item?.id} className="mb-5 rounded-lg overflow-hidden h-[350px] border  bg-white">
                      <img className="h-[175px] w-full object-cover rounded-lg" src={item?.image} alt="groupcard1" />
                      <div className="px-6 py-4">
                        <p className="text-[#333333] text-[22px] font-[500] mb-2">{item?.title}</p>
                        <p className="text-[#333333] text-[16px] gap-1  mb-3 flex items-center">
                          {item?.visibility === "private" ? <><CiLock size={16} /> Private Group</> :<><CiGlobe size={16}/> Public Group</>} - {item?.totalMembers} Members
                        </p>
                        <button className="flex font-medium justify-center items-center w-full border py-3 px-4 rounded-[50px] border-[#333333] transition hover:bg-[#070029] hover:text-white">View Group</button>
                      </div>
                    </div>
                    )
                  })}
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
