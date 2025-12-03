import type {Registry} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const registryApi = {
    getByContractId: async (contract_id: number): Promise<Registry[]> => {
        return apiClient.get<Registry[]>(`/registry/${contract_id}`);
    },
    create: async (data: Partial<Registry>): Promise<Registry> => {
        return apiClient.post<Registry>('/registry', data);
    },
    update: async (registry_id: number, data: Partial<Registry>): Promise<Registry> => {
        return apiClient.put<Registry>(`/registry/${registry_id}`, data);
    },
    delete: async (registry_id: number): Promise<Registry> => {
        return apiClient.delete<Registry>(`/registry/${registry_id}`);
    }
};

export const useGetRegistriesByContractId = (contract_id: number | undefined) => {
    return useQuery<Registry[], Error>({
        queryKey: ["registry", contract_id],
        queryFn: () => registryApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateRegistry = () => {
    const queryClient = useQueryClient();
    return useMutation<Registry, Error, Partial<Registry>>({
        mutationFn: (data) => registryApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["registry", variables.contract_id]});
        }
    });
};

export const useUpdateRegistry = () => {
    const queryClient = useQueryClient();
    return useMutation<Registry, Error, {registry_id: number; data: Partial<Registry>}>({
        mutationFn: ({registry_id, data}) => registryApi.update(registry_id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["registry", variables.data.contract_id]});
        }
    });
};

export const useDeleteRegistry = () => {
    const queryClient = useQueryClient();
    return useMutation<Registry, Error, {registry_id: number; contract_id?: number}>({
        mutationFn: ({registry_id}) => registryApi.delete(registry_id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["registry", variables.contract_id]});
            }
        }
    });
};

