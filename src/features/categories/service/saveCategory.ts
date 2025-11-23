import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../app/firebase";

export async function saveCategoryService(
  user: any,
  category: string,
  description: string,
  icon: string | null
): Promise<string> {
  if (!user) throw new Error("User not authenticated");

  try {
    const ref = doc(collection(db, "users", user.uid, "categories")); // generate new doc
    await setDoc(ref, {
      category,
      description,
      icon: icon ?? null,
      createdAt: new Date().toISOString(),
    });

    return ref.id; 
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
