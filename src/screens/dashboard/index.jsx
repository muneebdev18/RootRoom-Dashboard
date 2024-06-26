import React from "react";
import { useSelector } from "react-redux";
import { BiSolidDownload } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import { selectScreenSize } from "../../features/screenSize";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import SplineGraph from "../../components/splineGraph";
import dashboardData from "../../utils/dashboardData";

import "./style.css";

const Dashboard = () => {
  const screensize = useSelector(selectScreenSize);

  return (
    <div className="dash-div">
      <Sidebar />
      <Header
        heading="Dashboard"
        content="With all of the styling tool options available in today's market"
      />
      <div className="lg:w-[calc(100%-280px)] md:w-full sm:w-full xsm:w-full float-right pt-16">
        <div
          className={`flex sm:flex-row xsm:flex-col ${
            screensize < 1025 && "pl-4"
          } justify-between`}
        >
          <div className="sm:text-left xsm:text-center">
            <h1 className="text-[36px] text-[#202020] font-bold">
              Hi Katie Pena
            </h1>
            <h3 className="text-[14px] text-[#898989] pb-4">
              Welcome back to Enlightened Dashboard
            </h3>
          </div>
        </div>
        <div
          className={`grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1 gap-4 ${
            screensize > 1024 ? "pr-4" : "px-4"
          }`}
        >
          {dashboardData &&
            dashboardData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden w-full bg-white pb-12 rounded-2xl 2xl:px-6 xl:px-6 lg:px-2 md:px-6 sm:px-4 xsm:px-2 pt-[31px]"
                >
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold 2xl:text-[32px] xl:text-[32px] md:text-[32px] sm:text-[18px] xsm:text-[16px] text-[#202020]">
                      {item.heading}
                    </h1>
                    {item.icon}
                  </div>
                  <h3 className="text-[18px] text-[#898989]">
                    {item.subheading}
                  </h3>
                  <div className="flex 2xl:flex-row md:flex-row sm:flex-col xsm:flex-col justify-between pt-6">
                    <span className="pt-2">{item.bar}</span>
                    <h3
                      className={`text-[16px] text-[#898989] ${
                        screensize < 768 && "text-[25px]"
                      }`}
                    >
                      {item.percent}%
                    </h3>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={`chart-line ${screensize < 1025 && "ml-4"}`}>
          <SplineGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
