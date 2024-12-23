import axiosInstance from "@api";
import { SignInType } from "../types";
import { SignUp } from "../types";

// ===================  Sign In  =========================

export async function signIn(data:SignInType){ 
    return await axiosInstance.post("/auth/sign-in", data)
}


// ===================  Sign Up  =========================

export async function signUp(data:SignUp){
    return await axiosInstance.post("/auth/admin/sign-up", data)
}