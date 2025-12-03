import type {Discipline} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const disciplinesApi = {
    getAll: async (): Promise<Discipline[]> => {
        return apiClient.get<Discipline[]>('/disciplines');
    },
    create: async (data: Partial<Discipline>): Promise<Discipline> => {
        return apiClient.post<Discipline>('/disciplines', data);
    },
    update: async (discipline_id: number, data: Partial<Discipline>): Promise<Discipline> => {
        return apiClient.put<Discipline>(`/disciplines/${discipline_id}`, data);
    },
    delete: async (discipline_id: number): Promise<Discipline> => {
        return apiClient.delete<Discipline>(`/disciplines/${discipline_id}`);
    }
};

export const useGetAllDisciplines = () => {
    return useQuery<Discipline[], Error>({
        queryKey: ["disciplines"],
        queryFn: () => disciplinesApi.getAll(),
    });
};

export const useCreateDiscipline = () => {
    const queryClient = useQueryClient();
    return useMutation<Discipline, Error, Partial<Discipline>>({
        mutationFn: (data) => disciplinesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["disciplines"]});
        }
    });
};

export const useUpdateDiscipline = () => {
    const queryClient = useQueryClient();
    return useMutation<Discipline, Error, {discipline_id: number; data: Partial<Discipline>}>({
        mutationFn: ({discipline_id, data}) => disciplinesApi.update(discipline_id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["disciplines"]});
        }
    });
};

export const useDeleteDiscipline = () => {
    const queryClient = useQueryClient();
    return useMutation<Discipline, Error, number>({
        mutationFn: (discipline_id) => disciplinesApi.delete(discipline_id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["disciplines"]});
        }
    });
};

