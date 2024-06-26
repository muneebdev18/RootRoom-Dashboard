import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../components/Pagination";
import subscription from "../../utils/subscription";
import "./style.css";
import CreateLangugaeModal from "../../components/modal/CreateLangugaeModal";
import { DeleteButton, EditButton } from "../../components/tableButtons";

const Language = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const Currentdata = subscription.slice(firstPostIndex, lastPostIndex);
  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [modalActive, setModalActive] = useState({
    create: false,
    edit: false,
  });

  return (
    <div
      
      className="sub-div"
    >
      <Sidebar />
      <Header
        heading="Language"
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
                Create Language
              </button>
            </div>
            {modalActive.create && (
              <CreateLangugaeModal
                title="Create Language"
                buttonName="Create Language"
                setModalActive={setModalActive}
              />
            )}
            <div className="text-center">
              <div className="overflow-x-scroll lg:overflow-auto">
                <table className="w-full mt-10">
                  <thead>
                    <tr className="w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500">
                      <th className="text-start px-6 text-[#464F60]">#</th>
                      <th className="text-start text-[#464F60] px-6">NAME</th>
                      <th className="text-start text-[#464F60] px-6">
                        CREATED AT
                      </th>

                      <th className="text-center text-[#464F60] px-6">
                        ACTIONS
                      </th>
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
                          <td className="text-start text-sm px-6">MM/YY/DD</td>
                          <td className="text-center text-sm px-6">
                          <div className="flex gap-1 justify-center items-center ">
                          <EditButton modalActive={modalActive} setModalActive={setModalActive} />
                          <DeleteButton/>
                          </div>
                          </td>
                        </tr>
                      );
                    })}
                    <div>
                      {modalActive.edit && (
                        <CreateLangugaeModal
                          title="Edit Language"
                          buttonName="Edit Language"
                          setModalActive={setModalActive}
                          defaultName={"admin"}
                        />
                      )}
                    </div>
                  </tbody>
                </table>
              </div>

              <div className="mt-10 flex justify-between items-center flex-col gap-3 md:flex-row text-[11px]">
                <p className="pl-4 text-[#687182] text-[14px]">
                  {firstPostIndex + 1}-{lastPostIndex} of {subscription.length}
                </p>

                <div className="flex sm:flex-row xsm:flex-col space-x-4">
                  <Pagination
                    totalPost={subscription.length}
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
    </div>
  );
};

export default Language;
