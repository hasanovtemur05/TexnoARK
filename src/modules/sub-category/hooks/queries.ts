import { useQuery } from "@tanstack/react-query";
import { getSubCategory } from "../service";
import { useParams } from "react-router-dom";

export function useGetSubCategory() {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSubCategory(Number(id)),
        queryKey: ["subcategory"],
    });
    
    return {
        data,
        isLoading,
        isError,
    };
}
