"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createUser } from '@/services/user.service';
import { CreateUser, CreateUserInputValidation } from '@/types/user.types';

type UserAddModalProps = {
    token: string,
    isAddUpdateOrDelete: boolean,
    setIsAddUpdateOrDelete: React.Dispatch<React.SetStateAction<boolean>>,
    openAddUserModal: boolean,
    setOpenAddUserModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const UserAddModal = ({ 
    token, 
    isAddUpdateOrDelete, 
    setIsAddUpdateOrDelete,
    openAddUserModal, 
    setOpenAddUserModal,  
}: UserAddModalProps) => {
    const [formData, setFormData] = useState<CreateUser>({
        name: "",
        email: "",
        password: "",
        contact_number: "",
        billing_address: "",
    });
    const [formValidationErrors, setFormValidationErrors] = useState<Partial<CreateUserInputValidation>>({});
    const [loading, setLoading] = useState<boolean>(false);
    
    // Input field validation method
    const validate = () => {
        const inputErrors: Partial<CreateUserInputValidation> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactNumberRegex = /^07\d{8}$/;
        if(formData.email === "") {
          inputErrors.email = "Email is required."
        } else {
          if (!emailRegex.test(formData.email)) {
            inputErrors.email = "Invalid email."
          }
        }
        if(formData.contact_number === "") {
          inputErrors.contact_number = "Contact number is required."
        } else {
          if (!contactNumberRegex.test(formData.contact_number)) {
            inputErrors.contact_number = "Invalid contact number."
          }
        }
        if(formData.name === "") inputErrors.name = "Name is required."
        if(formData.password === "") inputErrors.password = "Password is required."
        if(formData.billing_address === "") inputErrors.billing_address = "Address is required."
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
            name: "",
            email: "",
            password: "",
            contact_number: "",
            billing_address: "",
        })
    }

    // Form Submit
    const handelSubmit = async () => {
        try {
            setLoading(true);
            const newErrors = validate();
            if(Object.keys(newErrors).length === 0) {
                const response = await createUser(token, formData);
                if (response.status === 201) {
                    // success popup for add user success
                    Swal.fire({
                        title: "Success..!",
                        text: "User add successfully!",
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
                        },
                        buttonsStyling: false,
                    });
                    resetForm();
                    setIsAddUpdateOrDelete(!isAddUpdateOrDelete);
                    setOpenAddUserModal(!openAddUserModal);
                } else {
                    resetForm();
                    setOpenAddUserModal(!openAddUserModal);
                    // error popup for error while add user
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
            setOpenAddUserModal(!openAddUserModal);
            setLoading(false);
            console.log("Sign In error: ", error);
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
                        Add User
                    </h2>
                    <div className="relative mb-3">
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
                    <div className="relative mb-3">
                        <label id="email" className="leading-7 text-sm text-gray-600">Email <span className='text-red-600'>*</span></label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={formData.email}
                            onChange={(e) => handelOnChange(e)} 
                        />
                        {formValidationErrors.email && (<p className="text-red-700 mt-2">{formValidationErrors.email}</p>)}
                    </div>
                    <div className="relative mb-3">
                        <label id="password" className="leading-7 text-sm text-gray-600">Password <span className='text-red-600'>*</span></label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={formData.password}
                            onChange={(e) => handelOnChange(e)} 
                        />
                        {formValidationErrors.password && (<p className="text-red-700 mt-2">{formValidationErrors.password}</p>)}
                    </div>
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
                        <label id="billing_address" className="leading-7 text-sm text-gray-600">Address <span className='text-red-600'>*</span></label>
                        <input 
                            type="text" 
                            id="billing_address" 
                            name="billing_address" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={formData.billing_address}
                            onChange={(e) => handelOnChange(e)} 
                        />
                        {formValidationErrors.billing_address && (<p className="text-red-700 mt-2">{formValidationErrors.billing_address}</p>)}
                    </div>
                    <div className="flex justify-end items-center mt-3">
                        <button 
                            type="button"
                            disabled={loading}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md cursor-pointer" 
                            onClick={() => setOpenAddUserModal(!openAddUserModal)}
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

export default UserAddModal