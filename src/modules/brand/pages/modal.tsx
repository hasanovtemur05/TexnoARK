import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import { ModalPropType } from "@types";  

const { Option } = Select;

const BrandModal = ({ open, handleClose, update, onSubmit, categories }: ModalPropType) => {
  const [form] = useForm();

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

  const handleSubmit = (values: any) => {
    onSubmit({ ...values, id: update ? update.id : undefined });  
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
          <Input
            onChange={(e: { target: { value: any; }; }) => setFieldValue("name", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea
            rows={2}
            onChange={(e: { target: { value: any; }; }) => setFieldValue("description", e.target.value)}
            style={{ resize: "none" }}
          />
        </Form.Item>

        <Form.Item label="Category" name="category_id" rules={[{ required: true, message: 'Please select a category!' }]}>
          <Select
            onChange={(value) => setFieldValue("category_id", value)}
            placeholder="Select Category"
          >
            {categories && categories.map((category: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Upload File" name="file">
          <Upload
            beforeUpload={(file) => {
              setFieldValue("file", file);
              return false; 
            }}
            showUploadList={false}
          >
            <Button>Click to Upload</Button>
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
