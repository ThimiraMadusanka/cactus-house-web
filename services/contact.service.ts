import axios from "axios";
import { CreateContact } from "@/types/contact.types";

const MAIN_API_URL = process.env.REACT_APP_API_BASE_URL;

export const getContacts = async (token: string, page: number, size: number, status?: string) => {
    const response = await axios.get(`${MAIN_API_URL}/contact?page=${page}&size=${size}${status ? "&status=" + status : ""}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
}

export const getContactById = async (token: string, id: number) => {
    const response = await axios.get(`${MAIN_API_URL}/contact/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
}

export const createContact = async (request: CreateContact) => {
    const response = await axios.post(`${MAIN_API_URL}/contact`, request);
    return response;
}

export const contactStatusChange = async (token: string, id: number, status: string) => {
    const response = await axios.patch(`${MAIN_API_URL}/contact/${id}?status=${status}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const deleteContact = async (token: string, id: number) => {
    const response = await axios.delete(`${MAIN_API_URL}/contact/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}
