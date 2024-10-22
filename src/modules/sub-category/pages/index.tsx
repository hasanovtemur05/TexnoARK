import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSubCategory } from "../hooks/queries";
import SubCategoryModal from "./modal";
import { Button, Tooltip, Popconfirm, Space, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalTable, Loading } from "@components";
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "@types";
import { SubCategoryDataType } from "../types";
import { deleteSubCategory } from "../service";
import { Category } from "../../category/types";

const SubCategory = () => {
  const [params, setParams] = useState<ParamsType>({
    limit: 3,
    page: 1,
    search: "",
  });

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<SubCategoryDataType | null>(null);
  const { search } = useLocation();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetSubCategory();

  useEffect(() => {
    if (data?.data?.count) {
      setTotal(data?.data?.count);
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);
  };

  const handleTableChange = (pagination: { current?: number; pageSize?: number }) => {
    const { current = 1, pageSize = 3 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));

    const current_params = new URLSearchParams(search);
    current_params.set("page", `${current}`);
    current_params.set("limit", `${pageSize}`);
    navigate(`?${current_params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 3;
    const searchQuery = params.get("search") || "";
    setParams((prev) => ({
      ...prev,
      page: page,
      limit: limit,
      search: searchQuery,
    }));
  }, [search]);

  if (isLoading) return <Loading />;

  const columns: ColumnsType<Category> = [
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
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
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
            title="Are you sure to delete this sub-category?"
            onConfirm={() => {
              deleteSubCategory(record.id).then(() => {
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
      <SubCategoryModal open={open} handleClose={handleClose} update={updateData} />
      <div className="flex justify-between mb-4">
        <Input placeholder="search..." className="w-[350px]" />
        <Button
          onClick={() => {
            setOpen(true);
            setUpdateData(null);
          }}
          type="primary"
        >
          Create SubCategory
        </Button>
      </div>
      <GlobalTable
        columns={columns}
        data={data?.data?.subcategories}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "7", "10", "12"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default SubCategory;
