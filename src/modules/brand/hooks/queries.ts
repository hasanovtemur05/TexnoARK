import { useQuery } from "@tanstack/react-query";
import { getBrand } from "../service";
import { ParamsType } from "@types";

export function useGetBrand(params:ParamsType){
    return useQuery({
        queryKey: ["category", params],
        queryFn: ()=> getBrand(params)
    })
}