import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { CategoryDataType } from "../types";
import { useCreateCategory, useUpdateCategory } from "../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { ModalPropType } from "@types";



const CategoryModal = ({ open, handleClose, update }: ModalPropType) => {
  const [form] = useForm();
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useCreateCategory();
  const { mutate: updateMutate } = useUpdateCategory();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({ name: update.name });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const handleSubmit = (values: CategoryDataType) => {
    if (update) {
      const payload = { ...values, id: update.id };
      updateMutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["category"] });
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      });
    } else {
      createMutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["category"] });
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
