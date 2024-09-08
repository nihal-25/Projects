import { signInWithEmailAndPassword } from "firebase/auth";
export const loginrequest=(email,password)=>
{
    signInWithEmailAndPassword(email,password);
}