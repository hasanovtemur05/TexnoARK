import axiosInstance from "@api";
import { ParamsType } from "@types";
import { BrandType } from "../types";

// ===================  GET BRAND  ========================
export const getBrand = async (params: ParamsType) => {
    const response = await axiosInstance.get("brand/search", {
        params
    })
    return response?.data
}


// =======================  CREATE  ===========================
export const createBrand = async (data:BrandType) => {
    const response = await axiosInstance.post("brand/create", data)
    return response?.data
}



// ======================  UPDATE  ==========================
export const updateBrand = async (data: BrandType) => {
    const { id, ...updateData } = data;  
    const response = await axiosInstance.patch(`brand/update/${id}`, updateData);  
    return response?.data;
};




// ======================  DELETE  ==========================

export const deleteBrand = async (id: string | number) => {
      const response = await axiosInstance.delete(`brand/delete/${id}`);
      return response?.data;
   
  };
  
