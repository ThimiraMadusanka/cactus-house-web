"use client";

import { useState } from "react";
import AccountSideBar from "../sidebar/AccountSideBar";
import AccountHeader from "../header/AccountHeader";

type AccountLayoutProps = {
  children: React.ReactNode;
};

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#EFFAEC]">
      {sidebarOpen && <AccountSideBar />}

      <div className="flex flex-col flex-1 overflow-y-auto">
        <AccountHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
