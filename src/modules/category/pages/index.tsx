/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetCategory } from "../hooks/queries";
import { useCreateCategory } from "../hooks/mutation";
import CategoryModal from "./modal";
import { Button, Spin } from "antd";

const Category = () => {
  const [params] = useState({
    limit: 2,
    page: 1,
    search: "",
  });
  const [open, setOpen] = useState(false);
  
  const { data, isLoading, isError } = useGetCategory(params);
  const { mutate: createMutate } = useCreateCategory();
  
  const handleClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleCreateCategory = (values: any) => {
    createMutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: () => {
        console.error("Failed to create category");
        handleClose();
      },
    });
  };
  

  if (isLoading) return <Spin />; 
  if (isError) return <div>Failed to load categories</div>; 

  return (
    <>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        onSubmit={handleCreateCategory}
      />
      
      
      <Button onClick={openModal} type="primary" >
        Create Category
      </Button>

      
        {data?.data?.categories?.map((category: any) => (
          <h1>{category.name}</h1>
        ))}
    
    </>
  );
};

export default Category;
