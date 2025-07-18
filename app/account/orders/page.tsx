"use client"
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination"
import { OrderTableData } from "@/types/order.types";
import { useRouter } from "next/navigation";
import { getOrdersByUserId } from "@/services/order.service";
import { toast } from "react-toastify";
import { BiDotsVerticalRounded } from "react-icons/bi";
import moment from "moment";

const UserOrders = () => {
  const [data, setData] = useState<OrderTableData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const pageSize = 10;
  const router = useRouter();

  // fetch data
  const fetcOrders = async (token: string, currentPage: number, userId: number) => {
    try {
      setIsLoading(true);
      const response = await getOrdersByUserId(token, currentPage, pageSize, userId);
      if (response.status === 200) {
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.total_count / pageSize));
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.log("Err", error);
    } finally {
      setIsLoading(false);
    }
  }

  // call fetch data function
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      const user = JSON.parse(storedUser);
      fetcOrders(storedToken, currentPage, user.id);
      setIsError(false);
      setData([]);
      setToken(storedToken);
    } else {
      router.push('/');
      toast.error("Someting went wrong!");
    }
  }, [currentPage, isUpdate]);

  // status color handle method
  const handleStatusTextColor = (status: string) => {
    if (status === "PENDING") {
      return "text-amber-600";
    } else if (status === "DELIVERED") {
      return "text-green-500";
    } else if (status === "REJECTED") {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  }

  return (
    <div className="bg-white rounded-md">
      <div className="p-5">
        <div className="pb-3 border-b border-gray-500">
          <h1 className="font-extrabold page_title">Orders</h1>
        </div>
        <div className="pt-5">
          <div className="overflow-hidden ">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Index </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Shipping Address </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Contact Number </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Items Count </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Total Amount </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Status </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Created At </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Actions </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 ">
                {/* For loading data */}
                {isLoading && (
                  <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                    <td colSpan={8} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* For Error */}
                {isError && (
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={8} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Something went wrong!</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && data.length === 0 ? (
                // Inform when there is no data
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={8} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <h5 className="fw-bold mb-0">No orders found.</h5>
                  </td>
                </tr>
              ) : (
                data.map((order, i) => {
                  return (
                    <tr key={i} className="bg-white transition-all duration-500 hover:bg-gray-50">
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{(currentPage - 1) * pageSize + i + 1}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{order.shipping_address}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{order.contact_number}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{order.product_list.length}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{order.total_amount}</td>
                      <td className={`p-5 text-center whitespace-nowrap text-sm leading-6 font-medium ${handleStatusTextColor(order.status)}`}>{order.status}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{moment(order.updated_at).format('ll')}</td>
                      <td className="p-5">
                        <div className="flex justify-center items-center">
                          <button className="p-2  rounded-full  group transition-all duration-500  flex item-center cursor-pointer" onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}>
                            <BiDotsVerticalRounded />
                          </button>
                        </div>

                        {openDropdownIndex === i && (
                          <div
                            className="absolute right-20 w-40 rounded-md shadow-lg bg-white ring-1 ring-white ring-opacity-5"
                          >
                            <div className="py-1 border-b border-gray-300">
                              <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                View Items
                              </button>
                            </div>
                            <div className="py-1 border-b border-gray-300">
                              <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                )}))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserOrders
