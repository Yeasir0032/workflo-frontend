"use client";
import DashboardColumns from "@/components/DashboardColumns";
import DashboardDrawer from "@/components/DashboardDrawer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardMenus from "@/components/DashboardMenus";
import LoadingScreen from "@/components/LoadingScreen";
import { RootState } from "@/states/store";
import React from "react";
import { useSelector } from "react-redux";
const DashboardPage = () => {
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <div>
      <DashboardHeader />
      <DashboardMenus />
      <DashboardColumns />
      {isOpen && <DashboardDrawer />}
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default DashboardPage;
