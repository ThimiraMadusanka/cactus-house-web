"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateContact, CreateContactInputValidation } from "@/types/contact.types";
import { createContact } from "@/services/contact.service";

const ContactForm = () => {
    const [formData, setFormData] = useState<CreateContact>({
        name: "",
        email: "",
        message: "",
    });
    const [formValidationErrors, setFormValidationErrors] = useState<Partial<CreateContactInputValidation>>({});
    const [loading, setLoading] = useState<boolean>(false);

    // Input field validation method
    const validate = () => {
        const inputErrors: Partial<CreateContactInputValidation> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(formData.email === "") {
            inputErrors.email = "Email is required."
        } else {
            if (!emailRegex.test(formData.email)) {
                inputErrors.email = "Invalid email."
            }
        }
        if(formData.name === "") inputErrors.name = "Full name is required."
        if(formData.message === "") inputErrors.message = "Message is required."
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
            message: "",
        })
    }

    // Form Submit
    const handelSubmit = async () => {
        try {
            setLoading(true);
            const newErrors = validate();
            if(Object.keys(newErrors).length === 0) {
                const response = await createContact(formData);
                if (response.status === 201) {
                    resetForm();
                    toast.success("Successfully send your message!");
                } else {
                    resetForm();
                    toast.error("Something went wrong!");
                }
            } else {
                setFormValidationErrors(newErrors);
            }
        } catch (error: any) {
            resetForm();
            setLoading(false);
            console.log("Sign In error: ", error);
            toast.error(error.response.data.message);
        } finally {
            resetForm();
            setLoading(false);
        }
    }

  return (
    <form className="lg:w-1/3 md:w-1/2  flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        {/* From Title and Sub Title */}
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Got a Question?</h2>
        <p className="leading-relaxed mb-5 text-gray-600">Please share your questions with us.</p>
        {/* Name */}
        <div className="relative mb-4">
            <label id="name" className="leading-7 text-sm text-gray-600">Name</label>
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
        {/* Email */}
        <div className="relative mb-4">
            <label id="email" className="leading-7 text-sm text-gray-600">Email</label>
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
        {/* Message */}
        <div className="relative mb-4">
            <label id="message" className="leading-7 text-sm text-gray-600">Message</label>
            <textarea 
                id="message" 
                name="message" 
                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                value={formData.message}
                onChange={(e) => handelOnChange(e)}
            />
            {formValidationErrors.message && (<p className="text-red-700 mt-2">{formValidationErrors.message}</p>)}
        </div>
        {/* Button */}
        <button disabled={loading} type="button" className="lime_btn py-2 px-6 text-lg" onClick={() => handelSubmit()}>
            {loading ? "Sending.." : "Submit"}
        </button>
    </form>
  )
}

export default ContactForm