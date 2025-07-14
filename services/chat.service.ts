import axios from "axios";
import { CreateChatResource, Message, UpdateChatResource } from "@/types/chat.types";

const NEXT_PUBLIC_API_URL = "http://localhost:5000/v1";

export const getChatResource = async (token: string, id: number) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/chat/resource/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
}

export const createChatResource = async (token: string, request: CreateChatResource) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/chat/resource`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const updateChatResource = async (token: string, id: number, request: UpdateChatResource) => {
    const response = await axios.put(`${NEXT_PUBLIC_API_URL}/chat/resource/${id}`, request,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const getMessages = async () => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/chat/messages`);
    return response.data;
}

export const message = async (request: Message) => {
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/chat/message`, request);
    return response;
}
