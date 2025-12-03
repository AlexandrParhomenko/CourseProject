import type {TechnicalRegistry} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const registerTechnicalSolutionsApi = {
    getByContractId: async (contract_id: number): Promise<TechnicalRegistry[]> => {
        return apiClient.get<TechnicalRegistry[]>(`/registry_technical_solutions/${contract_id}`);
    },
    create: async (data: Partial<TechnicalRegistry>): Promise<TechnicalRegistry> => {
        return apiClient.post<TechnicalRegistry>('/registry_technical_solutions', data);
    },
    update: async (registry_technical_solutions: number, data: Partial<TechnicalRegistry>): Promise<TechnicalRegistry> => {
        return apiClient.put<TechnicalRegistry>(`/registry_technical_solutions/${registry_technical_solutions}`, data);
    },
    delete: async (registry_technical_solutions: number): Promise<TechnicalRegistry> => {
        return apiClient.delete<TechnicalRegistry>(`/registry_technical_solutions/${registry_technical_solutions}`);
    }
};

export const useGetTechnicalRegistriesByContractId = (contract_id: number | undefined) => {
    return useQuery<TechnicalRegistry[], Error>({
        queryKey: ["registry-technical-solutions", contract_id],
        queryFn: () => registerTechnicalSolutionsApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateTechnicalRegistry = () => {
    const queryClient = useQueryClient();
    return useMutation<TechnicalRegistry, Error, Partial<TechnicalRegistry>>({
        mutationFn: (data) => registerTechnicalSolutionsApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["registry-technical-solutions", variables.contract_id]});
        }
    });
};

export const useUpdateTechnicalRegistry = () => {
    const queryClient = useQueryClient();
    return useMutation<TechnicalRegistry, Error, {registry_technical_solutions: number; data: Partial<TechnicalRegistry>}>({
        mutationFn: ({registry_technical_solutions, data}) => registerTechnicalSolutionsApi.update(registry_technical_solutions, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["registry-technical-solutions", variables.data.contract_id]});
        }
    });
};

export const useDeleteTechnicalRegistry = () => {
    const queryClient = useQueryClient();
    return useMutation<TechnicalRegistry, Error, {registry_technical_solutions: number; contract_id?: number}>({
        mutationFn: ({registry_technical_solutions}) => registerTechnicalSolutionsApi.delete(registry_technical_solutions),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["registry-technical-solutions", variables.contract_id]});
            }
        }
    });
};

