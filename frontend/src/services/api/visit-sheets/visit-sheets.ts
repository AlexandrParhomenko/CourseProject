import type {VisitSheet} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const visitSheetsApi = {
    getByContractId: async (contract_id: number): Promise<VisitSheet[]> => {
        return apiClient.get<VisitSheet[]>(`/visit-sheets/${contract_id}`);
    },
    create: async (data: Partial<VisitSheet>): Promise<VisitSheet> => {
        return apiClient.post<VisitSheet>('/visit-sheets', data);
    },
    update: async (id: number, data: Partial<VisitSheet>): Promise<VisitSheet> => {
        return apiClient.put<VisitSheet>(`/visit-sheets/${id}`, data);
    },
    delete: async (id: number): Promise<VisitSheet> => {
        return apiClient.delete<VisitSheet>(`/visit-sheets/${id}`);
    }
};

export const useGetVisitSheetsByContractId = (contract_id: number | undefined) => {
    return useQuery<VisitSheet[], Error>({
        queryKey: ["visit-sheets", contract_id],
        queryFn: () => visitSheetsApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateVisitSheet = () => {
    const queryClient = useQueryClient();
    return useMutation<VisitSheet, Error, Partial<VisitSheet>>({
        mutationFn: (data) => visitSheetsApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["visit-sheets", variables.contract_id]});
        }
    });
};

export const useUpdateVisitSheet = () => {
    const queryClient = useQueryClient();
    return useMutation<VisitSheet, Error, {id: number; data: Partial<VisitSheet>}>({
        mutationFn: ({id, data}) => visitSheetsApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["visit-sheets", variables.data.contract_id]});
        }
    });
};

export const useDeleteVisitSheet = () => {
    const queryClient = useQueryClient();
    return useMutation<VisitSheet, Error, {id: number; contract_id?: number}>({
        mutationFn: ({id}) => visitSheetsApi.delete(id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["visit-sheets", variables.contract_id]});
            }
        }
    });
};

