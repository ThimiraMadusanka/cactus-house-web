"use client"
import { useEffect, useState } from "react";
import { FaClock, FaShoppingCart, FaTimesCircle, FaTruck, FaUser } from "react-icons/fa";
import dynamic from "next/dynamic";
import DashboardCard from "@/components/shared/DashboardCard";
import { AccountSummaryData } from "@/types/summary.types";
import { getAccountSummary } from "@/services/summary.service";
import { DotLoader } from "react-spinners";

// Dynamically import with SSR off
const BarChart = dynamic(() => import("@/components/shared/BarChart"));

const Account = () => {
  const [summaryData, setSummaryData] = useState<AccountSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (token: string, userId: number) => {
    try {
      setIsLoading(true);
      const response = await getAccountSummary(token, userId);
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
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      const userId = JSON.parse(storedUser).id;
      fetchData(storedToken, userId);
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
              title="Pending"
              number={summaryData.pending_order_count}
              numberColor="text-lime-900"
              iconBackgroundColor="bg-lime-900"
              icon={<FaClock size={20} color="#fff" />}
            />
            <DashboardCard 
              title="Delivered"
              number={summaryData.delivered_order_count}
              numberColor="text-lime-800"
              iconBackgroundColor="bg-lime-800"
              icon={<FaTruck size={20} color="#fff" />}
            />
            <DashboardCard 
              title="Rejected"
              number={summaryData.rejected_order_count}
              numberColor="text-lime-700"
              iconBackgroundColor="bg-lime-700"
              icon={<FaTimesCircle size={20} color="#fff" />}
            />
            <DashboardCard 
              title="Cart"
              number={summaryData.cart_count}
              numberColor="text-lime-600"
              iconBackgroundColor="bg-lime-600"
              icon={<FaShoppingCart size={20} color="#fff" />}
            />
          </div>
          <div className="bg-white mx-9 mt-4 mb-9 p-10 rounded-lg shadow-md h-[400px]">
            <BarChart labelSet={summaryData.weekly_summary.days} dataSet={summaryData.weekly_summary.count} />
          </div>
        </>
      )}
    </div>
  )
}

export default Account
