"use client"
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa"
import AuthLayout from "@/components/layout/AuthLayout"
import { ResetPasswordInputValidation } from "@/types/auth.types";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';
import { resetPassword } from "@/services/auth.service";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [formValidationErrors, setFormValidationErrors] = useState<Partial<ResetPasswordInputValidation>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push("/forget-password");
      toast.error("Something went wrong!")
    }
  }, [])
  
  // Input field validation method
  const validate = () => {
    const inputErrors: Partial<ResetPasswordInputValidation> = {};
    if(formData.new_password === "") inputErrors.new_password = "New password is required."
    if(formData.confirm_password === "") inputErrors.confirm_password = "Confirm password is required."
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
        if (token) {
          const response = await resetPassword(token, formData);
          if (response.status === 200) {
            router.push("/sign-in");
            toast.success("Successfully reset the password!");
          } else {
            router.push("/forget-password");
            toast.error("Something went wrong!")
          }
        } else {
          router.push("/forget-password");
          toast.error("Something went wrong!")
        }
      } else {
        setFormValidationErrors(newErrors);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Sign In error: ", error);
      router.push("/forget-password");
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
              src="https://images.unsplash.com/photo-1681330948383-c30aea588877?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Reset Password"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center p-12 bg-white">
            <h2 className="text-4xl font-extrabold text-lime-800 mb-10 text-center">Reset Password</h2>
            <form className="space-y-6">
              <div>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    className="auth_input"
                    value={formData.new_password}
                    onChange={(e) => handelOnChange(e)}
                  />
                </div>
                {formValidationErrors.new_password && (<p className="text-red-700 mt-2">{formValidationErrors.new_password}</p>)}
              </div>
              <div>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className="auth_input"
                    value={formData.confirm_password}
                    onChange={(e) => handelOnChange(e)}
                  />
                </div>
                {formValidationErrors.confirm_password && (<p className="text-red-700 mt-2">{formValidationErrors.confirm_password}</p>)}
              </div>
              <button disabled={loading} type="button" className="w-full py-3 lime_btn_auth cursor-pointer" onClick={() => handelSubmit()}>
                {loading? "..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword
