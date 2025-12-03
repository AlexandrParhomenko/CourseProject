import type {TypeWork} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const typeWorksApi = {
    getAll: async (): Promise<TypeWork[]> => {
        return apiClient.get<TypeWork[]>('/type_works/');
    },
    create: async (data: Partial<TypeWork>): Promise<TypeWork> => {
        return apiClient.post<TypeWork>('/type_works', data);
    },
    update: async (type_work_id: number, data: Partial<TypeWork>): Promise<TypeWork> => {
        return apiClient.put<TypeWork>(`/type_works/${type_work_id}`, data);
    },
    delete: async (type_work_id: number): Promise<void> => {
        return apiClient.delete<void>(`/type_works/${type_work_id}`);
    }
};

export const useGetAllTypeWorks = () => {
    return useQuery<TypeWork[], Error>({
        queryKey: ["type_works"],
        queryFn: () => typeWorksApi.getAll(),
    });
};

export const useCreateTypeWork = () => {
    const queryClient = useQueryClient();
    return useMutation<TypeWork, Error, Partial<TypeWork>>({
        mutationFn: (data) => typeWorksApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["type-works"]});
        }
    });
};

export const useUpdateTypeWork = () => {
    const queryClient = useQueryClient();
    return useMutation<TypeWork, Error, {type_work_id: number; data: Partial<TypeWork>}>({
        mutationFn: ({type_work_id, data}) => typeWorksApi.update(type_work_id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["type-works"]});
        }
    });
};

export const useDeleteTypeWork = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>({
        mutationFn: (type_work_id) => typeWorksApi.delete(type_work_id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["type-works"]});
        }
    });
};

