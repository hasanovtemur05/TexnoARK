import axiosInstance from "@api";
import { ParamsType } from "@types";
import { BrandCategoryType } from "../types";



// =======================  GET BRANDS  =================================
export const getBrands = async ()=>{
    const response = await axiosInstance.get("brand/search")
    return response?.data
}



// ======================  GET BRAND-CATEGORY  ===============================
export const getBrandCategory = async (params: ParamsType) => {
    const response = await axiosInstance.get('/brand-category/search', {params})
    return response?.data;
};





// ======================  CREATE BRAND-CATEGORY  ===============================
export const createBrandCategory = async(data:BrandCategoryType) => {
    const response = await axiosInstance.post("/brand-category/create", data)
    return response?.data
}





// ======================  UPDATE BRAND-CATEGORY  ===============================
export const updateBrandCategory = async(id:number, data:BrandCategoryType)=>{
    const response = await axiosInstance.patch(`/brand-category/update/${id}`, data)
    return response?.data
}





// ======================  DELETE BRAND-CATEGORY  ===============================
export const deleteBrandCategory = async(id:number) => {
    const response = await axiosInstance.delete(`/brand-category/delete/${id}`)
    return response?.data
}