"use client"
import React, { useEffect, useState } from 'react';
import { CartProduct } from '@/types/order.types';
import Image from 'next/image';

type OrderItemsModalProps = {
    orderId: string,
    orderItemList: CartProduct[],
    openViewItemsModal: boolean,
    setOpenViewItemsModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const OrderItemsModal = ({ 
    orderId,
    orderItemList,
    openViewItemsModal, 
    setOpenViewItemsModal,  
}: OrderItemsModalProps) => {
    const [items, setItems] = useState<CartProduct[]>([]);

    useEffect(() => {
      if( orderItemList.length !== 0) {
        setItems(orderItemList);
      } else {
        setOpenViewItemsModal(!openViewItemsModal);
      }
    }, [])
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* backdrop */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* modal */}
            <div className="relative max-w-md w-full border rounded-lg">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                    <h2 className="font-semibold text-gray-800 pb-3" style={{ fontSize: "18px"}}>
                        Items of {orderId} 
                    </h2>
                    {items.map((product: any) => {
                        return (
                            <div className="relative border-t border-gray-300 py-5">
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
                                    <p>x</p>
                                    <p>{product.amount}</p>
                                    <p>x</p>
                                    <p>Rs. {Number(product.price) * Number(product.amount)}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex justify-center items-center mt-3">
                        <button 
                            type="button"
                            className="px-4 py-2 bg-lime-800 hover:bg-lime-700 text-white text-sm font-medium rounded-md cursor-pointer" 
                            onClick={() => setOpenViewItemsModal(!openViewItemsModal)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItemsModal