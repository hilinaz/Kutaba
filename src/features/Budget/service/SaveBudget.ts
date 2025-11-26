import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../app/firebase";

export async function SaveBudget(user: any, categories: any[]) {
  if (!user) {
    throw new Error("user not authorized");
  }

  try {
    const monthKey = getMonthKey();

    const docRef = doc(db, "users", user.uid, "budgets", monthKey);

    await setDoc(docRef, {
      month: monthKey,
      categories: categories, 
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function getMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
