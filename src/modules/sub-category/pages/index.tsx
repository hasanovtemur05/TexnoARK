import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query"; // To'g'ri import
import { useGetSubCategory } from "../hooks/queries";
import { useCreateSubCategory, useUpdateSubCategory } from "../hooks/mutation";
import SubCategoryModal from "./modal";
import { Button, Spin, Tooltip, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GlobalTable } from "@components";
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "@types";
import { SubCategoryDataType } from "../types";
import { deleteCategory } from "../../category/service";
import { Category } from "../../category/types";

const SubCategory = () => {
  const [params, setParams] = useState<ParamsType>({
    limit: 3,
    page: 1,
    search: "",
  });

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<SubCategoryDataType | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 

  const { data, isLoading, isError } = useGetSubCategory(); 
  console.log(data?.data?.subcategories);

  const { mutate: createMutate } = useCreateSubCategory();
  const { mutate: updateMutate } = useUpdateSubCategory();

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);
  };

  const handleSubmit = (values: SubCategoryDataType) => {
    if (updateData) {
      const payload: string | number = updateData.id; 
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
      createMutate(values, {
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
  

  const handleTableChange = (pagination: { current?: number; pageSize?: number }) => {
    const { current = 1, pageSize = 10 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));

    const current_params = new URLSearchParams(window.location.search);
    current_params.set("page", `${current}`);
    current_params.set("limit", `${pageSize}`);
    navigate(`?${current_params.toString()}`);
  };

  if (isLoading) return <Spin />;
  if (isError) return <div>Failed to load categories</div>;

  const columns: ColumnsType<Category>  = [
    {
      title: "T/R",
      dataIndex: "index",
      render: (_text, _record, index) => index + 1 + (params.page - 1) * params.limit,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: SubCategoryDataType) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setUpdateData(record);
                setOpen(true);
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => {
              deleteCategory(record.id).then(() => {
                queryClient.invalidateQueries({ queryKey: ["subcategory"] }); 
              });
            }}
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <SubCategoryModal
        open={open}
        handleClose={handleClose}
        update={updateData}
        onSubmit={handleSubmit}
      />
      <Button onClick={() => { setOpen(true); setUpdateData(null); }} type="primary">
        Create SubCategory
      </Button>
      <GlobalTable
        columns={columns}
        data={data?.data?.subcategories}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "7", "10", "12"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default SubCategory;
