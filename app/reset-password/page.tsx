import AuthLayout from "@/components/layout/AuthLayout"
import { FaLock } from "react-icons/fa"

const ResetPassword = () => {
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
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="password"
                  placeholder="New Password"
                  className="auth_input"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="auth_input"
                />
              </div>
              <button className="w-full py-3 lime_btn_auth">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword
