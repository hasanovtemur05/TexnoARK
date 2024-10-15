import axios from "axios";
import axiosInstance from "../../../api";
import { SignIn } from "../types";
import { SignUp } from "../types";

// ===================  Sign In  =========================

export async function signIn(data:SignIn){ 
    return await axiosInstance.post("/auth/sign-in", data)
}




// ===================  Sign Up  =========================

export async function signUp(data:SignUp){
    return await axios.post("/auth/sign-up", data)
}