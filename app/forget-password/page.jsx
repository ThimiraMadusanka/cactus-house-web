import AuthLayout from "@components/layout/AuthLayout"
import { FaEnvelope } from "@node_modules/react-icons/fa"

const ForgetPassword = () => {
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
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="email"
                  placeholder="Email"
                  className="auth_input"
                />
              </div>
              <button className="w-full py-3 lime_btn_auth">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgetPassword
