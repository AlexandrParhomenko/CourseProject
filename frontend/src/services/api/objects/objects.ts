import type {Object} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const objectsApi = {
    getById: async (object_id: number): Promise<Object> => {
        return apiClient.get<Object>(`/objects/${object_id}`);
    },
    getByContractId: async (contract_id: number): Promise<Object[]> => {
        return apiClient.get<Object[]>(`/objects/contracts/${contract_id}`);
    },
    create: async (data: Partial<Object>): Promise<Object> => {
        return apiClient.post<Object>('/objects', data);
    },
    update: async (id: number, data: Partial<Object>): Promise<Object> => {
        return apiClient.put<Object>(`/objects/${id}`, data);
    },
    delete: async (id: number): Promise<void> => {
        return apiClient.delete<void>(`/objects/${id}`);
    }
};

export const useGetObjectById = (object_id: number | undefined) => {
    return useQuery<Object, Error>({
        queryKey: ["objects", object_id],
        queryFn: () => objectsApi.getById(object_id!),
        enabled: !!object_id,
    });
};

export const useGetObjectsByContractId = (contract_id?: number) => {
    return useQuery<Object[], Error>({
        queryKey: ["objects", "contract", contract_id],
        queryFn: () => objectsApi.getByContractId(contract_id!),
        enabled: !!contract_id
    });
};

export const useCreateObject = () => {
    const queryClient = useQueryClient();
    return useMutation<Object, Error, Partial<Object>>({
        mutationFn: (data) => objectsApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["objects", "contract", variables.contract_id]});
        }
    });
};

export const useUpdateObject = () => {
    const queryClient = useQueryClient();
    return useMutation<Object, Error, {id: number; data: Partial<Object>}>({
        mutationFn: ({id, data}) => objectsApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["objects", "contract", variables.data.contract_id]});
        }
    });
};

export const useDeleteObject = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, {id: number; contract_id?: number}>({
        mutationFn: ({id}) => objectsApi.delete(id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["objects", "contract", variables.contract_id]});
            }
        }
    });
};
