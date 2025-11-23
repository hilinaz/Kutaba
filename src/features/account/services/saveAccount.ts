import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../../app/firebase"

export async function saveAccount(user:any,accountName:string,amount:number,description:string){
if (!user){
    throw new Error('user not authorized')
}
try{
    const docRef =doc(collection(db,'users',user.uid,'accounts'))
    await setDoc(docRef, {
      accountName,
      amount,
      description,
      createdAt: new Date().toISOString()
    });


}
catch(error:any){
    throw new Error(error.message)
}
}