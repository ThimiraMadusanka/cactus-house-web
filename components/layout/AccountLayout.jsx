"use client"
import AccountHeader from "@components/header/AccountHeader";
import AccountSideBar from "@components/sidebar/AccountSideBar";
import { useState } from "react";


const AccountLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#EFFAEC]">
      {sidebarOpen && <AccountSideBar />}

      <div className="flex flex-col flex-1 overflow-y-auto">
        <AccountHeader
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
