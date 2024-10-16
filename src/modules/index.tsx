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

export { SignIn, SignUp, Category }