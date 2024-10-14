import axiosInstance from "../../../api";
import { SignIn } from "../types";


// ===================  Sign In  =========================

export async function signIn(data:SignIn){
    return await axiosInstance.post("/auth/sign-in", data)
}




// ===================  Sign Up  =========================