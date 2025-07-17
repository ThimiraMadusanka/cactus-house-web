import { FaClock, FaShoppingCart, FaTimesCircle, FaTruck, FaUser } from "react-icons/fa";
import dynamic from "next/dynamic";
import DashboardCard from "@/components/shared/DashboardCard";

// Dynamically import with SSR off
const BarChart = dynamic(() => import("@/components/shared/BarChart"));

const Account = () => {
  return (
    <div>
      <div className="px-9 mt-3">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-8">          
        <DashboardCard 
          title="Pending"
          number="01"
          numberColor="text-lime-900"
          iconBackgroundColor="bg-lime-900"
          icon={<FaClock size={20} color="#fff" />}
        />
        <DashboardCard 
          title="Delivered"
          number="10"
          numberColor="text-lime-800"
          iconBackgroundColor="bg-lime-800"
          icon={<FaTruck size={20} color="#fff" />}
        />
        <DashboardCard 
          title="Rejected"
          number="01"
          numberColor="text-lime-700"
          iconBackgroundColor="bg-lime-700"
          icon={<FaTimesCircle size={20} color="#fff" />}
        />
        <DashboardCard 
          title="Cart"
          number="05"
          numberColor="text-lime-600"
          iconBackgroundColor="bg-lime-600"
          icon={<FaShoppingCart size={20} color="#fff" />}
        />
      </div>
      <div className="bg-white mx-9 mt-4 mb-9 p-10 rounded-lg shadow-md h-[400px]">
        <BarChart />
      </div>
    </div>
  )
}

export default Account
