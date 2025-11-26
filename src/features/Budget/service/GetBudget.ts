import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../app/firebase";



export async function getMonthsBudgeted(user: any) {
  if (!user) return [];

  const snapshot = await getDocs(collection(db, "users", user.uid, "budgets"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
export async function getBudgetByMonth(user: any, monthKey: string) {
  if (!user) return null;

  const docRef = doc(db, "users", user.uid, "budgets", monthKey);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}





