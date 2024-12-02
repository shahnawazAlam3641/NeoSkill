import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative  flex min-h-[calc(100vh-3.5rem)] ">
      {sidebarVisible ? (
        <Sidebar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
      ) : null}

      <FaRegArrowAltCircleRight
        onClick={(e) => {
          setSidebarVisible(!sidebarVisible);
        }}
        className={`text-white absolute z-[51] top-2 left-2 w-6 h-6 cursor-pointer hover:bg-white hover:text-richblack-800 rounded-full transition-all duration-200 ${
          sidebarVisible ? "rotate-180" : ""
        }`}
      />

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
