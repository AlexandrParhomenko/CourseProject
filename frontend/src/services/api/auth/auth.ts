import type {LoginDto, Registration, User, UserRole} from "@/types/types.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const authApi = {
    login: async (data: LoginDto): Promise<User> => {
        return apiClient.post<User>('/auth/login', data);
    },
    register: async (data: Registration): Promise<Registration> => {
        return apiClient.post<Registration>('/auth/registration', data);
    },
    getUserRoles: async (user_id?: number): Promise<UserRole[]> => {
        if (!user_id) {
            throw new Error('User ID is required');
        }
        return apiClient.get<UserRole[]>(`/users_roles/${user_id}`);
    }
};

export const useRegister = () => {
    return useMutation<Omit<Registration, "hash_password">, Error, Registration>({
        mutationFn: (user) => authApi.register(user),
    });
};

export const useLogin = () => {
    return useMutation<User, Error, LoginDto>({
        mutationFn: (user) => authApi.login(user),
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