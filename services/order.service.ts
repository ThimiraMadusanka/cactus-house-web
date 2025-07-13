import axios from "axios";
import { CreateOrder, UpdateOrder } from "@/types/order.types";

const MAIN_API_URL = process.env.REACT_APP_API_BASE_URL;

export const getOrders = async (token: string, page: number, size: number, status?: string) => {
    const response = await axios.get(`${MAIN_API_URL}/order?page=${page}&size=${size}${status ? "&status=" + status : ""}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
} 

export const getOrdersByUserId = async (token: string, page: number, size: number, user_id: number) => {
    const response = await axios.get(`${MAIN_API_URL}/order?page=${page}&size=${size}&user_id=${user_id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
} 

export const getOrderById = async (token: string, id: number) => {
    const response = await axios.get(`${MAIN_API_URL}/order/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
} 

export const createOrder = async (token: string, request: CreateOrder) => {
    const response = await axios.post(`${MAIN_API_URL}/order`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const updateOrder = async (token: string, id: number, request: UpdateOrder) => {
    const response = await axios.put(`${MAIN_API_URL}/order/${id}`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const orderStatusChange = async (token: string, id: number, status: string) => {
    const response = await axios.patch(`${MAIN_API_URL}/order/${id}?status=${status}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const deleteOrder = async (token: string, id: number) => {
    const response = await axios.delete(`${MAIN_API_URL}/order/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 
