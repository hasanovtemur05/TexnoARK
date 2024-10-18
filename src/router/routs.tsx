import { ProductOutlined, UnorderedListOutlined, TagsOutlined, ContainerOutlined } from '@ant-design/icons';
export interface AdminType {
    content: string
    path: string
    icon: JSX.Element
}
const admin:AdminType[] = [
    {
        content: "Product",
        path: "/admin-layout/product",
        icon: <ProductOutlined style={{ fontSize: "16px" }} />,
    },
    {
        content: "Category",
        path: "/admin-layout",
        icon: <UnorderedListOutlined style={{ fontSize: "16px" }} />,
    },
    {
        content: "Brand",
        path: "/admin-layout/brand",
        icon: <TagsOutlined style={{ fontSize: "16px" }} />,
    },
    {
        content: "Brand-category",
        path: "/admin-layout/brand-category",
        icon: <ContainerOutlined style={{ fontSize: "16px" }} />,
    },
];

export default admin;
