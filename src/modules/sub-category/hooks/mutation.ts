

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubCategory, deleteSubCategory } from "../service";
import { SubCategoryDataType } from "../types";
import { Notification } from "../../../utils/notification";
import { deleteCategory } from "../../category/service";


// =================================  CREATE  ====================================
export function useCreateSubCategory () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:SubCategoryDataType) => createSubCategory(data),
        onSuccess: async (response)=>{
            Notification('success', response?.message)
        },
        onSettled: async (_,error)=>{
               if (error) {
               Notification('error', error?.message)
               }else{
                await queryClient.invalidateQueries({queryKey: ['subcategory']})
               }
        },
       
    })
}


// ==============================  UPDATE  ===================================
export function useUpdateSubCategory () {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: (id:string | number) => deleteSubCategory(id),
      onSuccess: async (response)=>{
        Notification("success", response?.message)
      },
      onSettled: async (error, variables:any)=>{
          if (error) {
            Notification('error', error?.message)
          } else{
                await  queryClient.invalidateQueries({queryKey: ['subcategory', {id:variables.id}]})
          }
      }
  }) 
}



// ====================================   DELETE   =====================================
export function useDeleteSubCategory(){
    const queryClient = useQueryClient() 
    return useMutation({
        mutationFn: (id: string | number) => deleteCategory(id),
        onSuccess: (response)=>{
            Notification("success", response?.message)
        },
        onSettled: async (error)=>{
            if (error) {
                Notification("error", error?.message)
            } else{
               await queryClient.invalidateQueries({queryKey: ['subcategory']})
            }
        }
    })
}