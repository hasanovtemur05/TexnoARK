/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory } from "../service";
import { CategoryDataType } from "../types";
import { Notification } from "../../../utils/notification";


// =================================  CREATE  ====================================
export function useCreateCategory () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:CategoryDataType) => createCategory(data),
        onSuccess: async (response)=>{
            Notification('success', response?.message)
        },
        onSettled: async (error)=>{
            if (error) {
                // Notification("error", error?.message)

            } else{
               await queryClient.invalidateQueries({queryKey: ['category']})
            }
        },
        onError: async (error)=>{
            Notification("error", error?.message)
        }
    })
}


// ==============================  UPDATE  ===================================
export function useUpdateCategory () {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: (data:CategoryDataType) => createCategory(data),
      onSuccess: async (response)=>{
        Notification("success", response?.message)
      },
      onSettled: async (error, variables:any)=>{
          if (error) {
            Notification('error', error.message)
          } else{
                await  queryClient.invalidateQueries({queryKey: ['category', {id:variables.id}]})
          }
      }
  }) 
}



// ====================================   DELETE   =====================================
export function useDeleteCategory(){
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
               await queryClient.invalidateQueries({queryKey: ['category']})
            }
        }
    })
}