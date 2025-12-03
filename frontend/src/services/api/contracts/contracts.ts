import type {Contract} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";
import {BASE_URL} from "@/constants/constants.ts";

const contractsApi = {
    getAll: async (): Promise<Contract[]> => {
        return apiClient.get<Contract[]>('/contracts');
    },
    getById: async (contract_id: number): Promise<Contract> => {
        return apiClient.get<Contract>(`/contracts/${contract_id}`);
    },
    create: async (data: Partial<Contract>): Promise<Contract> => {
        return apiClient.post<Contract>('/contracts', data);
    },
    update: async (contract_id: number, data: Partial<Contract>): Promise<Contract> => {
        return apiClient.put<Contract>(`/contracts/${contract_id}`, data);
    },
    delete: async (id: number, deletion_user_id: number): Promise<Contract> => {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${BASE_URL}/contracts/${id}`, {
            method: 'DELETE',
            headers,
            credentials: 'include',
            body: JSON.stringify({deletion_user_id})
        });
        if (response.status === 401) {
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            window.location.href = '/';
            throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
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
};

export const useGetAllContracts = () => {
    return useQuery<Contract[], Error>({
        queryKey: ["contracts"],
        queryFn: () => contractsApi.getAll(),
    });
};

export const useGetContractById = (contract_id: number | undefined) => {
    return useQuery<Contract, Error>({
        queryKey: ["contracts", contract_id],
        queryFn: () => contractsApi.getById(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateContract = () => {
    const queryClient = useQueryClient();
    return useMutation<Contract, Error, Partial<Contract>>({
        mutationFn: (data) => contractsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["contracts"]});
        }
    });
};

export const useUpdateContract = () => {
    const queryClient = useQueryClient();
    return useMutation<Contract, Error, {contract_id: number; data: Partial<Contract>}>({
        mutationFn: ({contract_id, data}) => contractsApi.update(contract_id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["contracts"]});
        }
    });
};

export const useDeleteContract = () => {
    const queryClient = useQueryClient();
    return useMutation<Contract, Error, {id: number; deletion_user_id: number}>({
        mutationFn: ({id, deletion_user_id}) => contractsApi.delete(id, deletion_user_id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["contracts"]});
        }
    });
};

