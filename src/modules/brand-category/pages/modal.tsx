import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ModalPropType } from "@types";  
import { useGetBrands } from "../hooks/queries";
import { useCreateBrandCategory, useUpdateBrandCategory } from "../hooks/mutation";
import { BrandCategoryType } from "../types";
import { useQueryClient } from "@tanstack/react-query"; 

const BrandCategoryModal = ({ open, handleClose, update }: ModalPropType) => {
  const [form] = useForm();
  const queryClient = useQueryClient(); 

  useEffect(() => {
    console.log("Update data:", update);
    if (open) {
      if (update) {
        form.setFieldsValue({
          name: update.name,
          brand_id: update.brand_id, 
        });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const { data, isSuccess } = useGetBrands();
  const brands = data?.data?.brands;

  const { mutate: createMutate } = useCreateBrandCategory();
  const { mutate: updateMutate } = useUpdateBrandCategory();

  const handleSubmit = (values: BrandCategoryType) => {
    if (update) {
        const payload = { id: update.id, data: values };
        updateMutate(payload, {
            onSuccess: () => {
                handleClose();
                queryClient.invalidateQueries({ queryKey: ["brand-category"] });
            },
            onError: () => {
                handleClose();
            },
        });
    } else {
        createMutate(values, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["brand-category"] });
                handleClose();
            },
            onError: () => {
                handleClose();
            },
        });
    }
};

  return (
    <Modal
      title={update ? "Edit Brand-category" : "Add BrandCategory"}  
      open={open}
      onCancel={handleClose}  
      footer={null}  
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="BrandCategory Name"
          name="name"
          rules={[{ required: true, message: "Please enter brand-category name" }]}
        >
          <Input placeholder="Enter sub-category name" />
        </Form.Item>

        <Form.Item label="Brand" name="brand_id" rules={[{ required: true, message: 'Please select a brand!' }]}>
          <Select onChange={(value) => form.setFieldsValue({ brand_id: parseInt(value, 10) })} placeholder="Select brand">
            {isSuccess && brands.map((item: BrandCategoryType) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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

export default BrandCategoryModal;
