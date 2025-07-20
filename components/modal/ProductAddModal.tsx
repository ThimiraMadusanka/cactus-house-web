"use client"
import { createProduct } from '@/services/product.service';
import { CreateProduct, ProductInputValidation } from '@/types/product.types';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import base64 from "base64-encode-file";

type ProductAddModalProps = {
    token: string,
    isAddUpdateOrDelete: boolean,
    setIsAddUpdateOrDelete: React.Dispatch<React.SetStateAction<boolean>>,
    openAddProductModal: boolean,
    setOpenAddProductModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const ProductAddModal = ({ 
    token, 
    isAddUpdateOrDelete, 
    setIsAddUpdateOrDelete,
    openAddProductModal, 
    setOpenAddProductModal,  
}: ProductAddModalProps) => {
    const [formData, setFormData] = useState<CreateProduct>({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        file_content: "",
        file_name: "",
        content_type: "",
        tags: "",
    });
    const [formValidationErrors, setFormValidationErrors] = useState<Partial<ProductInputValidation>>({});
    const [loading, setLoading] = useState<boolean>(false);
    
    // Input field validation method
    const validate = () => {
        const inputErrors: Partial<ProductInputValidation> = {};
        if(formData.name === "") inputErrors.name = "Name is required."
        if(formData.description === "") inputErrors.description = "Description is required."
        if (formData.price === 0) {
            inputErrors.price = "Price is required.";
        } else if (formData.price < 0) {
            inputErrors.price = "Invalid price.";
        }
        if (formData.quantity === 0) {
            inputErrors.quantity = "Quantity is required.";
        } else if (formData.quantity < 0) {
            inputErrors.quantity = "Invalid quantity.";
        }
        if(formData.file_content === "" && formData.file_name === "" && formData.content_type === "") inputErrors.image = "Image is required."
        if(formData.tags === "") inputErrors.tags = "Tags are required."
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

    // Image input onChange
    const handelImageOnChange = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const fileToBase64String: any = await base64(file);
        setFormData(prev => ({
            ...prev,
            file_name: file.name,
            file_content: file.type,
            content_type: fileToBase64String.split(",")[1],
        }))
    }

    // Form reset
    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            file_content: "",
            file_name: "",
            content_type: "",
            tags: "",
        })
    }

    // Form Submit
    const handelSubmit = async () => {
        try {
            setLoading(true);
            const newErrors = validate();
            if(Object.keys(newErrors).length === 0) {
                const formObj = {
                    ...formData,
                    price: formData.price.toString(),
                    quantity: Number(formData.quantity),
                    tags: formData.tags.split(",").map(item => item.trim())
                }
                const response = await createProduct(token, formObj);
                if (response.status === 201) {
                    // success popup for add product success
                    Swal.fire({
                        title: "Success..!",
                        text: "Product add successfully!",
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
                        },
                        buttonsStyling: false,
                    });
                    resetForm();
                    setIsAddUpdateOrDelete(!isAddUpdateOrDelete);
                    setOpenAddProductModal(!openAddProductModal);
                } else {
                    resetForm();
                    setOpenAddProductModal(!openAddProductModal);
                    // error popup for error while add product
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
            setOpenAddProductModal(!openAddProductModal);
            setLoading(false);
            console.log("Sign In error: ", error);
            // error popup for error
            Swal.fire({
                title: "Ooops..!",
                text: `${
                    error.response.data.message
                    ? error.response.data.message
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
            <div className="relative max-w-2xl w-full border rounded-lg">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                    <h2 className="font-semibold text-gray-800 mb-3" style={{ fontSize: "18px"}}>
                        Add Product
                    </h2>
                    <div className="flex gap-2 w-full">
                        <div className="relative mb-3 w-full">
                            <label id="name" className="leading-7 text-sm text-gray-600">Name <span className='text-red-600'>*</span></label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={formData.name}
                                onChange={(e) => handelOnChange(e)} 
                            />
                            {formValidationErrors.name && (<p className="text-red-700 mt-2">{formValidationErrors.name}</p>)}
                        </div>
                        <div className="relative mb-3 w-full">
                            <label id="image" className="leading-7 text-sm text-gray-600">Image <span className='text-red-600'>*</span></label>
                            <input 
                                type="file" 
                                id="image" 
                                accept=".jpg,.jpeg,.png"
                                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={(e) => handelImageOnChange(e)} 
                            />
                            {formValidationErrors.image && (<p className="text-red-700 mt-2">{formValidationErrors.image}</p>)}
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="relative mb-3 w-full">
                            <label id="price" className="leading-7 text-sm text-gray-600">Price <span className='text-red-600'>*</span></label>
                            <input 
                                type="number" 
                                id="price" 
                                name="price"
                                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={formData.price}
                                onChange={(e) => handelOnChange(e)} 
                            />
                            {formValidationErrors.price && (<p className="text-red-700 mt-2">{formValidationErrors.price}</p>)}
                        </div>
                        <div className="relative mb-3 w-full">
                            <label id="quantity" className="leading-7 text-sm text-gray-600">Quantity <span className='text-red-600'>*</span></label>
                            <input 
                                type="number" 
                                id="quantity" 
                                name="quantity"
                                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={formData.quantity}
                                onChange={(e) => handelOnChange(e)} 
                            />
                            {formValidationErrors.quantity && (<p className="text-red-700 mt-2">{formValidationErrors.quantity}</p>)}
                        </div>
                    </div>
                    <div className="relative mb-3">
                        <label id="description" className="leading-7 text-sm text-gray-600">Description <span className='text-red-600'>*</span></label>
                        <textarea 
                            id="description" 
                            name="description" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={formData.description}
                            onChange={(e) => handelOnChange(e)} 
                        />
                        {formValidationErrors.description && (<p className="text-red-700 mt-2">{formValidationErrors.description}</p>)}
                    </div>
                    <div className="relative mb-3">
                        <label id="tags" className="leading-7 text-sm text-gray-600">Tags <span className='text-red-600'>*</span> (Ex:- tag1, tag2)</label>
                        <input 
                            type="text" 
                            id="tags" 
                            name="tags" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={formData.tags}
                            onChange={(e) => handelOnChange(e)} 
                        />
                        {formValidationErrors.tags && (<p className="text-red-700 mt-2">{formValidationErrors.tags}</p>)}
                    </div>
                    <div className="flex justify-end items-center mt-3">
                        <button 
                            type="button"
                            disabled={loading}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md cursor-pointer" 
                            onClick={() => setOpenAddProductModal(!openAddProductModal)}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            disabled={loading}
                            className="px-4 py-2 ml-2 text-white bg-lime-800 hover:bg-lime-600 text-sm font-medium rounded-md cursor-pointer"
                            onClick={() => handelSubmit()}
                        >
                            {loading ? "Submitting.." : "Add"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductAddModal