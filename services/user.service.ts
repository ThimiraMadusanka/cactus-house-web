import axios from "axios";
import { CreateUser, ResetPasswordUser, UpdateUser } from "@/types/user.types";

const MAIN_API_URL = process.env.REACT_APP_API_BASE_URL;

export const getUsers = async (token: string, page: number, size: number, status?: string) => {
    const response = await axios.get(`${MAIN_API_URL}/user?page=${page}&size=${size}${status ? "&status=" + status : ""}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
} 

export const getUserById = async (token: string, id: number) => {
    const response = await axios.get(`${MAIN_API_URL}/user/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
} 

export const createUser = async (token: string, request: CreateUser) => {
    const response = await axios.post(`${MAIN_API_URL}/user`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const updateUser = async (token: string, id: number, request: UpdateUser) => {
    const response = await axios.put(`${MAIN_API_URL}/user/${id}`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const resetPasswordUser = async (token: string, id: number, request: ResetPasswordUser) => {
    const response = await axios.patch(`${MAIN_API_URL}/user/password/${id}`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const userStatusChange = async (token: string, id: number, status: string) => {
    const response = await axios.patch(`${MAIN_API_URL}/user/${id}?status=${status}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const deleteUser = async (token: string, id: number) => {
    const response = await axios.delete(`${MAIN_API_URL}/user/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 
