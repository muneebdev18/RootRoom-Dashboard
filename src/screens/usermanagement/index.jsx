import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../components/Pagination";
import reportData from "../../utils/reportData";

import "./style.css";

import {DeleteButton, EditButton, ViewButton} from "../../components/tableButtons/index";

const Usermanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const Currentdata = reportData.slice(firstPostIndex, lastPostIndex);
 //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
 useEffect(() => {
  window.scroll(0, 0);
}, []);
  return (
    <div className="rep-div">
      <Sidebar />
      <Header
        heading="User Management"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right">
        <div className="animate-div">
          <div className="py-10 m-8 rounded-[11px]">
            <div className="flex justify-between items-center flex-col-reverse md:flex-row gap-3 bg-[#FBF7F4] "></div>
            <div className="overflow-x-scroll lg:overflow-auto">
              <table className="w-full mt-10">
                <thead>
                  <tr className="w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500">
                    <th className="text-start text-[#464F60] px-6">#</th>
                    <th className="text-start text-[#464F60] px-6">NAME</th>
                    <th className="text-start text-[#464F60] px-6">EMAIL</th>
                    <th className="text-start text-[#464F60] px-6">
                      TOTAL GROUPS
                    </th>
                    <th className="text-start text-[#464F60] px-6">
                      TOTAL POSTS
                    </th>
                    <th className="text-start text-[#464F60] px-6">STATUS</th>
                    <th className="text-start text-[#464F60] px-6">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {Currentdata.map((item) => {
                    return (
                      <tr
                        className="border-b-2 h-20 cursor-pointer font-semibold text-[#464F60]"
                        key={item.id}
                      >
                        <td className="text-start text-sm px-6">{item.id}</td>
                        <td className="text-start text-sm px-6">
                          <p>{item.Name}</p>
                          <p className="text-[#687182]">{item.phone}</p>
                        </td>
                        <td className="text-start text-sm px-6">
                          user@gmail.com
                        </td>
                        <td className="text-center text-sm px-6">8</td>
                        <td className="text-center text-sm px-6">7</td>
                        <td>
                          <div className="group text-sm ">
                            <p
                              className={`w-[100px] text-center cursor-pointer py-2 rounded-md border ${
                                item.status === "Active"
                                  ? "text-[#4F5AED] bg-[#F0F1FA]"
                                  : "text-[#14804A] bg-[#E1FCEF]"
                              }`}
                            >
                              {item?.status}
                            </p>
                          </div>
                        </td>
                      
                        <td className="text-sm">
                          <div className="flex gap-[7px] items-center justify-center ">
                          <Link to={"/usermanagement/userdetails"}>
                          <ViewButton/>
                          </Link>
                          {/* <EditButton/> */}
                          <DeleteButton/>
                        
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-10 flex justify-between items-center flex-col gap-3 md:flex-row text-[11px]">
              <p className="pl-4 text-[#687182] text-[14px]">
                {firstPostIndex + 1}-{lastPostIndex} of {reportData.length}
              </p>

              <div className="flex sm:flex-row xsm:flex-col space-x-4">
                <div className="flex flex-row text-[11px]">
                  <span className="pt-3 text-[#687182] text-[14px]">
                    Rows per page:
                  </span>
                  <select
                    value={postPerPage}
                    onChange={(e) => setPostPerPage(e.target.value)}
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
                  totalPost={reportData.length}
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
  );
};

export default Usermanagement;
