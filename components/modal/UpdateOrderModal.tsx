"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { OrderFormInputValidation, UpdateOrder } from '@/types/order.types';
import { updateOrder } from '@/services/order.service';

type UpdateOrderModalProps = {
    token: string,
    orderId: string,
    order: any,
    isUpdate: boolean,
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    openUpdateDetailsModal: boolean,
    setOpenUpdateDetailsModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const UpdateOrderModal = ({ 
    token, 
    orderId, 
    order,
    isUpdate,
    setIsUpdate,
    openUpdateDetailsModal,
    setOpenUpdateDetailsModal, 
}: UpdateOrderModalProps) => {
    const [formData, setFormData] = useState<UpdateOrder>({
        contact_number: order.contact_number,
        shipping_address: order.shipping_address,
    });
    const [formValidationErrors, setFormValidationErrors] = useState<Partial<OrderFormInputValidation>>({});
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      if(!token && orderId === "") {
        setOpenUpdateDetailsModal(!openUpdateDetailsModal);
      }
    }, [])
    
    // Input field validation method
    const validate = () => {
        const inputErrors: Partial<OrderFormInputValidation> = {};
        const contactNumberRegex = /^07\d{8}$/;
        if(formData.contact_number === "") {
          inputErrors.contact_number = "Contact number is required."
        } else {
          if (!contactNumberRegex.test(formData.contact_number)) {
            inputErrors.contact_number = "Invalid contact number."
          }
        }
        if(formData.shipping_address === "") inputErrors.shipping_address = "Address is required."
        return inputErrors;
      }

    // Method for input onChange 
    const handelOnChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Form reset
    const resetForm = () => {
        setFormData({
            contact_number: "",
            shipping_address: "",
        })
    }

    // Form Submit
    const handelSubmit = async () => {
        try {
            setLoading(true);
            const newErrors = validate();
            if(Object.keys(newErrors).length === 0) {
                const response = await updateOrder(token, order.id, formData);
                if (response.status === 200) {
                    // success popup for add order success
                    Swal.fire({
                        title: "Success..!",
                        text: "Order update successfully!",
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
                        },
                        buttonsStyling: false,
                    });
                    resetForm();
                    setIsUpdate(!isUpdate);
                    setOpenUpdateDetailsModal(!openUpdateDetailsModal);
                } else {
                    resetForm();
                    setOpenUpdateDetailsModal(!openUpdateDetailsModal);
                    // error popup for error while update order
                    Swal.fire({
                        title: "Ooops..!",
                        text: "Something went wrong. Please check and try again.",
                        icon: "error",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
                        },
                        buttonsStyling: false,
                    });
                }
            } else {
                setFormValidationErrors(newErrors);
            }
        } catch (error: any) {
            resetForm();
            setOpenUpdateDetailsModal(!openUpdateDetailsModal);
            setLoading(false);
            console.log("Error: ", error);
            // error popup for error
            Swal.fire({
                title: "Ooops..!",
                text: `${
                    error.response.data
                    ? error.response.data
                    : "Something went wrong. Please check and try again."
                }`,
                icon: "error",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
                },
                buttonsStyling: false,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* backdrop */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* modal */}
            <div className="relative max-w-md w-full border rounded-lg">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                    <h2 className="font-semibold text-gray-800 mb-3" style={{ fontSize: "18px"}}>
                        Update {orderId}
                    </h2>
                    <div className="relative mb-3">
                        <label id="contact_number" className="leading-7 text-sm text-gray-600">Contact Number <span className='text-red-600'>*</span></label>
                        <input 
                            type="text" 
                            id="contact_number" 
                            name="contact_number" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={formData.contact_number}
                            onChange={(e) => handelOnChange(e)} 
                        />
                        {formValidationErrors.contact_number && (<p className="text-red-700 mt-2">{formValidationErrors.contact_number}</p>)}
                    </div>
                    <div className="relative mb-3">
                        <label id="shipping_address" className="leading-7 text-sm text-gray-600">Address <span className='text-red-600'>*</span></label>
                        <input 
                            type="text" 
                            id="shipping_address" 
                            name="shipping_address" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={formData.shipping_address}
                            onChange={(e) => handelOnChange(e)} 
                        />
                        {formValidationErrors.shipping_address && (<p className="text-red-700 mt-2">{formValidationErrors.shipping_address}</p>)}
                    </div>
                    <div className="flex justify-end items-center mt-3">
                        <button 
                            type="button"
                            disabled={loading}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md cursor-pointer" 
                            onClick={() => setOpenUpdateDetailsModal(!openUpdateDetailsModal)}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            disabled={loading}
                            className="px-4 py-2 ml-2 text-white bg-lime-800 hover:bg-lime-600 text-sm font-medium rounded-md cursor-pointer"
                            onClick={() => handelSubmit()}
                        >
                            {loading ? "Submitting.." : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrderModal
