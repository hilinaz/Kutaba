import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../app/firebase"

export async function editCategory(id:string,user:any,category?:string,description?:string,icon?:string){
    if (!user)return
    try{
        const docRef= doc(db,'users',user.uid,'categories',id)
        const UpdateCat:any={}

        if (category)UpdateCat.category=category    
        if (description)UpdateCat.description=description
        if (icon)UpdateCat.icon=icon
        await updateDoc(docRef,UpdateCat)
        
    }
    catch(error:any){
        throw new Error(error.message)
    }



}