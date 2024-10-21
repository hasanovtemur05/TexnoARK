import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBrand } from "../hooks/queries";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GlobalTable, Loading } from "@components";
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "@types";
import { Category } from "../../category/types";
import { BrandType } from "../types";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import { useCreateBrand, useUpdateBrand } from "../hooks/mutation";
import { deleteBrand } from "../service";
import BrandModal from "./modal";

const Brand = () => {
  const [params, setParams] = useState<ParamsType>({
    limit: 3,
    page: 1,
    search: "",
  });

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<BrandType | null>(
    null
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetBrand(params);
  console.log(data?.data?.brands);


  const { mutate: createMutate } = useCreateBrand();
  const { mutate: updateMutate } = useUpdateBrand();

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);
  };

  const handleSubmit = (values: BrandType) => {
    if (updateData) {
      const payload = { ...values }; 
      const categoryId = Number(updateData.id); 
  
      updateMutate({ id: categoryId, data: payload });
      
      handleClose(); 
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
  

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
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

  if (isLoading) return <Loading />;

  const columns: ColumnsType<Category> = [
    {
      title: "T/R",
      render: (_, __, index) => (params.page - 1) * params.limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Category ID",
      dataIndex: "category_id",
    },
    {
      title: "File",
      dataIndex: "file",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
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
              deleteBrand(record.id).then(() => {
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
      <BrandModal
        open={open}
        handleClose={handleClose}
        update={updateData}
        onSubmit={handleSubmit}
      /> 
       <Button
        onClick={() => {
          setOpen(true);
          setUpdateData(null);
        }}
        type="primary"
      >
        Create Brand
      </Button>
      <GlobalTable
        columns={columns}
        data={data?.data?.brands}
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

export default Brand;
