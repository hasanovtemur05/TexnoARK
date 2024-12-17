import { ProductOutlined } from '@ant-design/icons';
export interface AdminType {
    content: string
    path: string
    icon: JSX.Element
}
const admin:AdminType[] = [
    {
        content: "Product",
        path: "/admin-layout/product",
        icon: <ProductOutlined style={{ fontSize: "20px" }} />,
    },
    {
        content: "Category",
        path: "/admin-layout",
        icon: <ProductOutlined style={{ fontSize: "20px" }} />,
    },
    {
        content: "Brand",
        path: "/admin-layout/brand",
        icon: <ProductOutlined style={{ fontSize: "20px" }} />,
    },
    {
        content: "Brand-category",
        path: "/admin-layout/brand-category",
        icon: <ProductOutlined style={{ fontSize: "20px" }} />,
    },
  
];

export default admin;
