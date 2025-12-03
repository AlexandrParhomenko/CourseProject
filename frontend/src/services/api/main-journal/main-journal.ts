import type {MainJournal} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const mainJournalApi = {
    getByContractId: async (contract_id: number): Promise<MainJournal[]> => {
        return apiClient.get<MainJournal[]>(`/main_journal/${contract_id}`);
    },
    create: async (data: Partial<MainJournal>): Promise<MainJournal> => {
        return apiClient.post<MainJournal>('/main_journal', data);
    },
    update: async (main_journal_id: number, data: Partial<MainJournal>): Promise<MainJournal> => {
        return apiClient.put<MainJournal>(`/main_journal/${main_journal_id}`, data);
    },
    delete: async (main_journal_id: number): Promise<MainJournal> => {
        return apiClient.delete<MainJournal>(`/main_journal/${main_journal_id}`);
    }
};

export const useGetMainJournalsByContractId = (contract_id: number | undefined) => {
    return useQuery<MainJournal[], Error>({
        queryKey: ["main-journal", contract_id],
        queryFn: () => mainJournalApi.getByContractId(contract_id!),
        enabled: !!contract_id,
    });
};

export const useCreateMainJournal = () => {
    const queryClient = useQueryClient();
    return useMutation<MainJournal, Error, Partial<MainJournal>>({
        mutationFn: (data) => mainJournalApi.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["main-journal", variables.contract_id]});
        }
    });
};

export const useUpdateMainJournal = () => {
    const queryClient = useQueryClient();
    return useMutation<MainJournal, Error, {main_journal_id: number; data: Partial<MainJournal>}>({
        mutationFn: ({main_journal_id, data}) => mainJournalApi.update(main_journal_id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["main-journal", variables.data.contract_id]});
        }
    });
};

export const useDeleteMainJournal = () => {
    const queryClient = useQueryClient();
    return useMutation<MainJournal, Error, {main_journal_id: number; contract_id?: number}>({
        mutationFn: ({main_journal_id}) => mainJournalApi.delete(main_journal_id),
        onSuccess: (_, variables) => {
            if (variables.contract_id) {
                queryClient.invalidateQueries({queryKey: ["main-journal", variables.contract_id]});
            }
        }
    });
};

