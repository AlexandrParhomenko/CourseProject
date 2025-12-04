import type {Specialist} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const specialistsApi = {
    getByContractId: async (contract_id: number): Promise<Specialist[]> => {
        return apiClient.get<Specialist[]>(`/specialists/${contract_id}`);
    },
    create: async (data: Partial<Specialist>): Promise<Specialist> => {
        return apiClient.post<Specialist>('/specialists', data);
    },
    update: async (id: number, data: Partial<Specialist>): Promise<Specialist> => {
        return apiClient.put<Specialist>(`/specialists/${id}`, data);
    },
    delete: async (id: number): Promise<Specialist> => {
        return apiClient.delete<Specialist>(`/specialists/${id}`);
    }
};

export const useGetSpecialistsByContractId = (contract_id: number | undefined) => {
    return useQuery<Specialist[], Error>({
        queryKey: ["specialists", contract_id],
        queryFn: () => specialistsApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateSpecialist = () => {
    const queryClient = useQueryClient();
    return useMutation<Specialist, Error, Partial<Specialist>>({
        mutationFn: (data) => specialistsApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["specialists", variables.contract_id]});
        }
    });
};

export const useUpdateSpecialist = () => {
    const queryClient = useQueryClient();
    return useMutation<Specialist, Error, {id: number; data: Partial<Specialist>}>({
        mutationFn: ({id, data}) => specialistsApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["specialists", variables.data.contract_id]});
        }
    });
};

export const useDeleteSpecialist = () => {
    const queryClient = useQueryClient();
    return useMutation<Specialist, Error, number >({
        mutationFn: (id) => specialistsApi.delete(id),
        onSuccess: (_, id) => {
            if (id) {
                queryClient.invalidateQueries({queryKey: ["specialists", id]});
            }
        }
    });
};

