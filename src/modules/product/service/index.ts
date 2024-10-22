import axiosInstance from "@api";
import { ParamsType } from "@types";
import { ProductType } from "../types";


// =============================  GET PRODUCT  ============================================
export const getProduct = async (params: ParamsType) => {
    const response = await axiosInstance.get('products/search', {params})
    return response?.data;
};




// =============================  CREATE PRODUCT  ==================================
export const createProduct = async (data:ProductType) => {
    const response = await axiosInstance.post('products/create', data)
    return response?.data
}



// =============================  DELETE PRODUCT  ==================================
export const updateProduct = async (id:number, data:ProductType) => {
    const response = await axiosInstance.patch(`products/update/${id}`, data)
    return response?.data
}



// =============================  DELETE PRODUCT  ==================================
export const deleteProduct = async (id:number) => {
    const response = await axiosInstance.delete(`products/delete/${id}`)
    return response?.data
}




// =============================   GET BRAND BY CATEGORY_ID  ==================================
export const getBrandById = async (id:number | undefined) => {
    const response = await axiosInstance.get(`brand/category/${id}`)
    return response?.data?.data
}


// =============================   GET BRAND CATEGORY BY CATEGORY_ID  ==================================
export const getBrandCategoryById = async (id:number | undefined) => {
    const response = await axiosInstance.get(`brand-category/brand/${id}`)
    return response?.data?.data
}