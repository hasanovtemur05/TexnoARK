import { useQuery } from "@tanstack/react-query";
import { getBrandCategory, getBrands } from "../service";
import { ParamsType } from "@types";

export function useGetBrandCategory(params: ParamsType){
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getBrandCategory(params),  
        queryKey: ["brand-category", params],     
    });

    return {
        data,
        isLoading,
        isError
    };
}

export function useGetBrands(){
    const {data, isSuccess} = useQuery({
        queryFn: () => getBrands(),
        queryKey: ["brand-category"]
    })
    return {
        data,
        isSuccess
    }
}


