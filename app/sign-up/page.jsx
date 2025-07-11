import AuthLayout from "@components/layout/AuthLayout"
import { BsFillTelephoneFill } from "@node_modules/react-icons/bs"
import { FaEnvelope, FaLock, FaUser } from "@node_modules/react-icons/fa"

const SignUp = () => {
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
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="auth_input"
                />
              </div>
               <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="email"
                  placeholder="Email"
                  className="auth_input"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="password"
                  placeholder="Password"
                  className="auth_input"
                />
              </div>
               <div className="relative">
                <BsFillTelephoneFill className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="auth_input"
                />
              </div>
               <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="text"
                  placeholder="Address"
                  className="auth_input"
                />
              </div>
              <button className="w-full py-3 lime_btn_auth">
                Sign Up
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
