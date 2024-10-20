import axiosInstance from "@api";
import { SubCategoryDataType } from "../types";



// ========================================  GET SUB_CATEGORY  ============================================
export const getSubCategory = async (parent_id:number) => {
    
    const response = await axiosInstance.get(`/sub-category/search/${parent_id}`)

    return response?.data;
};


// ========================================  CREATE SUB_CATEGORY  ============================================
export const createSubCategory = async (data: SubCategoryDataType,) => {
    const response = await axiosInstance.post("sub-category/create", data);
    return response?.data;
};

// ========================================  UPDATE SUB_CATEGORY  ============================================
export const updateSubCategory = async (id: number, data: any) => {
    const response = await axiosInstance.patch(`sub-category/update/${id}`, data); 
    return response?.data;
};


// ========================================  DELETE SUB_CATEGORY  ============================================
export const deleteSubCategory = async (id: number | string) => {
    const response = await axiosInstance.delete(`/sub-category/delete/${id}`); 
    return response?.data;
};
