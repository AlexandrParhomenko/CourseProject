import type {Consultation} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const consultationsApi = {
    getByContractId: async (contract_id: number): Promise<Consultation[]> => {
        return apiClient.get<Consultation[]>(`/consultations/${contract_id}`);
    },
    create: async (data: Partial<Consultation>): Promise<Consultation> => {
        return apiClient.post<Consultation>('/consultations', data);
    },
    update: async (id: number, data: Partial<Consultation>): Promise<Consultation> => {
        return apiClient.put<Consultation>(`/consultations/${id}`, data);
    },
    delete: async (id: number): Promise<Consultation> => {
        return apiClient.delete<Consultation>(`/consultations/${id}`);
    }
};

export const useGetConsultationsByContractId = (contract_id: number | undefined) => {
    return useQuery<Consultation[], Error>({
        queryKey: ["consultations", contract_id],
        queryFn: () => consultationsApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateConsultation = () => {
    const queryClient = useQueryClient();
    return useMutation<Consultation, Error, Partial<Consultation>>({
        mutationFn: (data) => consultationsApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["consultations", variables.contract_id]});
        }
    });
};

export const useUpdateConsultation = () => {
    const queryClient = useQueryClient();
    return useMutation<Consultation, Error, {id: number; data: Partial<Consultation>}>({
        mutationFn: ({id, data}) => consultationsApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["consultations", variables.data.contract_id]});
        }
    });
};

export const useDeleteConsultation = () => {
    const queryClient = useQueryClient();
    return useMutation<Consultation, Error, {id: number; contract_id?: number}>({
        mutationFn: ({id}) => consultationsApi.delete(id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["consultations", variables.contract_id]});
            }
        }
    });
};

