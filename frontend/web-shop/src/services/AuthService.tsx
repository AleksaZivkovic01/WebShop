import api from "./api";

export const loginUser = async (
    userData: {
        username: string;
        password: string;
    }
) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
}

export const registerUser = async (
    userData: {
        username: string;
        email: string;
        password: string;
    }
) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
}