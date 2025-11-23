
import { signOut } from "firebase/auth";
import { auth } from "../../../app/firebase";

export async function  LogOut(){
    
    try{
        await signOut(auth)
         localStorage.clear();
         sessionStorage.clear()
        window.location.href='/signin'

    }
    catch(e:any){
        console.log('error logging out',e)
    }
   
}