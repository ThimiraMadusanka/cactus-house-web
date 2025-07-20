"use client"
import React, { useEffect } from 'react';

type ProductViewDetailsModalProps = {
    selectedProduct: any,
    openViewDetailsModal: boolean,
    setOpenViewDetailsModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const ProductViewDetailsModal = ({ 
    selectedProduct,
    openViewDetailsModal, 
    setOpenViewDetailsModal, 
}: ProductViewDetailsModalProps) => {

    useEffect(() => {
      if (selectedProduct === null) {
        setOpenViewDetailsModal(!openViewDetailsModal);
      }
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* backdrop */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* modal */}
            <div className="relative max-w-2xl w-full border rounded-lg">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                    <h2 className="font-semibold text-gray-800 mb-3" style={{ fontSize: "18px"}}>
                        View {selectedProduct.name} Details
                    </h2>
                    <div className="relative mb-3">
                        <label id="description" className="leading-7 text-sm text-gray-600">Description :</label>
                        <p>{selectedProduct.description}</p>
                    </div>
                    <div className="relative mb-3">
                        <label id="tags" className="leading-7 text-sm text-gray-600">Tags :</label>
                        <p>{selectedProduct.tags.map((item: any) => `#${item}`).join(' ')}</p>
                    </div>
                    <div className="flex justify-center items-center mt-3">
                        <button 
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md cursor-pointer" 
                            onClick={() => setOpenViewDetailsModal(!openViewDetailsModal)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductViewDetailsModal