import { AddToCart } from "@/types/cart.types";
import axios from "axios";

const NEXT_PUBLIC_API_URL = "http://localhost:5000/v1";

export const getAllCartItemsByUserId = async (token: string, page: number, size: number, user_id: number) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/cart/all?page=${page}&size=${size}&user_id=${user_id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
}

export const addToCart = async (token: string, request: AddToCart) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/cart/add`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const removeFromCart = async (token: string, id: number) => {
    const response = await axios.delete(`${NEXT_PUBLIC_API_URL}/cart/remove/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}
