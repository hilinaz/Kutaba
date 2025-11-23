import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../app/firebase";

export async function GetAccounts(user: any) {
  if (!user) {
    throw new Error("user not authenticated");
  }

  try {
    const accRef = collection(db, "users", user.uid, "accounts");
    const snapshot = await getDocs(accRef);

    const accountList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return accountList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function subscribeAccounts(user: any, callback: (data: any[]) => void) {
  if (!user) return () => {};

  const unsubscribe = onSnapshot(
    collection(db, "users", user.uid, "accounts"),
    (snapshot) => {
      const accList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(accList);
    },
    (error) => console.error(error)
  );

  return unsubscribe;
}
