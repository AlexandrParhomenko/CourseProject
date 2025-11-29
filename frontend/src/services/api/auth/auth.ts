import type {LoginDto, User, UserRole} from "@/types/types.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const authApi = {
    login: async (data: LoginDto): Promise<User> => {
        return apiClient.post<User>('/auth/login', data);
    },
    getUserRoles: async (user_id?: number): Promise<UserRole[]> => {
        if (!user_id) {
            throw new Error('User ID is required');
        }
        return apiClient.get<UserRole[]>(`/users_roles/${user_id}`);
    }
};

export const useLogin = () => {
    return useMutation<User, Error, LoginDto>({
        mutationFn: authApi.login,
    });
};

export const useGetUserRoles = (user_id: number | undefined) => {
    return useQuery<UserRole[], Error>({
        queryKey: ["roles", user_id],
        queryFn: () => authApi.getUserRoles(user_id),
        enabled: !!user_id,
        retry: false,
    });
};