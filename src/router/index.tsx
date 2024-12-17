import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  import App from "../App";
  import { SignIn, SignUp, Category, AdminLayout, SubCategory, Brand, BrandCategory, Product, Notfound } from "@modules";

  const Index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route index element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="admin-layout" element={<AdminLayout />} >
              <Route index element={<Category />} />
              <Route path="/admin-layout/sub-category/:id" element={<SubCategory />} />
              <Route path="brand" element={<Brand />} />
              <Route path="brand-category" element={<BrandCategory />} />
              <Route path="product" element={<Product />} />
             
          </Route>
          <Route path="*" element={<Notfound/>} />
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
  };
  
  export default Index;
  