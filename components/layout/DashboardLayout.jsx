"use client"
import { useState } from "react";
import { DashboardHeader } from "@components/header";
import AdminSideBar from "@components/sidebar/AdminSideBar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#EFFAEC]">
      {sidebarOpen && <AdminSideBar />}

      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardHeader
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
