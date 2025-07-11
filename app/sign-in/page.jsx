import AuthLayout from "@components/layout/AuthLayout"
import { FaEnvelope, FaLock } from "@node_modules/react-icons/fa"

const SignIn = () => {
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
              <div className="flex justify-end">
                <p className="text-gray-600 text-sm">
                  <a href="/forget-password" className="text-lime-700 font-semibold hover:underline ml-1">Forget Password?</a>
                </p>
              </div>
              <button className="w-full py-3 lime_btn_auth">
                Sign In
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
