import {BASE_URL} from "../constants/constants.ts";

/**
 * @deprecated Use apiClient from @/services/api/client.ts instead
 * This function is kept for backward compatibility
 */
export const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options?.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: 'include',
        ...options,
        headers,
    });

    if (response.status === 401) {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        window.location.href = '/';
        throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({message: 'Ошибка сервера'}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};



