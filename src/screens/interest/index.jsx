import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdMoreHoriz, MdEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";

import { selectNotiModal, selectActiveModal } from "../../features/modal";
import MultiModal from "../../components/modal/MultiModal";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../components/Pagination";
import UserData from "../../utils/userData";

import "./style.css";
import CreateInterestModal from "../../components/modal/CreateInterestModal";
import { DeleteButton, EditButton } from "../../components/tableButtons";

const PlayerManagement = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const Currentdata = UserData.slice(firstPostIndex, lastPostIndex);


  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
//  ----- Modal State -----------
  const [modalActive, setModalActive] = useState({
    create: false,
    edit: false,
  });

  return (
    <div
      className="player-div"
    >
      
      <Sidebar />
      <Header
        heading="Interest"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right">
        <div className="animate-div">
          <div className="py-10 m-8 rounded-[11px]">
            <div className="flex justify-end items-center">
              <button
                onClick={() => {
                  setModalActive({ create: true, edit: false });
                }}
                className="bg-[#070029] text-white py-3 px-4 rounded-lg "
              >
                Create Interest
              </button>
            </div>
            {modalActive.create && (
              <CreateInterestModal
                modalActive={modalActive}
                setModalActive={setModalActive}
                buttonName="Create Interest"
                title="Create Interest"
              />
            )}
            <div className="overflow-x-scroll lg:overflow-auto">
              <table className="w-full mt-10">
                <thead>
                  <tr className="w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500">
                    <th className="text-start text-[#464F60] px-6">#</th>
                    <th className="text-start text-[#464F60] px-6">NAME</th>
                    <th className="text-start text-[#464F60] px-6">IMAGE</th>
                    <th className="text-start text-[#464F60] px-6">
                      CREATED AT
                    </th>
                    <th className="text-center text-[#464F60]">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {Currentdata.map((item) => {
                    return (
                      <tr
                        className="border-b-2 h-20 cursor-pointer font-semibold text-[#292D32]"
                        key={item.id}
                      >
                        <td className="text-start text-sm px-6">{item.id}</td>
                        <td className="text-start text-sm px-6">
                          <p>{item.Name}</p>
                          <p className="text-[#687182]">{item.phone}</p>
                        </td>

                        <td className="text-start text-sm px-6">
                          <img
                            className="w-[18px] h-[18px]"
                            src={
                              "https://rootroom.testdevlink.net/uploads/icons/Vector-4.png"
                            }
                            alt="vector"
                          />
                        </td>
                        <td className="text-start text-sm px-6">MM/YY/DD</td>
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
                    <CreateInterestModal
                      modalActive={modalActive}
                      setModalActive={setModalActive}
                      title="Edit Interest"
                      defaultName="admin"
                      defaultImage="Sample.jpg"
                      buttonName="Edit Interest"
                    />
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-10 flex justify-between items-center flex-col gap-3 md:flex-row text-[11px]">
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

export default PlayerManagement;
