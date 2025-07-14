"use client"
import React, { useState } from 'react';
import AuthLayout from "@/components/layout/AuthLayout";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { SignInInputValidation } from '@/types/auth.types';
import { signIn } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [formValidationErrors, setFormValidationErrors] = useState<Partial<SignInInputValidation>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Input field validation method
  const validate = () => {
    const inputErrors: Partial<SignInInputValidation> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(formData.email === "") {
      inputErrors.email = "Email is required."
    } else {
      if (!emailRegex.test(formData.email)) {
        inputErrors.email = "Invalid email."
      }
    }
    if(formData.password === "") inputErrors.password = "Password is required."
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
        const response = await signIn(formData);
        if (response.status === 201) {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("user_type", response.data.user.type);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          if (response.data.user.type === "ADMIN") {
            router.push('/admin');
          } else if (response.data.user.type === "USER") {
            router.push('/account');
          } else {
            router.push('/');
            localStorage.clear();
          }
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
              src="https://images.unsplash.com/photo-1543172683-f311a64404fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sign In"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center p-12 bg-white">
            <h2 className="text-4xl font-extrabold text-lime-800 mb-10 text-center">Welcome Back!</h2>
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
              <div>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="auth_input"
                    value={formData.password}
                    onChange={(e) => handelOnChange(e)}
                  />  
                </div>
                {formValidationErrors.password && (<p className="text-red-700 mt-2">{formValidationErrors.password}</p>)}
              </div>
              <div className="flex justify-end">
                <p className="text-gray-600 text-sm">
                  <a href="/forget-password" className="text-lime-700 font-semibold hover:underline ml-1">Forget Password?</a>
                </p>
              </div>
              <button disabled={loading} type="button" className="w-full py-3 lime_btn_auth" onClick={() => handelSubmit()}>
                {loading ? "..." : "Sign In"}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Don't have an account?
                <a href="/sign-up" className="text-lime-700 font-semibold hover:underline ml-1">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignIn
