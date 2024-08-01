import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectNotiModal, selectLogout } from "../../features/modal";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../components/Pagination";
import UserData from "../../utils/userData";

import "./style.css";
import CreateAdminModal from "../../components/modal/CreateAdminModal";
import {DeleteButton, EditButton} from "../../components/tableButtons/index";
import useSWR from "swr";
import { BASE_URL } from "../../app/constants";
const UserManagement = () => {


  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const Currentdata = UserData.slice(firstPostIndex, lastPostIndex);

  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [modalActive, setModalActive] = useState({
    create: false,
    edit: false,
  });
  const [userId, setUserId] = useState("");

  // ----------- GET API Of All Admins -----------
const adminData = JSON.parse(localStorage.getItem("admin_user"))
const token = adminData?.token
const fetcherWithToken = async (url,...args) => {
  const response = await fetch(url, {
    ...args,
    headers: {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
const { data,isLoading,error } = useSWR([`${BASE_URL}admin/getAllAdmin`], fetcherWithToken);

  return (
    <div
      className="user-div"
    >
      <Sidebar />
      <Header
        heading="Admin Management"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right">
        <div className="animate-div">
          <div className="py-10 m-8 rounded-[11px]">
            <div className="flex justify-end items-center">
              <button
                onClick={() => {
                  setModalActive({ create: true });
                }}
                
                className="bg-[#070029] text-white py-3 px-4 rounded-lg "
              >
                Create Admin
              </button>
            </div>
            {modalActive.create && (
              <CreateAdminModal
                modalActive={modalActive}
                setModalActive={setModalActive}
                title="Create Admin"
                buttonName="Create Admin"
                id="create-admin"
              />
            )}
            <div className="overflow-x-scroll lg:overflow-auto">
              <table className="w-full mt-10">
                <thead>
                  <tr className="w-72 h-20 border-b-2 border-[#EEEEEE] text-[#464F60]">
                    <th className="text-start px-6">#</th>
                    <th className="text-start px-6">NAME</th>
                    <th className="text-start px-6">EMAIL</th>
                    <th className="text-start px-6">REGISTERED ON</th>
                    <th className="text-start px-6">STATUS</th>
                    <th className="text-center">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {Currentdata.map((item) => {
                    return (
                      <tr
                        className="h-20 cursor-pointer font-semibold text-[#292D32]"
                        key={item.id}
                      >
                        <td className="text-start text-sm px-6">{item.id}</td>
                        <td className="text-start text-sm px-6">
                          <p>{item.Name}</p>
                          <p className="text-[#687182]">{item.phone}</p>
                        </td>
                        <td className="text-start text-sm px-6">
                          {item.Email}
                        </td>
                        <td className="text-start text-sm px-6">
                          {item.Created}
                        </td>
                        <td className="text-start text-sm px-6">
                          <div className="group text-sm">
                            <p
                              className={`w-[100px] text-center cursor-pointer py-2 rounded-md border rounded-[100px] ${
                                item.Status === "Active"
                                  ? "text-[#4F5AED] bg-[#F0F1FA]"
                                  : "text-[#14804A] bg-[#E1FCEF]"
                              }`}
                            >
                              {item.Status}
                            </p>
                          </div>
                        </td>
                        <td className=" text-sm text-center">
                           <div className="flex gap-1 justify-center items-center ">
                          <EditButton modalActive={modalActive} setModalActive={setModalActive} />
                          <DeleteButton/>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {modalActive.edit && (
                    <CreateAdminModal
                      modalActive={modalActive}
                      setModalActive={setModalActive}
                      title="Edit Admin"
                      defaultName="admin"
                      defaultEmail="admin@example.com"
                      defaultPassword="password"
                      buttonName="Edit Admin"
                      id="edit-admin"
                    />
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row mt-10 justify-between items-center gap-3 text-[11px]">
              <p className="pl-4 text-[#687182] text-[14px]">
                {firstPostIndex + 1}-{lastPostIndex} of {UserData.length}
              </p>

              <div className="flex sm:flex-row xsm:flex-col space-x-4">
                <Pagination
                  totalPost={UserData.length}
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

export default UserManagement;
