import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../app/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function  signUpSrvice(email:string,name:string,password:string){
    try{
        const userCred = await createUserWithEmailAndPassword(auth,email,password)
        const users = userCred.user;
        await updateProfile(users, { displayName: name });

        const docRef = doc(db, "users", users.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            throw new Error('User already exists')
        }
        await setDoc(docRef, {
          uid: users.uid,
          name,
          email,
          createdAt: new Date(),
        });


    }catch(error:any){
        console.log('signup error:',error)
        throw new Error(error.message)
    }

}