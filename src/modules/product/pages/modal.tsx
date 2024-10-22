import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { Key, useEffect, useState } from "react";
import { ModalPropType } from "@types";
import { useBrandById, useBrandCategoryById } from "../hooks/queries";
import { useGetCategory } from "../../category/hooks/queries";
import { useForm } from "antd/es/form/Form";
import { useCreateProduct, useUpdateProduct } from "../hooks/mutation";
import { Notification } from "../../../utils/notification";

const { Option } = Select;

const ProductModal = ({ open, handleClose, update }: ModalPropType) => {
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [brandId, setBrandId] = useState<number | undefined>(undefined);
    const [file, setFile] = useState<any>(null);
    const { data: categoryData } = useGetCategory({
      search: "",
      page: 1,
      limit: 10
    });
    const categories = categoryData?.data?.categories || [];
    const { brands } = useBrandById(categoryId || 0).data || {};
    const { brandCategories } = useBrandCategoryById(brandId || 0).data || {};
    console.log(brandCategories);
    
    const [form] = useForm();
    
    useEffect(() => {
        if (open) {
            if (update) {
                form.setFieldsValue({
                    name: update.name,
                    price: update.price,
                    category_id: String(update.category_id),
                    brand_id: String(update.brand_id), 
                    brand_category_id: String(update.brand_category_id), 
                });
                setCategoryId(update.category_id);
                setBrandId(update.brand_id);
            } else {
                form.resetFields();
                setCategoryId(undefined);
                setBrandId(undefined);
                setFile(null); 
            }
        }
    }, [open, update, form]);

    const { mutate: createMutate } = useCreateProduct();
    const { mutate: updateMutate } = useUpdateProduct();

    const handleSubmit = (values: any) => {
        const selectedFile = file?.originFileObj || file;

        if (!selectedFile) {
            form.setFields([
                {
                    name: 'file',
                    errors: ['Please upload a file'],
                },
            ]);
            return;
        }

        const payload = {
            ...values,
            category_id: String(values.category_id), 
            brand_id: String(values.brand_id), 
            brand_category_id: String(values.brand_category_id), 
            file: selectedFile, 
        };

        if (update) {
            updateMutate(
                { id: update.id, data: payload },
                {
                    onSuccess: (response) => {
                        Notification("success", response.message)
                        handleClose();
                    },
                    onError: (error) => {
                        Notification("error", error.message)
                    },
                }
            );
        } else {
            createMutate(payload, {
                onSuccess: (response) => {
                    handleClose();
                    Notification("success", response.message)
                },
                onError: (error) => {
                    Notification("error", error.message)
                },
            });
        }
    };

    const changeCategory = (value: number) => {
        setCategoryId(value);
        setBrandId(undefined); 
        form.setFieldsValue({ brand_id: undefined, brand_category_id: undefined }); 
    };

    const changeBrand = (value: number) => {
        setBrandId(value);
        form.setFieldsValue({ brand_category_id: undefined }); 
    };

    return (
        <Modal
            title={update ? "Edit Product" : "Add Product"}
            open={open}
            onCancel={handleClose}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter product name" }]}
                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <Input placeholder="Enter price" />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category_id"
                    rules={[{ required: true, message: "Please select a category!" }]}
                >
                    <Select
                        placeholder="Select Category"
                        onChange={changeCategory}
                    >
                        {categories.map((category: { id: Key; name: string }) => (
                            <Option key={category.id} value={String(category.id)}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Brand"
                    name="brand_id"
                    rules={[{ required: true, message: "Please select a brand!" }]}
                >
                    <Select
                        placeholder="Select Brand"
                        onChange={changeBrand}
                    >
                        {brands?.map((brand: { id: Key; name: string }) => (
                            <Option key={brand.id} value={String(brand.id)}>
                                {brand.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Brand Category"
                    name="brand_category_id"
                    rules={[{ required: true, message: "Please select a brand category!" }]}
                >
                    <Select placeholder="Select Brand Category">
                        {brandCategories?.map((category: { id: Key; name: string }) => (
                            <Option key={category.id} value={String(category.id)}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item  name="file">
                    <Upload beforeUpload={(file) => {
                        setFile(file);
                        return false; 
                    }}>
                        <Button>Upload File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {update ? "Update Product" : "Add Product"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductModal;
