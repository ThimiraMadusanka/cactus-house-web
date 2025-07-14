"use client"
import React, { useState } from 'react';
import AuthLayout from "@/components/layout/AuthLayout"
import { FaEnvelope } from "react-icons/fa"
import { useRouter } from 'next/navigation';
import { ForgetPasswordInputValidation } from '@/types/auth.types';
import { toast } from 'react-toastify';
import { forgetPassword } from '@/services/auth.service';

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: ""
  });
  const [formValidationErrors, setFormValidationErrors] = useState<Partial<ForgetPasswordInputValidation>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Input field validation method
  const validate = () => {
    const inputErrors: Partial<ForgetPasswordInputValidation> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(formData.email === "") {
      inputErrors.email = "Email is required."
    } else {
      if (!emailRegex.test(formData.email)) {
        inputErrors.email = "Invalid email."
      }
    }
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

  // Form Submit
  const handelSubmit = async () => {
    try {
      setLoading(true);
      const newErrors = validate();
      if(Object.keys(newErrors).length === 0) {
        const response = await forgetPassword(formData);
        if (response.status === 201) {
          router.push(`/reset-password?token=${response.data.access_token}`);
        } else {
          toast.error("Something went wrong!")
        }
      } else {
        setFormValidationErrors(newErrors);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Sign In error: ", error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#EFFAEC]">
        <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-screen-xl w-full mx-4 min-h-[600px]">
          <div className="md:w-1/2 w-full">
            <img
              src="https://images.unsplash.com/photo-1656495616109-304dcd5be8ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Welcome"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center p-12 bg-white">
            <h2 className="text-4xl font-extrabold text-lime-800 mb-4 text-center">Forgot Password?</h2>
            <div className="text-center mb-6">
              <p className="text-gray-600 text-sm">
                Remember your password?
                <a href="/sign-in" className="text-lime-700 font-semibold hover:underline ml-1">Sign In</a>
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="auth_input"
                    value={formData.email}
                    onChange={(e) => handelOnChange(e)}
                  />
                </div>
                {formValidationErrors.email && (<p className="text-red-700 mt-2">{formValidationErrors.email}</p>)}
              </div>
              <button disabled={loading} type="button" className="w-full py-3 lime_btn_auth cursor-pointer" onClick={() => handelSubmit()}>
                {loading ? "..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgetPassword
