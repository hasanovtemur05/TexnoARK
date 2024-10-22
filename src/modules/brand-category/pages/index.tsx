import { useEffect, useState } from "react";
import { useGetBrandCategory} from "../hooks/queries";
import { Button, Tooltip, Popconfirm, Space, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GlobalTable, Loading } from "@components";
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "@types";
import { Category } from "../../category/types";
import { useQueryClient } from "@tanstack/react-query";
import { deleteBrandCategory } from "../service";
import BrandCategoryModal from "./modal";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandCategoryType } from "../types";

const BrandCategory = () => {
  const [params, setParams] = useState<ParamsType>({
    limit: 3,
    page: 1,
    search: "",
  });


    
  const [open, setOpen] = useState(false);

  const { search } = useLocation();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetBrandCategory(params);
  const [updateData, setUpdateData] = useState<BrandCategoryType | null>(
    null
  );

  useEffect(() => {
    if (data?.data?.count) {
      setTotal(data?.data?.count);  
    }
  }, [data]);
 

  const handleClose = () => {
    setOpen(false);
  };


  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
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
      render: (_text, _record, index) =>
        index + 1 + (params.page - 1) * params.limit,
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
      title: "Brand Id",
      dataIndex: "brand_id",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record) => (
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
              console.log(record.id);
              deleteBrandCategory(record.id).then(() => {
                queryClient.invalidateQueries({ queryKey: ["brand-category"] });
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
      <BrandCategoryModal
        open={open}
        handleClose={handleClose}
        update={updateData}
        onSubmit={undefined}
      />
      <div className="flex justify-between mb-4">
      <Input placeholder="search..." className="w-[350px]" />
      <Button
        onClick={() => {
          setOpen(true);
          setUpdateData(null);
        }}
        type="primary"
      >
        Create Brand Category
      </Button>


      </div>
      <GlobalTable
        columns={columns}
        data={data?.data?.brandCategories}
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

export default BrandCategory;
