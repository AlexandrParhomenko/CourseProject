/**
 * Пример использования нового API клиента
 * 
 * Этот файл демонстрирует правильную структуру для создания API запросов
 * с использованием TanStack Query и нового apiClient
 */

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "./client.ts";

// Пример типов
interface ExampleEntity {
    id: number;
    name: string;
}

interface CreateExampleDto {
    name: string;
}

interface UpdateExampleDto {
    name?: string;
}

// API функции
const exampleApi = {
    getAll: async (): Promise<ExampleEntity[]> => {
        return apiClient.get<ExampleEntity[]>('/examples');
    },

    getById: async (id: number): Promise<ExampleEntity> => {
        return apiClient.get<ExampleEntity>(`/examples/${id}`);
    },

    create: async (data: CreateExampleDto): Promise<ExampleEntity> => {
        return apiClient.post<ExampleEntity>('/examples', data);
    },

    update: async (id: number, data: UpdateExampleDto): Promise<ExampleEntity> => {
        return apiClient.put<ExampleEntity>(`/examples/${id}`, data);
    },

    delete: async (id: number): Promise<void> => {
        return apiClient.delete<void>(`/examples/${id}`);
    },
};

// React Query хуки
export const useGetExamples = () => {
    return useQuery<ExampleEntity[], Error>({
        queryKey: ['examples'],
        queryFn: exampleApi.getAll,
    });
};

export const useGetExample = (id: number | undefined) => {
    return useQuery<ExampleEntity, Error>({
        queryKey: ['examples', id],
        queryFn: () => exampleApi.getById(id!),
        enabled: !!id,
    });
};

export const useCreateExample = () => {
    const queryClient = useQueryClient();

    return useMutation<ExampleEntity, Error, CreateExampleDto>({
        mutationFn: exampleApi.create,
        onSuccess: () => {
            // Инвалидируем кеш после успешного создания
            queryClient.invalidateQueries({queryKey: ['examples']});
        },
    });
};

export const useUpdateExample = () => {
    const queryClient = useQueryClient();

    return useMutation<ExampleEntity, Error, {id: number; data: UpdateExampleDto}>({
        mutationFn: ({id, data}) => exampleApi.update(id, data),
        onSuccess: (_, variables) => {
            // Инвалидируем кеш для конкретного элемента и списка
            queryClient.invalidateQueries({queryKey: ['examples', variables.id]});
            queryClient.invalidateQueries({queryKey: ['examples']});
        },
    });
};

export const useDeleteExample = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: exampleApi.delete,
        onSuccess: () => {
            // Инвалидируем кеш после удаления
            queryClient.invalidateQueries({queryKey: ['examples']});
        },
    });
};

