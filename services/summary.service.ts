import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAdminSummary = async (token: string) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/summary/admin`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}

export const getAccountSummary = async (token: string, user_id: number) => {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/summary/account?user_id=${user_id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response;
}
