import axios from "axios";
import { CreateOrder, UpdateOrder } from "@/types/order.types";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getOrders = async (token: string, page: number, size: number, status?: string) => {
    console.log("ENV", process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/order?page=${page}&size=${size}${status ? "&status=" + status : ""}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const getOrdersByUserId = async (token: string, page: number, size: number, user_id: number) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/order/user?page=${page}&size=${size}&user_id=${user_id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const getOrderById = async (token: string, id: number) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/order/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const createOrder = async (token: string, request: CreateOrder) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/order`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const updateOrder = async (token: string, id: number, request: UpdateOrder) => {
    const response = await axios.put(`${NEXT_PUBLIC_API_URL}/order/${id}`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const orderStatusChange = async (token: string, id: number, status: string) => {
    const response = await axios.patch(`${NEXT_PUBLIC_API_URL}/order/${id}?status=${status}`, {},
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const deleteOrder = async (token: string, id: number) => {
    const response = await axios.delete(`${NEXT_PUBLIC_API_URL}/order/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 
