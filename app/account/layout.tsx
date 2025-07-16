"use client";
import { useEffect, useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import AccessDenied from "@/components/shared/AccessDenied";
import { DotLoader } from "react-spinners";

type AccountRootLayoutProps = {
  children: React.ReactNode;
};

export default function AccountRootLayout({ children }: AccountRootLayoutProps) {
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

    return userType === "USER"? (
        <AccountLayout>
            {children}
        </AccountLayout>
    ) : (
        <AccessDenied />
    );
}