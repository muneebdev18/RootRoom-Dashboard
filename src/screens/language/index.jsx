import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../components/Pagination";
import subscription from "../../utils/subscription";
import "./style.css";
import CreateLangugaeModal from "../../components/modal/CreateLangugaeModal";
import { EditButton } from "../../components/tableButtons";
import { BASE_URL } from "../../app/constants";
import useSWR from "swr";
import Loader from "../../components/loader";
import styles from '../../components/tableButtons/style.module.css';
import { useDispatch, useSelector } from "react-redux";
import { clearDeleteLanguage, deleteLanguageApi } from "../../app/features/languages/languageSlice";
import { toast } from "react-toastify";
import { FaTrashRestore } from "react-icons/fa";

const Language = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const Currentdata = subscription.slice(firstPostIndex, lastPostIndex);

  const [modalActive, setModalActive] = useState({
    create: false,
    edit: false,
  });
  const [deleteLanguageId, setDeleteLanguageId] = useState(false)
  const [loadingRows, setLoadingRows] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const adminData = JSON.parse(localStorage.getItem("admin_user"));
  const token = adminData?.token;
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
  const { data, isLoading, mutate } = useSWR([`${BASE_URL}admin/fetchAllLanguage`], fetcherWithToken);
  const languageData = data?.data;

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "290px",
  };


  const [languageId, setLanguageId] = useState({
    id: '',
    name: ''
  });

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    setLoadingRows((prev) => [...prev, id]);
    await dispatch(deleteLanguageApi({
      id: id,
      mutate: mutate
    }));
    setLoadingRows((prev) => prev.filter(rowId => rowId !== id));
    setDeleteLanguageId(true)
  };

  const { isLoading: loading, success, message } = useSelector((value) => value.Langauge);

  useEffect(() => {
    if (deleteLanguageId) {
      if (loading) {
        dispatch(clearDeleteLanguage());
        setDeleteLanguageId(false)
      } else if (loading === null) {
        return;
      } else {
        toast.success(message,{delay: 1500}, {
          position: "top-right"
        });
        dispatch(clearDeleteLanguage());
        setDeleteLanguageId(false)

      }
    }
    else {
      return
    }

  }, [success, message, deleteLanguageId]);


  return (
    <div className={`${loading ? 'pointer-events-none opacity-50' : ''} sub-div`}>
      <Sidebar />
      <Header
        heading="Language"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-220px)] bg-[#F9F9F9] md:w-full xsm:w-full float-right">
        <div className="animate-div">
          <div className="ml-[60px] m-8 rounded-[11px]">
            <div className="flex justify-end items-center">
              <button
                onClick={() => {
                  setModalActive({ create: true, edit: false });
                }}
                className="bg-[#070029] text-white py-3 px-4 rounded-lg hover:bg-[#3a2a88] "
              >
                Add Language
              </button>
            </div>
            {modalActive.create && (
              <CreateLangugaeModal
                title="Add Language"
                buttonName="Add Language"
                setModalActive={setModalActive}
                modalActive={modalActive}
                id='create-language'
                mutate={mutate}
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
                      <th className="text-start text-[#464F60] px-6">
                        STATUS
                      </th>
                      <th className="text-center text-[#464F60] px-6">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>

                  <tbody className="w-full">
                    {isLoading ? '' : languageData?.map((item, index) => {
                      const date = new Date(item?.createdAt);
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const year = String(date.getFullYear()).slice(-2);
                      const tempData = `${day}/${month}/20${year}`;
                      return (
                        <tr
                          className="border-b-2 h-20 cursor-pointer font-semibold text-[#292D32]"
                          key={item._id}
                        >
                          <td className="text-start text-sm px-6">{index + 1}</td>
                          <td className="text-start text-sm px-6">
                            <p>{item.name}</p>
                          </td>
                          <td className="text-start text-sm px-6">{tempData}</td>
                          <td>
                            <div className="group text-sm ">
                              {loadingRows.includes(item._id) ? (
                                <Loader />
                              ) : <p
                                className={`w-[100px] text-center cursor-pointer py-2 rounded-md border ${item.isDeleted === true
                                  ? "text-[#fff] bg-inactiveBtn"
                                  : "text-[#fff] bg-activeBtn"
                                  }`}
                              >
                                {item?.isDeleted ? "Inactive" : "Active"}
                              </p>
                              }
                            </div>
                          </td>
                          <td className="text-center text-sm px-6">
                            <div className="flex gap-1 justify-center items-center ">
                              <div onClick={() => {
                                setLanguageId({
                                  id: item?._id,
                                  name: item?.name
                                });
                              }}>
                                <EditButton modalActive={modalActive} setModalActive={setModalActive} />
                              </div>
                              <div>
                                {
                                  item?.isDeleted ? (
                                    <FaTrashRestore onClick={() => deleteHandler(item?._id)} size={22} className="text-[#ff0000] hover:text-[#3ea4f0]" />
                                  ) : (
                                    <button onClick={() => deleteHandler(item?._id)} className={styles.binbutton}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 39 7"
                                        className={styles.bintop}
                                      >
                                        <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                        <line
                                          stroke-width="3"
                                          stroke="white"
                                          y2="1.5"
                                          x2="26.0357"
                                          y1="1.5"
                                          x1="12"
                                        ></line>
                                      </svg>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 33 39"
                                        className={styles.binbottom}
                                      >
                                        <mask fill="white" id="path-1-inside-1_8_19">
                                          <path
                                            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                          ></path>
                                        </mask>
                                        <path
                                          mask="url(#path-1-inside-1_8_19)"
                                          fill="white"
                                          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                        ></path>
                                        <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                        <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                      </svg>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 89 80"
                                        className={styles.garbage}
                                      >
                                        <path
                                          fill="white"
                                          d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                        ></path>
                                      </svg>
                                    </button>
                                  )
                                }
                              </div>
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
                          defaultName={languageId?.name}
                          modalActive={modalActive}
                          languageId={languageId}
                          id='edit-language'
                          mutate={mutate}
                        />
                      )}
                    </div>
                  </tbody>
                </table>
              </div>

              {isLoading ? <Loader loaderStyle={loaderStyle} /> : languageData?.length > 0 ? (
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
              ) : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
