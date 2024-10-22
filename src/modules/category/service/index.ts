import axiosInstance from "@api";
import { ParamsType } from "@types";
import { CategoryDataType } from "../types";

// ===================  GET CATEGORY  ========================
export const getCategory = async (params: ParamsType) => {
    const response = await axiosInstance.get("category/search", {
        params
    })
    return response?.data
}




// =======================  CREATE  ===========================
export const createCategory = async (data:CategoryDataType) => {
    const response = await axiosInstance.post("category/create", data)
    return response?.data
}



// ======================  UPDATE  ==========================
export const updateCategory = async (data: CategoryDataType) => {
    const { id, ...updateData } = data;  
    const response = await axiosInstance.patch(`category/update/${id}`, updateData);  
    return response?.data;
};




// ======================  DELETE  ==========================

export const deleteCategory = async (id: string | number) => {
      const response = await axiosInstance.delete(`category/delete/${id}`);
      return response?.data;
   
  };
  
