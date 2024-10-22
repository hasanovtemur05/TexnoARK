import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GlobalTable, Loading } from "@components";
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "@types";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import ProductModal from "./modal";
import { ProductType } from "../types";
import { useDeleteProduct } from "../hooks/mutation";
import { Category } from "../../category/types";
import { useGetProduct } from "../hooks/queries";

const Product = () => {
  const [params, setParams] = useState<ParamsType>({
    limit: 10,
    page: 1,
    search: "",
  });
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<ProductType | null>(null);
  const { data, isLoading } = useGetProduct(params);
  const { mutate: deleteMutate } = useDeleteProduct();
  const products = data?.data?.products;
  const navigate = useNavigate();

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
    const { current = 1, pageSize = 10 } = pagination;
    setParams((prev) => ({ ...prev, page: current, limit: pageSize }));

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", `${current}`);
    currentParams.set("limit", `${pageSize}`);
    navigate(`?${currentParams.toString()}`);
  };

  const handleDelete = (id: number) => {
    deleteMutate(id, {
      onSuccess: () => {
        setParams((prev) => ({ ...prev })); // To refresh the product list
      },
    });
  };

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
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <>
      <ProductModal
        open={open}
        handleClose={handleClose}
        update={updateData}
      />
      <Button
        onClick={() => {
          setOpen(true);
          setUpdateData(null);
        }}
        type="primary"
      >
        Create Product
      </Button>
      <GlobalTable
        columns={columns}
        data={products}
        pagination={{
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Product;
