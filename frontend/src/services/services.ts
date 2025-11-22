import {useMutation} from "@tanstack/react-query";
import {BASE_URL} from "../constants/constants.ts";
import type {LoginDto, User} from "@/types/types.ts";

const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({message: 'Ошибка сервера'}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};

// API функции
export const authApi = {
    login: async (data: LoginDto): Promise<User> => {
        return apiRequest<User>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};

export const useLogin = () => {
    return useMutation<User, Error, LoginDto>({
        mutationFn: authApi.login,
    });
};

