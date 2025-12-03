import type {Organization} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const organisationsApi = {
    getById: async (organization_id: number): Promise<Organization> => {
        return apiClient.get<Organization>(`/organization/${organization_id}`);
    },
    getByContractId: async (contract_id: number): Promise<Organization[]> => {
        return apiClient.get<Organization[]>(`/organization/contracts/${contract_id}`);
    },
    create: async (data: Partial<Organization>): Promise<Organization> => {
        return apiClient.post<Organization>('/organization', data);
    },
    update: async (id: number, data: Partial<Organization>): Promise<Organization> => {
        return apiClient.put<Organization>(`/organization/${id}`, data);
    },
    delete: async (id: number): Promise<void> => {
        return apiClient.delete<void>(`/organization/${id}`);
    }
};

export const useGetOrganizationById = (organization_id: number | undefined) => {
    return useQuery<Organization, Error>({
        queryKey: ["organizations", organization_id],
        queryFn: () => organisationsApi.getById(organization_id!),
        enabled: !!organization_id,
    });
};

export const useGetOrganizationsByContractId = (contract_id: number | undefined) => {
    return useQuery<Organization[], Error>({
        queryKey: ["organizations", "contract", contract_id],
        queryFn: () => organisationsApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation<Organization, Error, Partial<Organization>>({
        mutationFn: (data) => organisationsApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["organizations", "contract", variables.contract_id]});
        }
    });
};

export const useUpdateOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation<Organization, Error, {id: number; data: Partial<Organization>}>({
        mutationFn: ({id, data}) => organisationsApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["organizations", "contract", variables.data.contract_id]});
        }
    });
};

export const useDeleteOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, {id: number; contract_id?: number}>({
        mutationFn: ({id}) => organisationsApi.delete(id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["organizations", "contract", variables.contract_id]});
            }
        }
    });
};

