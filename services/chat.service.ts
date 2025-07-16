import axios from "axios";
import { CreateOrUpdateChatResource, Message } from "@/types/chat.types";

const NEXT_PUBLIC_API_URL = "http://localhost:5000/v1";

export const getChatResource = async (token: string, id: number) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/chat/resource/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const createOrUpdateChatResource = async (token: string, id: number, request: CreateOrUpdateChatResource) => {
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
