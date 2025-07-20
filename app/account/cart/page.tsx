"use client"

import CheckoutModal from "@/components/modal/CheckoutModal";
import { getAllCartItemsByUserId, removeFromCart } from "@/services/cart.service";
import { CartTableData } from "@/types/cart.types";
import { CartProduct } from "@/types/order.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState<CartTableData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [netTotal, setNetTotal] = useState<number>(0);
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState<boolean>(false);
  const [productList, setProductList] = useState<CartProduct[]>([]);

  const router = useRouter();

  // fetch data
  const fetchCartData = async (token: string, userRid: number) => {
    try {
      setIsLoading(true);
      const response = await getAllCartItemsByUserId(token, userRid);
      if (response.status === 200) {
        const cartData = response.data;
        setData(cartData);
        let total: number = 0;
        let list: any[] = [];
        cartData.forEach((item: CartTableData) => {
          list.push({
            id: item.product_id,
            cart_id: item.id,
            name: item.product_name,
            image: item.product_image_url,
            price: item.product_price,
            amount: item.amount
          });
          total = total + (Number(item.amount) * (Number(item.product_price)))
        });
        setProductList(list);
        setNetTotal(total);
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
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const userData = JSON.parse(user);
      fetchCartData(token, userData.id);
      setIsError(false);
      setData([]);
      setToken(token);
      setUserId(userData.id)
    } else {
      router.push('/');
      toast.error("Someting went wrong!");
    }
  }, [isChanged]);

  const removeItemsOnCart = async (id: number) => {
    try {
      if(token) {
        const response = await removeFromCart(token, id);
        if (response.status === 204) {
          // success toast for remove item success
          toast.success("Item successfully removed");
          setIsChanged(!isChanged);
        } else {
          // error toast for error while remove item
          toast.error("Something went wrong. Please check and try again.")
        }
      } else {
        //No user found
        toast.error("User not found");
      }
    } catch (error: any) {
      // error toast for error
      toast.error(`${error.response.data ? error.response.data : "Something went wrong. Please check and try again."}`)
    }
  }

  return (
   <div className="bg-white rounded-md">
      <div className="p-5">
         <div className="flex justify-between items-center pb-3 border-b border-gray-500">
          <h1 className="font-extrabold page_title">Cart</h1>
          <button 
            type="button" 
            className="border rounded-md text-white bg-lime-800 hover:bg-lime-600 py-1.5 px-5 text-sm"
            onClick={() => router.push('/our-plants')}
          >
            Add Items
          </button>
        </div>
        <div className="pt-5">
          <div className="overflow-hidden ">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Index </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Item </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Amount </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Price </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Actions </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 ">
                {/* For loading data */}
                {isLoading && (
                  <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                    <td colSpan={5} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* For Error */}
                {isError && (
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={5} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Something went wrong!</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && data.length === 0 ? (
                // Inform when there is no data
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={5} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <h5 className="fw-bold mb-0">Add items to cart.</h5>
                  </td>
                </tr>
              ) : (
                <>
                  {data.map((item, i) => {
                    return (
                      <tr key={i} className="bg-white transition-all duration-500 hover:bg-gray-50">
                        <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{i + 1}</td>
                        <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          <div className="flex items-center gap-5">
                            <Image
                              src={item.product_image_url}
                              alt="product"
                              className="object-cover rounded-xl" 
                              width={75}
                              height={75}
                            />
                            <p>{item.product_name}</p>
                          </div>
                        </td>
                        <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.amount}</td>
                        <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{Number(item.amount) * Number(item.product_price)}</td>
                        <td className="p-5">
                          <div className="flex justify-center items-center gap-1">
                            <button className="p-2 rounded-full  group transition-all duration-500  flex item-center cursor-pointer" onClick={() => removeItemsOnCart(item.id)}>
                              <FaTrash className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="transition-all duration-500 bg-gray-50">
                    <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900" colSpan={3}>Net Total</td>
                    <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{netTotal}</td>
                    <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      <button 
                        type="button"
                        onClick={() => {
                          setOpenCheckoutModal(!openCheckoutModal);
                        }}
                        className="bg-lime-800 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded text-sm cursor-pointer"
                      >
                        Checkout
                      </button>
                    </td>
                  </tr>
                </>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Open Checkout Modal */}
      {openCheckoutModal && (
        <CheckoutModal 
          token={token}
          userId={userId}
          productList={productList}
          totalAmount={netTotal}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          openCheckoutModal={openCheckoutModal}
          setOpenCheckoutModal={setOpenCheckoutModal}
        />
      )}
    </div>
  )
}

export default Cart
