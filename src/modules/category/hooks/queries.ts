import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../service";
import { ParamsType } from "@types";

export function useGetCategory(params:ParamsType){
    return useQuery({
        queryKey: ["category", params],
        queryFn: ()=> getCategory(params)
    })
}