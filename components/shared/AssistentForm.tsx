"use client"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getChatResource, createOrUpdateChatResource } from "@/services/chat.service";
import { CreateOrUpdateChatResource, CreateOrUpdateChatResourceInputValidation } from "@/types/chat.types";

const AssistentForm = () => {
    const [formData, setFormData] = useState<CreateOrUpdateChatResource>({
        description: "",
    });
    const [formValidationErrors, setFormValidationErrors] = useState<Partial<CreateOrUpdateChatResourceInputValidation>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    // Fetch data
    const fetchData = async (token: string) => {
        try {
          const response = await getChatResource(token, 1);
          if (response.status === 200) {
            setFormData({
                description: response.data.description
            })
          }
        } catch (error: any) {
          console.log("Err", error);
        }
    }

    // Input field validation method
    const validate = () => {
        const inputErrors: Partial<CreateOrUpdateChatResourceInputValidation> = {};
        if(formData.description === "") inputErrors.description = "Description is required."
        return inputErrors;
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        if (storedToken) {
            fetchData(storedToken);
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
                if (token !== null) {
                    const response = await createOrUpdateChatResource(token, 1, formData);
                    if (response.status === 200) {
                        // success toast
                        toast.success("Chat resource successfully updated!");
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
            console.log("Error: ", error);
            // toast for error
            toast.error(`${error.response.data ? error.response.message : "Something went wrong. Please check and try again."}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-3">
            <div className="relative w-full mb-3">
                <label id="description" className="leading-7 text-sm text-gray-600">Description <span className='text-red-600'>*</span></label>
                <textarea 
                    id="description" 
                    name="description" 
                    rows={3}
                    className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={formData.description}
                    onChange={(e) => handelOnChange(e)} 
                />
                {formValidationErrors.description && (<p className="text-red-700 mt-2">{formValidationErrors.description}</p>)}
            </div>
            <div className="flex justify-end items-center mt-3">
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

export default AssistentForm