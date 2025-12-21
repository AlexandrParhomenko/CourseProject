import {BASE_URL} from "@/constants/constants.ts";

export interface ApiError {
    message: string;
    status?: number;
}

export class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private getAuthToken(): string | null {
        return sessionStorage.getItem("token") || localStorage.getItem("token");
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.getAuthToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            credentials: 'include',
            ...options,
            headers,
        });
        if (response.status === 401) {
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            // Не делаем редирект при ошибке авторизации на странице входа
            if (!endpoint.includes('/auth/login')) {
                window.location.href = '/';
            }
            throw new Error(endpoint === "/auth/login" ? "Неверное имя пользователя и/или пароль" : 'Сессия истекла. Пожалуйста, войдите снова.');
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: `HTTP error! status: ${response.status}`
            }));
            throw {
                message: error.message || `HTTP error! status: ${response.status}`,
                status: response.status,
            };
        }

        return response.json();
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'GET',
        });
    }

    async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'DELETE',
        });
    }
}

export const apiClient = new ApiClient(BASE_URL);

