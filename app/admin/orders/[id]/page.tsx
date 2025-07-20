"use client"
import React, { useEffect, useState } from 'react';
import { AdminOrderTableData } from '@/types/order.types';
import { useRouter } from 'next/navigation';
import { getOrderById } from '@/services/order.service';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners';
import moment from 'moment';
import Image from 'next/image';

const ViewOrder = ({ params }: { params: Promise<{ id: string }> }) => {
    const [orderData, setOrderData] = useState<AdminOrderTableData | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    
    const { id } = React.use(params);
    const router = useRouter();

    const fetchData = async(token: string, id: number) => {
        try {
            setIsLoading(true);
            const response = await getOrderById(token, id);
            if (response.status === 200) {
                setOrderData(response.data);
            }
        } catch (error: any) {
            setIsLoading(false);
            console.log("Err: ", error);
            router.push('/admin/orders')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // get token
        const storedToken = localStorage.getItem("token");
        // check token and id existence
        if(storedToken && id) {
            fetchData(storedToken, Number(id))
        } else {
            router.push('/our-plants')
        }
    }, [])

    return (
        <div className="bg-white rounded-md">
            {isLoading && (
                <div className="py-20">
                    <DotLoader />
                </div>
            )}

            {!isLoading && orderData !== null && (
                <div className="p-5">
                    <div className="pb-3 border-b border-gray-500">
                        <h1 className="font-extrabold page_title">View {orderData.order_id}</h1>
                    </div>
                    <table className="min-w-full bg-white rounded shadow my-5">
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 bg-gray-50 font-medium">Contact Number :</th>
                                <td className="p-3">{orderData.contact_number}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 bg-gray-50 font-medium">Created At :</th>
                                <td className="p-3">{moment(orderData.created_at).format('ll')}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 bg-gray-50 font-medium">Shipping Address :</th>
                                <td className="p-3">{orderData.shipping_address}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 bg-gray-50 font-medium">Total Amount :</th>
                                <td className="p-3">Rs. {orderData.total_amount}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 bg-gray-50 font-medium">Billing Address :</th>
                                <td className="p-3">{orderData.user_billing_address}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 bg-gray-50 font-medium">User Email :</th>
                                <td className="p-3">{orderData.user_email}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 bg-gray-50 font-medium">User Name :</th>
                                <td className="p-3">{orderData.user_name}</td>
                            </tr>
                            <tr>
                                <th className="text-left flex items-start p-3 bg-gray-50 font-medium">Order Items :</th>
                                <td className="p-3">
                                     {orderData.product_list.map((product: any, i: number) => {
                                        return (
                                            <div className={`relative ${i !== 0 && "border-t border-gray-300"} py-5`}>
                                                <div className="flex items-center gap-5">
                                                    <Image
                                                        src={product.image}
                                                        alt="product"
                                                        className="object-cover rounded-xl" 
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <div>
                                                        <p>{product.name}</p>
                                                        <p>Rs. {product.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ViewOrder
