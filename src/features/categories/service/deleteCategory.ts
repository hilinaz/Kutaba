import {  deleteDoc, doc} from "firebase/firestore";
import { db } from "../../../app/firebase";

export async function deteteCategory(id:string,user:any) {
    if(!user)return
    try{
        const categoryRef =doc(db,'users',user.uid,'categories',id)
    await deleteDoc(categoryRef)

    }
    catch(error:any){
        
        throw new Error(error.message)
    }
    
   
    
}