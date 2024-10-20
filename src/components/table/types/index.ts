import { ReactNode } from "react";

export interface Category {
    parent_category_id: ReactNode;
    id: string | number
    name: string;
    createdAt: string;
}