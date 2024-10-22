import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { ModalPropType } from "@types";  
import { useGetCategories } from "../hooks/queries";
import { BrandType, CategoryType } from "../types";
import { useCreateBrand, useUpdateBrand } from "../hooks/mutation";

const { Option } = Select;

const BrandModal = ({ open, handleClose, update }: ModalPropType) => {
  const [form] = useForm();
  const [file, setFile] = useState<File | undefined>(undefined);
  const { mutate: createMutate } = useCreateBrand();
  const { mutate: updateMutate } = useUpdateBrand();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({ 
          name: update.name,
          description: update.description,
          category_id: update.category_id,
          file: null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const { data, isSuccess } = useGetCategories();
  const categories = data?.data?.categories;

  const handleSubmit = (values: BrandType) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", `${values.category_id}`);
    formData.append("description", values.description);

    console.log("Submitting values: ", values);
    
    if (!update) { 
        if (file) {
            formData.append("file", file);
        }
    }

    if (update?.id) {
        formData.append("id", update.id.toString()); 
        updateMutate(formData); 
    } else {
        createMutate(formData); 
    }

    handleClose(); 
};



  const setFieldValue = (name: string, value: any) => {
    form.setFieldsValue({ [name]: value });
  };

  return (
    <Modal
      title={update ? "Edit Brand" : "Add Brand"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item label="Brand Name" name="name" rules={[{ required: true, message: 'Please input the brand name!' }]}>
          <Input onChange={(e: { target: { value: any; }; }) => setFieldValue("name", e.target.value)} />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea
            rows={2}
            onChange={(e: { target: { value: any; }; }) => setFieldValue("description", e.target.value)}
            style={{ resize: "none" }}
          />
        </Form.Item>

        <Form.Item label="Category" name="category_id" rules={[{ required: true, message: 'Please select a category!' }]}>
          <Select onChange={(value) => setFieldValue("category_id", value)} placeholder="Select Category">
            {isSuccess && categories.map((category: CategoryType) => (
              <Option key={category.id.toString()} value={category.id.toString()}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Upload File" name="file">
          <Upload
            beforeUpload={(file: File) => {
              setFieldValue("file", file);
              setFile(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button>{file?.name || "Click to Upload"}</Button>
          </Upload>
          {update?.file && <span>{update.file.name}</span>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandModal;
