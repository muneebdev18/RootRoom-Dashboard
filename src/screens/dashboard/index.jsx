import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectScreenSize } from "../../features/screenSize";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import "./style.css";
import StackedBarChart from "../../components/barsChart";
import useSWR from "swr";
import { BASE_URL } from "../../app/constants";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import { MdSupervisedUserCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import {ViewButton} from '../../components/tableButtons'
const Dashboard = () => {
  const screensize = useSelector(selectScreenSize);

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "290px"
  };
  // --------- GET Dashboard Api --------

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
  const { data, isLoading, error } = useSWR(
    [`${BASE_URL}admin/dashboardCounts`],
    fetcherWithToken
  );
  const dashboardCounts = data?.data;
  const dashboarddata = [
    {
      heading: "No Of Users",
      subheading: "Won from 18 Deals",
      icon: (
        <MdSupervisedUserCircle
          style={{ fontSize: "40px", paddingTop: "10px", color: "#04A7EA" }}
        />
      ),
      total: dashboardCounts?.totalUsers,
    },
    {
      heading: "No of Verified User",
      subheading: "Daily average income",
      icon: (
        <FaUserCheck
          style={{ fontSize: "34px", paddingTop: "10px", color: "#06d001" }}
        />
      ),
      total: dashboardCounts?.verifiedUser,
    },
    {
      heading: "No of Unverified User",
      subheading: "Lead coversation",
      icon: (
        <FaUserAltSlash
          style={{ fontSize: "32px", paddingTop: "10px", color: "#FF0000" }}
        />
      ),
      total: dashboardCounts?.notVerifiedUser,
    },
    {
      heading: "No of Groups",
      subheading: "Won from 18 Deals",
      icon: (
        <FaPeopleGroup
          style={{ fontSize: "40px", paddingTop: "10px", color: "#070029" }}
        />
      ),
      total: dashboardCounts?.totalGroups,
    },
    {
      heading: "No of Posts",
      subheading: "Daily average income",
      icon: (
        <IoBook
          style={{ fontSize: "40px", paddingTop: "10px", color: "#F9837C" }}
        />
      ),
      total: dashboardCounts?.totalPosts,
    },
  ];

  //  --------- Group Table API ---------
  const { data: groupTable, isLoading: gLoading } = useSWR(
    [`${BASE_URL}admin/getPopularGroups`],
    fetcherWithToken
  );
  // -------- User Table API --------

  const { data: userTable, isLoading: userLoading } = useSWR(
    [`${BASE_URL}admin/getUsersWhosePostsCountGreater`],
    fetcherWithToken
  );

  //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="dash-div ">
      <Sidebar />
      <Header
        heading="Dashboard"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-280px)]  md:w-full sm:w-full xsm:w-full float-right pt-16">
        <div
          className={`flex sm:flex-row xsm:flex-col ${screensize < 1025 && "pl-4"
            } justify-between`}
        ></div>
        <div
          className={`grid sm:grid-cols-3 xsm:grid-cols-1 gap-4   ${screensize > 1024 ? "pr-4" : "px-4"
            }`}
        >
          {dashboarddata &&
            dashboarddata.map((item, index) => {
              return (
                <Link to={item?.heading === 'No Of Users' ? "/usermanagement" : item.heading === "No of Groups" ? "/groupmanagement" : item.heading === 'No of Posts' ? '/groupmanagement': item.heading === 'No of Unverified User' || 'No of Verified User' ?  '/usermanagement':''}>
                  <div

                    key={index}
                    className="flex cursor-pointer flex-col overflow-hidden cardContainer bg-white pb-[29px] rounded-xl 2xl:px-6 xl:px-[15px] lg:px-2 md:px-6 sm:px-4 xsm:px-2 pt-[31px]"
                  >
                    <div className="flex flex-row w-full gap-11 justify-between">
                      <h1 className="font-semibold 2xl:text-[28px] xl:text-[22px] md:text-[28px] sm:text-[18px] xsm:text-[16px] text-[#202020]">
                        {item.heading}
                      </h1>
                      {item.icon}
                    </div>
                    {isLoading ? (
                      <div role="status" class="max-w-sm animate-pulse">
                        <div class="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-[50px] mt-4 "></div>
                      </div>
                    ) : (
                      <h3
                        className={`text-[26px] mt-1 font-semibold  text-[#000000] ${screensize < 768 && "text-[25px]"
                          }`}
                      >
                        {item.total}
                      </h3>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
        {isLoading ? (
          <>
            <div
              role="status"
              class="w-full my-[80px] p-[60px] border  rounded shadow animate-pulse md:p-6"
            >
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
              <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div class="flex items-baseline mt-4">
                <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                {/* <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div> */}
              </div>
              <span class="sr-only">Loading...</span>
            </div>
          </>
        ) : (
          <div className={`chart-line  ${screensize < 1025 && "ml-4"}`}>
            <StackedBarChart />
          </div>
        )}
        <div className="grid grid-cols-2  py-4 gap-7 my-5 mr-6 justify-center">
          {/* -------- Groups Table --------- */}
          {
            gLoading ? <Loader loaderStyle={loaderStyle} /> : <div className="overflow-x-auto  px-6 pb-9 pt-5 cardContainer rounded-xl bg-white">
              <h1 className="text-xl font-semibold my-3">Popular Groups</h1>
              <div className="mx-auto shadow-xl rounded-lg overflow-hidden border border-gray-300">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
                      <th className="py-3 px-4 border-b font-medium">S#</th>
                      <th className="py-3 px-4 text-center border-b font-medium">Group Name</th>
                      <th className="py-3 px-4 text-center border-b font-medium">Members</th>
                      <th className="py-3 px-4 text-center border-b font-medium">No of Posts</th>
                      <th className="py-3 px-4 border-b text-center font-medium">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupTable?.data?.map((row, index) => (
                      <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 text-center px-4 border-b">{row?.name}</td>
                        <td className="py-2 text-center px-4 border-b">{row?.membersCount}</td>
                        <td className="py-2 text-center px-4 border-b">{row?.postsCount}</td>
                        <td className="py-2 px-4 text-center border-b"><Link to={`/groupmanagement/groupdetails/${row?._id}`}><ViewButton/></Link></td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }

          {/* -------- User Table --------- */}
          {
            userLoading ? <Loader loaderStyle={loaderStyle} /> : <div className="overflow-x-auto  px-6 pb-9 pt-5 cardContainer rounded-xl bg-white">
              <h1 className="text-xl font-semibold my-3">Popular User</h1>

              <div className="mx-auto shadow-xl rounded-lg overflow-hidden border ">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
                      <th className="py-3 px-4 border-b font-medium">S#</th>
                      <th className="py-3 px-4 text-center border-b font-medium">User Name</th>
                      <th className="py-3 px-4 border-b text-center font-medium">No of Posts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTable?.data?.map((row, index) => (
                      <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 text-center border-b">{row?.user?.fullname}</td>
                        <td className="py-2 px-4 border-b text-center">{row?.postCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }

        </div>
      </div>
    </div>

    // </div>
  );
};

export default Dashboard;
