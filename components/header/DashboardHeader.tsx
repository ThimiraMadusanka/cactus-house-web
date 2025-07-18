"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { AuthenticatedUser } from "@/types/auth.types";

type DashboardHeaderProps = {
  toggleSidebar: () => void;
};

const DashboardHeader = ({toggleSidebar}: DashboardHeaderProps) => {
  const [open, setOpen] = useState(false); 
  const [user, setUser] = useState<AuthenticatedUser>({
    name: "",
    email: "",
    contact_number: "",
    billing_address: "",
    type: "ADMIN",
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }  
  }, []);

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
      <div className="flex items-center px-4">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700">
          <LuMenu size={25} />
        </button>
      </div>
      <div className="flex items-center pr-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex gap-2 items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
        >
          <div className="flex flex-col items-end">
            <p style={{ fontSize: "12px" }}>{user.name}</p>
            <p style={{ fontSize: "10px" }}>{user.email}</p>
          </div>
          <FaUserCircle size={30} />
        </button>
      </div>

      {open && (
        <div
          className="absolute right-6 top-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <button
              className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-0"
              onClick={() => {
                router.push('/');
                localStorage.clear();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardHeader