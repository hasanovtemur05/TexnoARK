

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubCategory, deleteSubCategory, updateSubCategory } from "../service";
import { SubCategoryDataType } from "../types";
import { Notification } from "../../../utils/notification";


// =================================  CREATE  ====================================
export function useCreateSubCategory() {
    const queryClient = useQueryClient();   
    return useMutation({
        mutationFn: (data: SubCategoryDataType) => createSubCategory(data),
        onSuccess: (response) => {
            Notification('success', response.message);
            queryClient.invalidateQueries({ queryKey: ['subcategory'] }); 
        },
        onError: (error) => {
            Notification('error', error.message);
        },
    });
}



// ==============================  UPDATE  ===================================
export function useUpdateSubCategory() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: SubCategoryDataType }) => updateSubCategory(id, data),
      onSuccess: (response) => {
        Notification("success", response.message);
        queryClient.invalidateQueries({ queryKey: ['subcategory'] });
      },
      onError: (error) => {
        Notification('error', error.message);
      },
    });
  }
  



// ====================================   DELETE   =====================================
export function useDeleteSubCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteSubCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subcategory'] }); 
        },
        onError: (error) => {
            Notification("error", error?.message);
        },
    });
}
