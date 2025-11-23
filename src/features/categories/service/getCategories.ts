import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../app/firebase";

export  function getCategories(user:any,callback:(data:any[])=>void) {
   if (!user) return () => {}; 

  const Unsubscribe= onSnapshot(collection(db, "users", user.uid, "categories"),(snapshot)=>{
    const categoryList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(categoryList)

  },(error)=>{
    console.log(error)
  })
  return Unsubscribe
   

    

   
}
