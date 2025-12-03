import type {Block} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const blocksApi = {
    getByContractId: async (contract_id: number): Promise<Block[]> => {
        return apiClient.get<Block[]>(`/blocks/${contract_id}`);
    },
    create: async (data: Partial<Block>): Promise<Block> => {
        return apiClient.post<Block>('/blocks', data);
    },
    update: async (id: number, data: Partial<Block>): Promise<Block> => {
        return apiClient.put<Block>(`/blocks/${id}`, data);
    },
    delete: async (id: number): Promise<Block> => {
        return apiClient.delete<Block>(`/blocks/${id}`);
    }
};

export const useGetBlocksByContractId = (contract_id: number | undefined) => {
    return useQuery<Block[], Error>({
        queryKey: ["blocks", contract_id],
        queryFn: () => blocksApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateBlock = () => {
    const queryClient = useQueryClient();
    return useMutation<Block, Error, Partial<Block>>({
        mutationFn: (data) => blocksApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["blocks", variables.contract_id]});
        }
    });
};

export const useUpdateBlock = () => {
    const queryClient = useQueryClient();
    return useMutation<Block, Error, {id: number; data: Partial<Block>}>({
        mutationFn: ({id, data}) => blocksApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["blocks", variables.data.contract_id]});
        }
    });
};

export const useDeleteBlock = () => {
    const queryClient = useQueryClient();
    return useMutation<Block, Error, {id: number; contract_id?: number}>({
        mutationFn: ({id}) => blocksApi.delete(id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["blocks", variables.contract_id]});
            }
        }
    });
};

