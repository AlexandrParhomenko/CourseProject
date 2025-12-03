import type {AbbreveBrand} from "@/types/types.ts";
import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@/services/api/client.ts";

const abbreveBrandApi = {
    getAll: async (): Promise<AbbreveBrand[]> => {
        return apiClient.get<AbbreveBrand[]>('/abbreve_brands/');
    }
};

export const useGetAllAbbreveBrands = () => {
    return useQuery<AbbreveBrand[], Error>({
        queryKey: ["abbreve-brands"],
        queryFn: () => abbreveBrandApi.getAll(),
    });
};

