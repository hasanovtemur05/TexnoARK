import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { Key, useEffect, useState } from "react";
import { ModalPropType } from "@types";
import { useBrandById, useBrandCategoryById } from "../hooks/queries";
import { useGetCategory } from "../../category/hooks/queries";
import { useForm } from "antd/es/form/Form";
import { useCreateProduct, useUpdateProduct } from "../hooks/mutation";
import { Notification } from "../../../utils/notification";
import { ProductType } from "../types";

const { Option } = Select;

const ProductModal = ({ open, handleClose, update }: ModalPropType) => {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [brandId, setBrandId] = useState<number | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const { data: categoryData } = useGetCategory({
    search: "",
    page: 1,
    limit: 10,
  });
  const categories = categoryData?.data?.categories || [];

  const { data: brandData } = useBrandById(categoryId || 0);
  const brands = brandData?.brands || [];

  const { data: brandCategoryData } = useBrandCategoryById(brandId || 0);
  const brandCategories = brandCategoryData?.brandCategories || [];

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
        setFile(null);
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
    if (!file) {
      form.setFields([
        {
          name: "files",
          errors: ["Please upload a file"],
        },
      ]);
      return;
    }

    const productData: ProductType = {
        name: values.name,
        price: values.price,
        category_id: Number(values.category_id),
        brand_id: Number(values.brand_id),
        brand_category_id: Number(values.brand_category_id),
        files: file,
      };
      

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", String(productData.price));
      formData.append("category_id", String(productData.category_id));
      formData.append("brand_id", String(productData.brand_id));
      formData.append("brand_category_id", String(productData.brand_category_id));
      formData.append("files", productData.files as Blob);
      

      if (update) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("category_id", String(values.category_id)); 
        formData.append("brand_id", String(values.brand_id)); 
        formData.append("brand_category_id", String(values.brand_category_id)); 
        formData.append("files", file as Blob);
      
        
        updateMutate(
          { id: update.id, data: formData as unknown as ProductType }, 
          {
            onSuccess: () => {
              Notification("success", "Product updated successfully!");
              handleClose();
            },
            onError: (error) => {
              Notification("error", error.message || "An error occurred");
            },
          }
        );
      } else {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("category_id", String(values.category_id)); 
        formData.append("brand_id", String(values.brand_id)); 
        formData.append("brand_category_id", String(values.brand_category_id)); 
        formData.append("files", file as Blob); 
      
        createMutate(formData as unknown as ProductType, {
          onSuccess: () => {
            handleClose();
          },
          onError: (error) => {
            handleClose();
            console.log(error);
            
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
          <Select placeholder="Select Category" onChange={changeCategory}>
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
          <Select placeholder="Select Brand" onChange={changeBrand}>
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
          rules={[
            { required: true, message: "Please select a brand category!" },
          ]}
        >
          <Select placeholder="Select Brand Category">
            {brandCategories?.length > 0 ? (
              brandCategories.map((category: { id: Key; name: string }) => (
                <Option key={category.id} value={String(category.id)}>
                  {category.name}
                </Option>
              ))
            ) : (
              <Option disabled>No brand categories available</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Upload Product Image"
          name="files"
          valuePropName="fileList"
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={(info) => {
              if (info.fileList.length > 0) {
                const selectedFile = info.fileList[0].originFileObj || null;
                setFile(selectedFile);
                form.setFieldsValue({ files: info.fileList });
              } else {
                setFile(null);
                form.setFieldsValue({ files: [] });
              }
            }}
            maxCount={1}
          >
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
