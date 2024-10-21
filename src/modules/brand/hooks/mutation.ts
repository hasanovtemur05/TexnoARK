import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand, deleteBrand, updateBrand } from "../service";
import { BrandType } from "../types";
import { Notification } from "../../../utils/notification";


// =================================  CREATE  ====================================
export function useCreateBrand () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:BrandType) => createBrand(data),
        onSuccess: async (response)=>{
            Notification('success', response?.message)
        },
        onSettled: async (_,error)=>{
               if (error) {
               Notification('error', error?.message)
               }else{
                await queryClient.invalidateQueries({queryKey: ['brand']})
               }
        },
       
    })
}


// ==============================  UPDATE  ===================================
export function useUpdateBrand() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: BrandType) => updateBrand(data),
      onSuccess: (response) => {
        Notification("success", response?.message);
        queryClient.invalidateQueries({ queryKey: ['brand'] }); 
      },
      onError: (error) => {
        Notification('error', error?.message); 
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['brand'] });
      },
    });
}




// ====================================   DELETE   =====================================
export function useDeleteBrand(){
    const queryClient = useQueryClient() 
    return useMutation({
        mutationFn: (id: string | number) => deleteBrand(id),
        onSuccess: (response)=>{
            Notification("success", response?.message)
        },
        onSettled: async (error)=>{
            if (error) {
                Notification("error", error?.message)
            } else{
               await queryClient.invalidateQueries({queryKey: ['brand']})
            }
        }
    })
}