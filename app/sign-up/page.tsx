"use client"
import { useState } from "react"
import { BsFillTelephoneFill } from "react-icons/bs"
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthLayout from "@/components/layout/AuthLayout"
import { SignUpInputValidation } from "@/types/auth.types"
import { signUp } from "@/services/auth.service"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    billing_address: "",
  });
  const [formValidationErrors, setFormValidationErrors] = useState<Partial<SignUpInputValidation>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Input field validation method
  const validate = () => {
    const inputErrors: Partial<SignUpInputValidation> = {};
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
    if(formData.name === "") inputErrors.name = "Full name is required."
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

  // Form Submit
  const handelSubmit = async () => {
    try {
      setLoading(true);
      const newErrors = validate();
      if(Object.keys(newErrors).length === 0) {
        const response = await signUp(formData);
        if (response.status === 201) {
            router.push('/sign-in');
            toast.success("Successfully account created!");
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        setFormValidationErrors(newErrors);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Sign In error: ", error);
      toast.error(error.response.data.message);
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
              src="https://images.unsplash.com/photo-1650829683733-ba6be0bf2fb2?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sign Up"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center p-12 bg-white">
            <h2 className="text-4xl font-extrabold text-lime-800 mb-10 text-center">Create an Account</h2>
            <form className="space-y-6">
              <div>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="auth_input"
                    value={formData.name}
                    onChange={(e) => handelOnChange(e)}
                  />
                </div>
                {formValidationErrors.name && (<p className="text-red-700 mt-2">{formValidationErrors.name}</p>)}
              </div>
              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    name="email"
                    type="email"
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
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="auth_input"
                    value={formData.password}
                    onChange={(e) => handelOnChange(e)}
                  />
                </div>
                {formValidationErrors.password && (<p className="text-red-700 mt-2">{formValidationErrors.password}</p>)}
              </div>
              <div>
                <div className="relative">
                  <BsFillTelephoneFill className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    name="contact_number"
                    type="text"
                    placeholder="Contact Number"
                    className="auth_input"
                    value={formData.contact_number}
                    onChange={(e) => handelOnChange(e)}
                  />
                </div>
                {formValidationErrors.contact_number && (<p className="text-red-700 mt-2">{formValidationErrors.contact_number}</p>)}
              </div>
              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <input
                    name="billing_address"
                    type="text"
                    placeholder="Address"
                    className="auth_input"
                    value={formData.billing_address}
                    onChange={(e) => handelOnChange(e)}
                  />
                </div>
                {formValidationErrors.billing_address && (<p className="text-red-700 mt-2">{formValidationErrors.billing_address}</p>)}
              </div>
              <button disabled={loading} type="button" className="w-full py-3 lime_btn_auth cursor-pointer" onClick={() => handelSubmit()}>
                {loading ? "..." : "Sign Up"}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already have an account?
                <a href="/sign-in" className="text-lime-700 font-semibold hover:underline ml-1">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
