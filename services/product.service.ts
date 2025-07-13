import axios from "axios";
import { CreateProduct, UpdateProduct } from "@/types/product.types";

const MAIN_API_URL = process.env.REACT_APP_API_BASE_URL;

export const getProducts = async (page: number, size: number, status?: string, tag?: string, name?: string, price?: string) => {
    const response = await axios.get(`${MAIN_API_URL}/products?page=${page}&size=${size}${status ? "&status=" + status : ""}${tag ? "&tag=" + tag : ""}${name ? "&name=" + name : ""}${price ? "&price=" + price : ""}`);
    return response.data;
} 

export const getProductById = async (id: number) => {
    const response = await axios.get(`${MAIN_API_URL}/products/${id}`);
    return response.data;
} 

export const createProduct = async (token: string, request: CreateProduct) => {
    const response = await axios.post(`${MAIN_API_URL}/products`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const updateProduct = async (token: string, id: number, request: UpdateProduct) => {
    const response = await axios.put(`${MAIN_API_URL}/products/${id}`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const productStatusChange = async (token: string, id: number, status: string) => {
    const response = await axios.patch(`${MAIN_API_URL}/products/${id}?status=${status}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 

export const deleteProduct = async (token: string, id: number) => {
    const response = await axios.delete(`${MAIN_API_URL}/products/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
} 
