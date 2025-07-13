"use client"
import { useState } from "react";
import AdminSideBar from "../sidebar/AdminSideBar";
import { DashboardHeader } from "../header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({children} : DashboardLayoutProps) => {
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
