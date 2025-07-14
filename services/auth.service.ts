"use client"
import axios from "axios";
import { ForgetPassword, ResetPassword, SignIn, SignUp } from "@/types/auth.types";

const NEXT_PUBLIC_API_URL = "http://localhost:5000/v1";

export const signIn = async (request: SignIn) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/sign_in`, request);
    return response;
}

export const signUp = async (request: SignUp) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/sign_up`, request);
    return response;
}

export const forgetPassword = async (request: ForgetPassword) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/forget_password`, request);
    return response;
}

export const resetPassword = async (request: ResetPassword) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/reset_password`, request);
    return response;
}
