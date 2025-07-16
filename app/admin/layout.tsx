"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AccessDenied from "@/components/shared/AccessDenied";
import { DotLoader } from "react-spinners";

type DashboardRootLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("user_type");
    setUserType(storedUserType);
  }, []);

  if (userType === null) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#EFFAEC]">
            <DotLoader color="#35530E" />
        </div>
    );
  }

  return userType === "ADMIN" ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <AccessDenied />
  );
}
