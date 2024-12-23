import {useMutation} from '@tanstack/react-query';
import { signIn, signUp } from '../service';
import { SignInType, SignUp } from '../types';

export function useSignInMutation(){
    return useMutation({
        mutationFn: (data:SignInType)=> signIn(data),
    })
}

export function useSignUpMutation(){
    return useMutation({
        mutationFn: (data:SignUp)=> signUp(data)
    })
}