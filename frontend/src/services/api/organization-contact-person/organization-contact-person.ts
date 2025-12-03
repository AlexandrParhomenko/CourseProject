import type {OrganizationContact} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const organizationContactPersonApi = {
    getById: async (organization_contact_person_id: number): Promise<OrganizationContact> => {
        return apiClient.get<OrganizationContact>(`/organization_contact_person/${organization_contact_person_id}`);
    },
    getByContractId: async (contract_id: number): Promise<OrganizationContact[]> => {
        return apiClient.get<OrganizationContact[]>(`/organization_contact_person/contracts/${contract_id}`);
    },
    create: async (data: Partial<OrganizationContact>): Promise<OrganizationContact> => {
        return apiClient.post<OrganizationContact>('/organization_contact_person', data);
    },
    update: async (organization_contact_person_id: number, data: Partial<OrganizationContact>): Promise<OrganizationContact> => {
        return apiClient.put<OrganizationContact>(`/organization_contact_person/${organization_contact_person_id}`, data);
    },
    delete: async (organization_contact_person_id: number): Promise<void> => {
        return apiClient.delete<void>(`/organization_contact_person/${organization_contact_person_id}`);
    }
};

export const useGetOrganizationContactById = (organization_contact_person_id: number | undefined) => {
    return useQuery<OrganizationContact, Error>({
        queryKey: ["organization-contact-person", organization_contact_person_id],
        queryFn: () => organizationContactPersonApi.getById(organization_contact_person_id!),
        enabled: !!organization_contact_person_id,
    });
};

export const useGetOrganizationContactsByContractId = (contract_id: number | undefined) => {
    return useQuery<OrganizationContact[], Error>({
        queryKey: ["organization-contact-person", "contract", contract_id],
        queryFn: () => organizationContactPersonApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateOrganizationContact = () => {
    const queryClient = useQueryClient();
    return useMutation<OrganizationContact, Error, Partial<OrganizationContact>>({
        mutationFn: (data) => organizationContactPersonApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["organization-contact-person", "contract", variables.contract_id]});
        }
    });
};

export const useUpdateOrganizationContact = () => {
    const queryClient = useQueryClient();
    return useMutation<OrganizationContact, Error, {organization_contact_person_id: number; data: Partial<OrganizationContact>}>({
        mutationFn: ({organization_contact_person_id, data}) => organizationContactPersonApi.update(organization_contact_person_id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["organization-contact-person", "contract", variables.data.contract_id]});
        }
    });
};

export const useDeleteOrganizationContact = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, {organization_contact_person_id: number; contract_id?: number}>({
        mutationFn: ({organization_contact_person_id}) => organizationContactPersonApi.delete(organization_contact_person_id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["organization-contact-person", "contract", variables.contract_id]});
            }
        }
    });
};

