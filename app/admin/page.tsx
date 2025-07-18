"use client"
import { useEffect, useState } from "react";
import { FaUser, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs"
import dynamic from "next/dynamic";
import DashboardCard from "@/components/shared/DashboardCard";
import { AdminSummaryData } from "@/types/summary.types";
import { getAdminSummary } from "@/services/summary.service";
import { DotLoader } from "react-spinners";

// Dynamically import with SSR off
const BarChart = dynamic(() => import("@/components/shared/BarChart"));

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState<AdminSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await getAdminSummary(token);
      if (response.status === 200) {
        setSummaryData(response.data)
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log("Err: ", error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchData(storedToken);
    }  
  }, [])

  return (
    <div>
      <div className="px-9 mt-3">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
      {isLoading && (
        <div className="flex justify-center px-4 mt-10">
          <DotLoader />
        </div>
      )}

      {!isLoading && summaryData !== null && (
        <>
          <div className="grid grid-cols-1 gap-4 px-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-8">          
            <DashboardCard 
              title="Users"
              number={summaryData.user_count}
              numberColor="text-lime-900"
              iconBackgroundColor="bg-lime-900"
              icon={<FaUser size={20} color="#fff" />}
            />
            <DashboardCard 
              title="Products"
              number={summaryData.product_count}
              numberColor="text-lime-800"
              iconBackgroundColor="bg-lime-800"
              icon={<FaBoxOpen size={20} color="#fff" />}
            />
            <DashboardCard 
              title="Orders"
              number={summaryData.order_count}
              numberColor="text-lime-700"
              iconBackgroundColor="bg-lime-700"
              icon={<FaShoppingCart size={20} color="#fff" />}
            />
            <DashboardCard 
              title="Contacts"
              number={summaryData.contact_count}
              numberColor="text-lime-600"
              iconBackgroundColor="bg-lime-600"
              icon={<BsTelephoneFill size={20} color="#fff" />}
            />
          </div>
          <div className="bg-white mx-9 mt-4 mb-0 p-10 rounded-lg shadow-md h-[400px]">
            <BarChart labelSet={summaryData.weekly_summary.days} dataSet={summaryData.weekly_summary.count} />
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
