import {signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../app/firebase"

export async function SignInService(email:string,password:string){
    try{

      const userCred= await signInWithEmailAndPassword(auth,email,password)
      const user =userCred.user;
      console.log('signin successful')
      return user
    }
    catch(error:any){
        console.log('sigin error:',error)
        throw new Error(error.message)
    }
}
