"use client";
import { store } from "@/states/store";
import React from "react";
import { Provider } from "react-redux";
import DashboardSidebar from "./DashboardSidebar";

const DashboardContent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Provider store={store}>
      <div className="min-h-[100vh] bg-[#f7f7f7] text-black flex">
        <DashboardSidebar />
        <div className="w-full p-3 flex-[5]">{children}</div>
      </div>
    </Provider>
  );
};

export default DashboardContent;
