import loadable from "@loadable/component"
import { Loading } from "@components";


const SignIn = loadable(()=> import ("./auth/pages/sign-in"),{
    fallback: <Loading/>
})

const SignUp = loadable(()=> import ("./auth/pages/sign-up"),{
    fallback: <Loading/>
})

const Category = loadable(()=> import ("./category/pages"),{
    fallback: <Loading/>
})

const AdminLayout = loadable(()=> import ("./admin-layout/pages"),{
    fallback: <Loading/>
})

const SubCategory = loadable(()=> import ("./sub-category/pages"),{
    fallback: <Loading/>
})

const Brand = loadable(()=> import ("./brand/pages"),{
    fallback: <Loading/>
})

const BrandCategory = loadable(()=> import ("./brand-category/pages"),{
    fallback: <Loading/>
})

const Product = loadable(()=> import ("./product/pages"),{
    fallback: <Loading/>
})

const Notfound = loadable(()=> import ("./not-found/pages"),{
    fallback: <Loading/>
})

export { SignIn, SignUp, Category, AdminLayout, SubCategory, Brand, BrandCategory, Product, Notfound }