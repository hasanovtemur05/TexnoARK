
import { useQuery } from "@tanstack/react-query";
import { getBrandById, getBrandCategoryById, getProduct } from "../service";
import { ParamsType } from "@types";

export function useGetProduct(params: ParamsType){
    return useQuery({
        queryFn: () => getProduct(params),  
        queryKey: ["product", params],     
    });

}


export function useBrandById (id:number){
    return useQuery({
        queryFn:()=> getBrandById(id),
        queryKey: ["product", id]
    })
   
}


export function useBrandCategoryById (id: number){
    return useQuery({
        queryFn:()=> getBrandCategoryById(id),
        queryKey: ['product']
    })
   
}