import type {TypeDoc} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const typeDocsApi = {
    getAll: async (): Promise<TypeDoc[]> => {
        return apiClient.get<TypeDoc[]>('/type_docs/');
    },
    getById: async (type_doc_id: number): Promise<TypeDoc> => {
        return apiClient.get<TypeDoc>(`/type_docs/${type_doc_id}`);
    },
    create: async (data: Partial<TypeDoc>): Promise<TypeDoc> => {
        return apiClient.post<TypeDoc>('/type_docs', data);
    },
    update: async (type_doc_id: number, data: Partial<TypeDoc>): Promise<TypeDoc> => {
        return apiClient.put<TypeDoc>(`/type_docs/${type_doc_id}`, data);
    },
    delete: async (type_doc_id: number): Promise<void> => {
        return apiClient.delete<void>(`/type_docs/${type_doc_id}`);
    }
};

export const useGetAllTypeDocs = () => {
    return useQuery<TypeDoc[], Error>({
        queryKey: ["type-docs"],
        queryFn: () => typeDocsApi.getAll(),
    });
};

export const useGetTypeDocById = (type_doc_id: number | undefined) => {
    return useQuery<TypeDoc, Error>({
        queryKey: ["type-docs", type_doc_id],
        queryFn: () => typeDocsApi.getById(type_doc_id!),
        enabled: !!type_doc_id,
    });
};

export const useCreateTypeDoc = () => {
    const queryClient = useQueryClient();
    return useMutation<TypeDoc, Error, Partial<TypeDoc>>({
        mutationFn: (data) => typeDocsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["type-docs"]});
        }
    });
};

export const useUpdateTypeDoc = () => {
    const queryClient = useQueryClient();
    return useMutation<TypeDoc, Error, {type_doc_id: number; data: Partial<TypeDoc>}>({
        mutationFn: ({type_doc_id, data}) => typeDocsApi.update(type_doc_id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["type-docs"]});
        }
    });
};

export const useDeleteTypeDoc = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>({
        mutationFn: (type_doc_id) => typeDocsApi.delete(type_doc_id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["type-docs"]});
        }
    });
};

