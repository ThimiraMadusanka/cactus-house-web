import axios from "axios";
import { ForgetPassword, ResetPassword, SignIn, SignUp } from "@/types/auth.types";

const MAIN_API_URL = process.env.REACT_APP_API_BASE_URL;

export const signIn = async (request: SignIn) => {
    const response = await axios.post(`${MAIN_API_URL}/sign_in`, request);
    return response;
}

export const signUp = async (request: SignUp) => {
    const response = await axios.post(`${MAIN_API_URL}/sign_up`, request);
    return response;
}

export const forgetPassword = async (request: ForgetPassword) => {
    const response = await axios.post(`${MAIN_API_URL}/forget_password`, request);
    return response;
}

export const resetPassword = async (request: ResetPassword) => {
    const response = await axios.post(`${MAIN_API_URL}/reset_password`, request);
    return response;
}
