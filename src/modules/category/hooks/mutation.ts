import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, updateCategory } from "../service";
import { CategoryDataType } from "../types";
import { Notification } from "../../../utils/notification";


// =================================  CREATE  ====================================
export function useCreateCategory () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:CategoryDataType) => createCategory(data),
        onSuccess: (response)=>{
            Notification('success', response?.message)
            queryClient.invalidateQueries({queryKey: ['category']})
        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['category']})
       }
       
    })
}


// ==============================  UPDATE  ===================================
export function useUpdateCategory() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: CategoryDataType) => updateCategory(data),
      onSuccess: (response) => {
        Notification("success", response?.message);
        queryClient.invalidateQueries({ queryKey: ['category'] }); 
      },
      onError: (error) => {
        Notification('error', error.message); 
        queryClient.invalidateQueries({ queryKey: ['category'] });
      },
      
    });
}




// ====================================   DELETE   =====================================
export function useDeleteCategory(){
    const queryClient = useQueryClient() 
    return useMutation({
        mutationFn: (id: string | number) => deleteCategory(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['category']})
        },
        onError: (error)=>{
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['category']})
        }
    })
}