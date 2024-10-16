/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ModalPropType } from "@types";

const CategoryModal = ({ open, handleClose, update, onSubmit }: ModalPropType) => {
  const [form] = useForm();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({ name: update.name });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Modal
      title={update ? "Edit Category" : "Add Category"}
      open={open}
      onCancel={handleClose}
      footer={null} 
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" />
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

export default CategoryModal;
