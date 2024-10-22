import axiosInstance from "@api";
import { ParamsType } from "@types";

// ===================  GET BRAND  ========================
export const getBrand = async (params?: ParamsType) => {
    const response = await axiosInstance.get("brand/search", {
        params
    })
    return response?.data
}


// ======================  GET CATEGORY  =======================
export const getCategories = async ()=>{
    const response = await axiosInstance.get("category/search")
    return response?.data
}




// =======================  CREATE  ===========================
export const createBrand = async (data:FormData) => {
    const response = await axiosInstance.post("brand/create", data)
    return response?.data
}



// ======================  UPDATE  ==========================
export const updateBrand = async (data: FormData) => {
    const id = data.get('id') as string;
    const updateData = Array.from(data.entries())
        .filter(([key]) => key !== 'id' && key !== 'category_id')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const response = await axiosInstance.patch(`brand/update/${id}`, updateData);
    return response.data;
};






// ======================  DELETE  ==========================

export const deleteBrand = async (id: string | number) => {
      const response = await axiosInstance.delete(`brand/delete/${id}`);
      return response?.data;
   
  };
  
