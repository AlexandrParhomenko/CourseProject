import type {Brand} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const brandsApi = {
    getByContractId: async (contract_id: number): Promise<Brand[]> => {
        return apiClient.get<Brand[]>(`/brands/${contract_id}`);
    },
    create: async (data: Partial<Brand>): Promise<Brand> => {
        return apiClient.post<Brand>('/brands', data);
    },
    update: async (brand_id: number, data: Partial<Brand>): Promise<Brand> => {
        return apiClient.put<Brand>(`/brands/${brand_id}`, data);
    },
    delete: async (brand_id: number): Promise<Brand> => {
        return apiClient.delete<Brand>(`/brands/${brand_id}`);
    }
};

export const useGetBrandsByContractId = (contract_id: number | undefined) => {
    return useQuery<Brand[], Error>({
        queryKey: ["brands", contract_id],
        queryFn: () => brandsApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation<Brand, Error, Partial<Brand>>({
        mutationFn: (data) => brandsApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["brands", variables.contract_id]});
        }
    });
};

export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation<Brand, Error, {brand_id: number; data: Partial<Brand>}>({
        mutationFn: ({brand_id, data}) => brandsApi.update(brand_id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["brands", variables.data.contract_id]});
        }
    });
};

export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    return useMutation<Brand, Error, {brand_id: number; contract_id?: number}>({
        mutationFn: ({brand_id}) => brandsApi.delete(brand_id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["brands", variables.contract_id]});
            }
        }
    });
};

