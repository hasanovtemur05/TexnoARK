import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "../../../utils/notification";
import { createBrandCategory, deleteBrandCategory, updateBrandCategory } from "../service";
import { BrandCategoryType } from "../types";


// =================================  CREATE  ====================================
export function useCreateBrandCategory() {
    const queryClient = useQueryClient();   
    return useMutation({
        mutationFn: (data: BrandCategoryType) => createBrandCategory(data),
        onSuccess: (response) => {
            Notification('success', response?.message);
            queryClient.invalidateQueries({ queryKey: ['brand-category'] }); 
        },
        onSettled: async (_,error)=>{
            if (error) {
                Notification("error", error?.message)
            } else{
               await queryClient.invalidateQueries({queryKey: ['brand-category']})
            }
        }
    });
}




// =================================  UPDATE  ====================================
export function useUpdateBrandCategory() {
    const queryClient = useQueryClient();   
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: BrandCategoryType }) => updateBrandCategory(id, data),
        onSuccess: (response) => {
            Notification('success', response?.message);
            queryClient.invalidateQueries({ queryKey: ['brand-category'] }); 
        },
        onError: (error) => {
            Notification('error', error.message);
        },
    });
}



// =========================================   DELETE   =======================================

export function useDeleteBrandCategory(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:number) => deleteBrandCategory(id),
        onSuccess: (response)=> {
            Notification("success", response?.message)
            queryClient.invalidateQueries({ queryKey: ['brand-category'] }); 
        },
        onSettled: async (_,error)=>{
            if (error) {
                Notification("error", error?.message)
            } else{
               await queryClient.invalidateQueries({queryKey: ['brand-category']})
            }
        }
    })
}