import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SubCategoryDataType } from "../types";
import { useCreateSubCategory, useUpdateSubCategory } from "../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";

type SubCategoryModalProps = {
  open: boolean;
  handleClose: () => void;
  update?: SubCategoryDataType | null;
};

const SubCategoryModal = ({ open, handleClose, update }: SubCategoryModalProps) => {
  const [form] = useForm();
  const { id } = useParams(); 
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useCreateSubCategory();
  const { mutate: updateMutate } = useUpdateSubCategory();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          name: update.name,
        });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const handleSubmit = (values: SubCategoryDataType) => {
    const parent_category_id = parseInt(id as string, 10); 
    if (isNaN(parent_category_id)) {
      console.error("Invalid ID: ID must be a number");
      return;
    }

    const updatedValues = { ...values, parent_category_id };

    if (update) {
      const payload = { 
        id: Number(update.id),  
        data: updatedValues  
      };
      
      updateMutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["subcategory"] });
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      });
    } else {
      createMutate(updatedValues, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["subcategory"] });
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
      title={update ? "Edit SubCategory" : "Add SubCategory"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="SubCategory Name"
          name="name"
          rules={[{ required: true, message: "Please enter sub-category name" }]}
        >
          <Input placeholder="Enter sub-category name" />
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

export default SubCategoryModal;
