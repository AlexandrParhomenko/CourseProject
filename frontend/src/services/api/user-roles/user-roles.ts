import type {UserRole} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const userRolesApi = {
    getByUserId: async (user_id: number): Promise<UserRole[]> => {
        return apiClient.get<UserRole[]>(`/users_roles/${user_id}`);
    },
    create: async (data: Partial<UserRole>): Promise<UserRole> => {
        return apiClient.post<UserRole>('/users_roles', data);
    },
    update: async (id: number, data: Partial<UserRole>): Promise<UserRole> => {
        return apiClient.put<UserRole>(`/users_roles/${id}`, data);
    },
    delete: async (id: number): Promise<UserRole> => {
        return apiClient.delete<UserRole>(`/users_roles/${id}`);
    }
};

export const useGetUserRolesByUserId = (user_id: number | undefined) => {
    return useQuery<UserRole[], Error>({
        queryKey: ["user-roles", user_id],
        queryFn: () => userRolesApi.getByUserId(user_id!),
        enabled: !!user_id,
    });
};

export const useCreateUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation<UserRole, Error, Partial<UserRole>>({
        mutationFn: (data) => userRolesApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["user-roles", variables.user_id]});
        }
    });
};

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation<UserRole, Error, {id: number; data: Partial<UserRole>}>({
        mutationFn: ({id, data}) => userRolesApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["user-roles", variables.data.user_id]});
        }
    });
};

export const useDeleteUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation<UserRole, Error, {id: number; user_id?: number}>({
        mutationFn: ({id}) => userRolesApi.delete(id),
        onSuccess: (_, variables) => {
            if (variables.user_id) {
                queryClient.invalidateQueries({queryKey: ["user-roles", variables.user_id]});
            }
        }
    });
};

