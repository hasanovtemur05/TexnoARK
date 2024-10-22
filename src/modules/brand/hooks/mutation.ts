import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand, deleteBrand, updateBrand } from "../service";
import { Notification } from "../../../utils/notification";


// =================================  CREATE  ====================================
export function useCreateBrand () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:FormData) => createBrand(data),
        onSuccess: async (response)=>{
            Notification('success', response?.message)
            await queryClient.invalidateQueries({ queryKey: ['brands'] });
        },
        onSettled: async (_,error)=>{
               if (error) {
               Notification('error', error?.message)
               }else{
                await queryClient.invalidateQueries({queryKey: ['brands']})
               }
        },
       
    })
}


// ==============================  UPDATE  ===================================
export function useUpdateBrand() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: FormData) => updateBrand(data),
      onSuccess:async (response) => {
        Notification("success", response?.message);
        await queryClient.invalidateQueries({ queryKey: ['brands'] }); 
      },
      onError: (error) => {
        Notification('error', error?.message); 
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
      },
    });
}




// ====================================   DELETE   =====================================
export function useDeleteBrand(){
    const queryClient = useQueryClient() 
    return useMutation({
        mutationFn: (id: string | number) => deleteBrand(id),
        onSuccess:async (response)=>{
            Notification("success", response?.message)
            await queryClient.invalidateQueries({ queryKey: ['brands'] });
        },
        onSettled: async (error)=>{
            if (error) {
                Notification("error", error?.message)
            } else{
               await queryClient.invalidateQueries({queryKey: ['brands']})
            }
        }
    })
}