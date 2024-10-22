import { useQuery } from "@tanstack/react-query";
import { getBrand, getCategories } from "../service";
import { ParamsType } from "@types";

export function useGetBrand(params:ParamsType){
    return useQuery({
        queryKey: ["brands", params],
        queryFn: ()=> getBrand(params)
    })
}


// ============================  GET CATEGORY  ==========================
export function useGetCategories(){
    return useQuery({
        queryKey: ["brands"],
        queryFn: ()=> getCategories()
    })
}