"use client"
import { Suspense } from "react";
import ResetPasswordForm from "@/components/resetPassword/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}

export default ResetPassword
