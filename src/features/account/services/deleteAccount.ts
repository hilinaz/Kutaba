import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../app/firebase"

export async function deleteAccount(user:any,id:string){
    if (!user){
        throw new Error ('user not authenticated')
    }
    try{
        const docRef=doc(db,'users',user.uid,'accounts',id)
       await deleteDoc(docRef)

    }
    catch(error:any){
        throw new Error(error.message)
    }
}