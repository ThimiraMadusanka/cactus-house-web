import axios from "axios";
import { CreateAndUpdateProduct } from "@/types/product.types";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getProducts = async (page: number, size: number, status?: string, name?: string, tag?: string, price?: string) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/products?page=${page}&size=${size}${status ? "&status=" + status : ""}${tag ? "&tag=" + tag : ""}${name ? "&name=" + name : ""}${price ? "&price=" + price : ""}`);
    return response;
} 

export const getProductById = async (id: number) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/products/${id}`);
    return response;
} 

export const createProduct = async (token: string, request: CreateAndUpdateProduct) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/products`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const updateProduct = async (token: string, id: number, request: CreateAndUpdateProduct) => {
    const response = await axios.put(`${NEXT_PUBLIC_API_URL}/products/${id}`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const productStatusChange = async (token: string, id: number, status: string) => {
    const response = await axios.patch(`${NEXT_PUBLIC_API_URL}/products/${id}?status=${status}`, {},
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const deleteProduct = async (token: string, id: number) => {
    const response = await axios.delete(`${NEXT_PUBLIC_API_URL}/products/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 
