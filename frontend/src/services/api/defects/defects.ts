import type {Defect} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const defectsApi = {
    getAll: async (): Promise<Defect[]> => {
        return apiClient.get<Defect[]>('/importance_defects/');
    },
    getById: async (importance_defect_id: number): Promise<Defect> => {
        return apiClient.get<Defect>(`/importance_defects/${importance_defect_id}`);
    },
    create: async (data: Partial<Defect>): Promise<Defect> => {
        return apiClient.post<Defect>('/importance_defects', data);
    },
    update: async (importance_defect_id: number, data: Partial<Defect>): Promise<Defect> => {
        return apiClient.put<Defect>(`/importance_defects/${importance_defect_id}`, data);
    },
    delete: async (importance_defect_id: number): Promise<void> => {
        return apiClient.delete<void>(`/importance_defects/${importance_defect_id}`);
    }
};

export const useGetAllDefects = () => {
    return useQuery<Defect[], Error>({
        queryKey: ["defects"],
        queryFn: () => defectsApi.getAll(),
    });
};

export const useGetDefectById = (importance_defect_id: number | undefined) => {
    return useQuery<Defect, Error>({
        queryKey: ["defects", importance_defect_id],
        queryFn: () => defectsApi.getById(importance_defect_id!),
        enabled: !!importance_defect_id,
    });
};

export const useCreateDefect = () => {
    const queryClient = useQueryClient();
    return useMutation<Defect, Error, Partial<Defect>>({
        mutationFn: (data) => defectsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["defects"]});
        }
    });
};

export const useUpdateDefect = () => {
    const queryClient = useQueryClient();
    return useMutation<Defect, Error, {importance_defect_id: number; data: Partial<Defect>}>({
        mutationFn: ({importance_defect_id, data}) => defectsApi.update(importance_defect_id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["defects"]});
        }
    });
};

export const useDeleteDefect = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>({
        mutationFn: (importance_defect_id) => defectsApi.delete(importance_defect_id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["defects"]});
        }
    });
};

