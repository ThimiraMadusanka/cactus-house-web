"use client"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { UpdateUser, UpdateUserInputValidation } from "@/types/user.types";
import { getUserById, resetPasswordUser, updateUser } from "@/services/user.service";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
    const [formData, setFormData] = useState<UpdateUser>({
        name: "",
        contact_number: "",
        billing_address: "",
    });
    const [userId, setUserId] = useState<number>(0);
    const [userEmail, setUserEmail] = useState<string>("");
    const [formValidationErrors, setFormValidationErrors] = useState<Partial<UpdateUserInputValidation>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    const router = useRouter();
    
    // Fetch data
    const fetchData = async (token: string, id: number) => {
        try {
            const response = await getUserById(token, id);
            if (response.status === 200) {
                setFormData({
                    name: response.data.name,
                    contact_number: response.data.contact_number,
                    billing_address: response.data.billing_address,
                })
                setUserEmail(response.data.email);
            }
        } catch (error) {
            console.log("Err", error);
        }
    }

    // Input field validation method
    const validate = () => {
        const inputErrors: Partial<UpdateUserInputValidation> = {};
        const contactNumberRegex = /^07\d{8}$/;
        if(formData.contact_number === "") {
            inputErrors.contact_number = "Contact number is required."
        } else {
            if (!contactNumberRegex.test(formData.contact_number)) {
                inputErrors.contact_number = "Invalid contact number."
            }
        }
        if(formData.name === "") inputErrors.name = "Full name is required."
        if(formData.billing_address === "") inputErrors.billing_address = "Address is required."
        return inputErrors;
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        setToken(storedToken);
        if (storedUser && storedToken) {
            const user = JSON.parse(storedUser);
            setFormData({
                name: user.name,
                contact_number: user.contact_number,
                billing_address: user.billing_address
            });
            setUserId(user.id);
            fetchData(storedToken, user.id)
        }  
    }, [isAdd]);

    // Method for input onChange 
    const handelOnChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Form Submit
    const handelSubmit = async () => {
        try {
            setLoading(true);
            const newErrors = validate();
            if(Object.keys(newErrors).length === 0) {
                if (userId !== 0 && token !== null) {
                    const response = await updateUser(token, userId, formData);
                    if (response.status === 200) {
                        // success toast
                        toast.success("Profile successfully updated!");
                        setIsAdd(!isAdd);
                    } else {
                        // error toast
                        toast.error("Something went wrong. Please check and try again.");
                    }
                } else {
                    // toast for no found user
                    toast.error("User not found.");
                }
            } else {
                setFormValidationErrors(newErrors);
            }
        } catch (error: any) {
            setLoading(false);
            console.log("Sign In error: ", error);
            // toast for error
            toast.error(`${error.response.data ? error.response.data : "Something went wrong. Please check and try again."}`);
        } finally {
            setLoading(false);
        }
    }

    // handle reset password
    const handleResetPassword = () => {
        Swal.fire({
            title: "Reset Password",
            input: "password",
            inputPlaceholder: "Enter new password",
            confirmButtonText: "Reset Now",
            customClass: {
                confirmButton: "p-1 px-2 bg-green-600 rounded text-white me-2",
                cancelButton: "p-1 px-2 bg-gray-600 rounded text-white",
                title: "text-capitalize pb-3",
            },
            inputAttributes: {
                autocorrect: "off"
            },
            buttonsStyling: false,
            showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            resetPassword(result.value);
          }
        });
      }
    
      // reset password function
      const resetPassword = async (password: string) => {
        try {
            if (userId !== 0 && token !== null) {
                const response = await resetPasswordUser(token, userId, { password: password });
            
                if (response.status === 200) {
                    // success popup for password reset success
                    Swal.fire({
                        title: "Success..!",
                        text: "Password reset successfully!",
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
                        },
                        buttonsStyling: false,
                    });
                    localStorage.clear();
                    router.push('/');
                } else {
                    // error popup for error while password reset
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
                // error popup foruser not found
                Swal.fire({
                    title: "Ooops..!",
                    text: "User not found.",
                    icon: "error",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
                    },
                    buttonsStyling: false,
                });
            }
        } catch (error: any) {
            // error popup for error
            Swal.fire({
                title: "Ooops..!",
                text: `${
                error.response.statusText
                    ? error.response.statusText
                    : "Something went wrong. Please check and try again."
                }`,
                icon: "error",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
                },
                buttonsStyling: false,
            });
        }
    };

    return (
        <div className="mt-3">
            <div className="flex gap-5 flex-row">
                <div className="relative w-full mb-3">
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
                <div className="relative w-full mb-3">
                    <label id="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={userEmail}
                        disabled
                    />
                </div>
            </div>
            <div className="flex gap-5 flex-row">
                <div className="relative w-full mb-3">
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
                <div className="relative w-full mb-3">
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
            </div>
            <div className="flex justify-end items-center mt-3">
                <button 
                    type="button"
                    className="px-4 py-2 ml-2 text-lime-800 bg-lime-200 hover:bg-lime-100 text-sm font-medium rounded-md cursor-pointer"
                    onClick={() => handleResetPassword()}
                >
                    Reset Password
                </button>
                <button 
                    type="button"
                    disabled={loading}
                    className="px-4 py-2 ml-2 text-white bg-lime-800 hover:bg-lime-600 text-sm font-medium rounded-md cursor-pointer"
                    onClick={() => handelSubmit()}
                >
                    {loading ? "Updating.." : "Update"}
                </button>
            </div>
        </div>
    )
}

export default ProfileForm