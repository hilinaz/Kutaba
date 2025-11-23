import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../../app/firebase"

export async function saveTransaction(user:any,transactionType:string,amount:number,categoryId:string,description:string,accountId:string){
    if (!user){
        throw new Error('user not authenticated')
    }
    try{
        const docRef = doc(collection(db,'users',user.uid,'transactions'))
        await setDoc(docRef,{
            transactionType,
            amount,
            categoryId,
            description,
            accountId,
            createdAt: new Date(),


        })

    }
    catch(error:any){
        throw new Error(error.message)
    }

}