// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../../components/header";
// import Sidebar from "../../components/sidebar";
// import Pagination from "../../components/Pagination";
// import reportData from "../../utils/reportData";

// import "./style.css";
// import { TbLockFilled } from "react-icons/tb";
// import { FaLock, FaUnlock } from "react-icons/fa6";


// import { DeleteButton, ViewButton } from "../../components/tableButtons/index";
// import { BASE_URL } from "../../app/constants";
// import useSWR from "swr";
// import Loader from "../../components/loader";
// import { MdVerified } from "react-icons/md";
// import { MdCancel } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { blockUserApi, clearUserBlock } from "../../app/features/user/userSlice";
// import { toast } from "react-toastify";
// const Usermanagement = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postPerPage, setPostPerPage] = useState(10);

//   const lastPostIndex = currentPage * postPerPage;
//   const firstPostIndex = lastPostIndex - postPerPage;
//   const Currentdata = reportData.slice(firstPostIndex, lastPostIndex);
//   //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
//   useEffect(() => {
//     window.scroll(0, 0);
//   }, []);

//   //  --------- GET All User Data API ---------------

//   const adminData = JSON.parse(localStorage.getItem('admin_user'))
//   const token = adminData?.token

//   const fetcherWithToken = async (url, ...args) => {
//     const response = await fetch(url, {
//       ...args,
//       headers: {
//         ...args.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   };
//   const { data, isLoading, mutate } = useSWR([`${BASE_URL}admin/getAllUsersList`], fetcherWithToken);
//   const userData = data?.data

//   // ---------- Block Handler ----------
//   const dispatch = useDispatch()
//   const blockHandler = (id) => {
//     dispatch(blockUserApi({
//       id: id,
//       mutate: mutate
//     }))
//   }
//   const loaderStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "290px"
//   }
// const {isLoading:loading,success,message} = useSelector((value)=>value.User)
//   useEffect(()=>{
//     if (loading) {
//       dispatch(clearUserBlock());
//     } else if (loading === null) {
//       return;
//     } else {
//       toast.success(message, {
//         position: "top-right"
//       });
//       dispatch(clearUserBlock());
//     }
//   },[success,message])
//   return (
//     <div className="rep-div">
//       <Sidebar />
//       <Header
//         heading="User Management"
//         content="With all of the styling tool options available in today's market"
//       />
//       <div className="lg:w-[calc(100%-220px)] bg-[#F9F9F9] md:w-full xsm:w-full float-right">
//         <div className="animate-div">
//           <div className="ml-[60px] m-8 rounded-[11px]">
//             <div className="flex justify-between items-center flex-col-reverse md:flex-row gap-3 bg-[#FBF7F4] "></div>
//             <div className="overflow-x-scroll lg:overflow-auto">
//               <table className="w-full mt-10">
//                 <thead>
//                   <tr className="w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500">
//                     <th className="text-start text-[#464F60] px-6">#</th>
//                     <th className="text-start text-[#464F60] px-6">NAME</th>
//                     <th className="text-start text-[#464F60] px-6">EMAIL</th>
//                     <th className="text-start text-[16px] text-[#464F60] ">
//                       NO OF GROUPS
//                     </th>
//                     <th className="text-start text-[16px] text-[#464F60] ">
//                       NO OF POSTS
//                     </th>
//                     <th className="text-center text-[#464F60] px-6">
//                       VERIFICATION
//                     </th>
//                     <th className="text-start text-[#464F60] px-6">STATUS</th>
//                     <th className="text-start text-[#464F60] px-6">ACTIONS</th>
//                     {/* <th className="text-start text-[#464F60] px-6">BLOCK</th> */}
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {userData && userData?.map((item, index) => {
//                     return (
//                       <tr
//                         className="border-b-2 h-20 cursor-pointer font-semibold text-[#464F60]"
//                         key={item._id}
//                       >
//                         <td className="text-start text-sm px-6">{index + 1}</td>
//                         <td className="text-start text-sm px-6">
//                           <p>{item?.fullname}</p>
//                           {/* <p className="text-[#687182]">{item.phone}</p> */}
//                         </td>
//                         <td className="text-start text-sm px-6">
//                           {item?.email}
//                         </td>
//                         <td className="text-start text-sm px-6">{item?.groups}</td>
//                         <td className="text-start text-sm px-6">{item?.post}</td>
//                         <td className=" text-sm px-6 py-8 flex justify-center items-center">

//                           {item?.verified ? <MdVerified size={22} color="#3ea4f0" /> : <MdCancel size={22} color=" #ff0000" />}
//                         </td>
//                         <td>
//                           <div className="group text-sm ">
//                             <p
//                               className={`w-[100px] text-center cursor-pointer py-2 rounded-md border ${item.isBlocked === true
//                                 ? "text-[#fff] bg-inactiveBtn"
//                                 : "text-[#fff] bg-activeBtn"
//                                 }`}
//                             >
//                               {item?.isBlocked ? "Inactive" : "Active"}
//                             </p>
//                           </div>
//                         </td>

//                         <td className="text-sm">
//                           <div className="flex gap-[7px] items-center justify-center ">
//                             <Link to={`/usermanagement/userdetails/${item?._id}`}>
//                               <ViewButton />
//                             </Link>
//                             {
//                               item?.isBlocked ? <FaUnlock onClick={() => blockHandler(item?._id)} className="text-[#ff0000] hover:text-[#070029] transition-all" size={22} /> :
//                                 <FaLock onClick={() => blockHandler(item?._id)} className="text-[#ff0000] hover:text-[#070029] " size={22} />
//                             }


//                             {/* <EditButton/> */}
//                             {/* <DeleteButton /> */}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//             {
//               isLoading ? <Loader loaderStyle={loaderStyle} /> : <div className="mt-10 flex justify-between items-center flex-col gap-3 md:flex-row text-[11px]">
//                 <p className="pl-4 text-[#687182] text-[14px]">
//                   {firstPostIndex + 1}-{lastPostIndex} of {reportData.length}
//                 </p>

//                 <div className="flex sm:flex-row xsm:flex-col space-x-4">

//                   <Pagination
//                     totalPost={reportData.length}
//                     postPerPage={postPerPage}
//                     setCurrentPage={setCurrentPage}
//                     currentPage={currentPage}
//                   />
//                 </div>
//               </div>
//             }

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Usermanagement;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../components/Pagination";
import reportData from "../../utils/reportData";
import "./style.css";
import { FaLock, FaUnlock } from "react-icons/fa6";
import { ViewButton } from "../../components/tableButtons/index";
import { BASE_URL } from "../../app/constants";
import useSWR from "swr";
import Loader from "../../components/loader";
import { MdVerified, MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { blockUserApi, clearUserBlock } from "../../app/features/user/userSlice";
import { toast } from "react-toastify";

const Usermanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [loadingRows, setLoadingRows] = useState({});

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const Currentdata = reportData.slice(firstPostIndex, lastPostIndex);

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

  const { data, isLoading, mutate } = useSWR([`${BASE_URL}admin/getAllUsersList`], fetcherWithToken);
  const userData = data?.data;

  const dispatch = useDispatch();
  const blockHandler = (id) => {
    setLoadingRows((prev) => ({ ...prev, [id]: true }));
    dispatch(
      blockUserApi({
        id: id,
        mutate: mutate,
      })
    );
  };

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "350px",
  };

  const { isLoading: loading, success, message } = useSelector((state) => state.User);

  useEffect(() => {
    if (success === true) {
      setLoadingRows({});
      dispatch(clearUserBlock());
      toast.success(message, { delay: 2200 }, {
        position: "top-right",
      });
    }
    else if (success === null) {
      return;
    }
    else {
      toast.error(message, { delay: 2200 }, {
        position: "top-right",
      });
      dispatch(clearUserBlock());

    }
  }, [loading, success, message]);

  return (
    <div className={`rep-div ${loading ? 'pointer-events-none opacity-50' : ''}`}>
      <Sidebar />
      <Header
        heading="User Management"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-220px)] bg-[#F9F9F9] md:w-full xsm:w-full float-right">
        <div className="animate-div">
          <div className="ml-[60px] m-8 rounded-[11px]">
            <div className="flex justify-between items-center flex-col-reverse md:flex-row gap-3 bg-[#FBF7F4] "></div>
            <div className="overflow-x-scroll lg:overflow-auto">
              <table className="w-full mt-10">
                <thead>
                  <tr className="w-72 h-20 border-b-2 border-[#EEEEEE] text-[#B5B7C0] font-500">
                    <th className="text-start text-[#464F60] px-6">#</th>
                    <th className="text-start text-[#464F60] px-6">NAME</th>
                    <th className="text-start text-[#464F60] px-6">EMAIL</th>
                    <th className="text-start text-[16px] text-[#464F60] ">
                      NO OF GROUPS
                    </th>
                    <th className="text-start text-[16px] text-[#464F60] ">
                      NO OF POSTS
                    </th>
                    <th className="text-center text-[#464F60] px-6">
                      VERIFICATION
                    </th>
                    <th className="text-start text-[#464F60] px-6">STATUS</th>
                    <th className="text-start text-[#464F60] px-6">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {userData && userData.map((item, index) => (
                    <tr
                      className="border-b-2 h-20 cursor-pointer font-semibold text-[#464F60]"
                      key={item._id}
                    >
                      <td className="text-start text-sm px-6">{index + 1}</td>
                      <td className="text-start text-sm px-6">
                        <p>{item.fullname}</p>
                      </td>
                      <td className="text-start text-sm px-6">{item.email}</td>
                      <td className="text-start text-sm px-6">{item.groups}</td>
                      <td className="text-start text-sm px-6">{item.post}</td>
                      <td className="text-center text-sm px-6 py-8">
                        {item.verified ? <MdVerified size={22} color="#3ea4f0" /> : <MdCancel size={22} color="#ff0000" />}
                      </td>
                      <td className="text-center text-sm">
                        <div className="group text-sm">
                          {loadingRows[item._id] ? (
                            <div className=" flex justify-center items-center">
                              <Loader />
                            </div>
                          )
                            : <p
                              className={`w-[100px] text-center cursor-pointer py-2 rounded-md border ${item.isBlocked
                                ? "text-[#fff] bg-inactiveBtn"
                                : "text-[#fff] bg-activeBtn"
                                }`}
                            >
                              {item.isBlocked ? "Inactive" : "Active"}
                            </p>}

                        </div>
                      </td>
                      <td className="text-sm relative">
                        {/* {loadingRows[item._id] ? (
                          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
                            <Loader />
                          </div>
                        ) : ( */}
                        <div className="flex gap-[7px] items-center justify-center relative z-10">
                          <Link to={`/usermanagement/userdetails/${item._id}`}>
                            <ViewButton />
                          </Link>
                          {item.isBlocked ? (
                            <FaUnlock
                              onClick={() => blockHandler(item._id)}
                              className="text-[#ff0000] hover:text-[#070029] transition-all"
                              size={22}
                            />
                          ) : (
                            <FaLock
                              onClick={() => blockHandler(item._id)}
                              className="text-[#ff0000] hover:text-[#070029]"
                              size={22}
                            />
                          )}
                        </div>
                        {/* )} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {

            }
            {isLoading ? (
              <Loader loaderStyle={loaderStyle} />
            ) : (
              <div className="mt-10 flex justify-between items-center flex-col gap-3 md:flex-row text-[11px]">
                <p className="pl-4 text-[#687182] text-[14px]">
                  {firstPostIndex + 1}-{lastPostIndex} of {reportData.length}
                </p>
                <div className="flex sm:flex-row xsm:flex-col space-x-4">
                  <Pagination
                    totalPost={reportData.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usermanagement;
