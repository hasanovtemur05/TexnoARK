export interface CategoryDataType {
    id: string | number;
    name: string;
    createdAt: Date;
    parent_category_id: string | number;
  }

export interface StyleType {
    color?: string
    fontSize?: string
}

export type Category = any

