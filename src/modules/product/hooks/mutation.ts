import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProductType } from "../types"
import { Notification } from "../../../utils/notification"
import { createProduct, deleteProduct, updateProduct } from "../service"

// =================================  CREATE  ====================================
export function useCreateProduct () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:ProductType) => createProduct(data),
        onSuccess: (response)=>{
            Notification('success', response?.message)
            queryClient.invalidateQueries({queryKey: ['product']})
        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['product']})
       }
       

    })
}




// =================================  UPDATE  ====================================
export function useUpdateProduct () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ProductType }) => updateProduct(id, data),
        onSuccess: (response)=>{
            Notification('success', response?.message)
            queryClient.invalidateQueries({queryKey: ['product']})
        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['product']})
       }
       
       
    })
}



// =================================  DELETE  ====================================
export function useDeleteProduct () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:number) => deleteProduct(id),
        onSuccess: (response)=>{
            Notification('success', response?.message)
            queryClient.invalidateQueries({queryKey: ['product']})
        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['product']})
       }
       
    })
}