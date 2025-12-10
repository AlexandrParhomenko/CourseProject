import type {User, UserRole} from "@/types/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const usersApi = {
  getUsers: async (): Promise<User[]> => {
    return apiClient.get<User[]>(`/users`);
  },
  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    return apiClient.put<User>(`/users/${id}`, data);
  },
};

export const useGetUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => usersApi.getUsers()
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, {id: number; data: Partial<User>}>({
    mutationFn: ({id, data}) => usersApi.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ["users", variables.data.user_id]});
    }
  });
};

