import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../app/firebase";

// Types
type CategoryType = {
  id: string;
  category: string;
  description?: string;
  icon?: string;
};

type AccountType = {
  id: string;
  accountName: string;
  amount?: number;
  description?: string;
};

export type TransactionType = {
  id: string;
  categoryId: string;
  transactionType: string;
  amount: string;
  accountId: string;
  description: string;
  createdAt: Date;
  categoryName?: string;
  accountName?: string;
};

async function getCategoriesOnce(user: any) {
  if (!user) return [];
  const snapshot = await getDocs(
    collection(db, "users", user.uid, "categories")
  );
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as CategoryType)
  );
}

async function getAccountsOnce(user: any) {
  if (!user) return [];
  const snapshot = await getDocs(collection(db, "users", user.uid, "accounts"));
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as AccountType)
  );
}

export async function GetAllTransactionService(
  user: any,
  callback: (transactions: TransactionType[]) => void
) {
  if (!user) throw new Error("User not authenticated");

  const categories = await getCategoriesOnce(user);
  const accounts = await getAccountsOnce(user);

  const unsubscribe = onSnapshot(
    collection(db, "users", user.uid, "transactions"),
    (snapshot) => {
      const transactions: TransactionType[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          categoryId: data.categoryId,
          transactionType: data.transactionType,
          amount: data.amount,
          accountId: data.accountId,
          description: data.description,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : new Date(data.createdAt),
categoryName: categories.find((c) => c.id === data.categoryId)?.category || "",
accountName: accounts.find((a) => a.id === data.accountId)?.accountName || "",

       
        };
      });

      callback(transactions);
    },
    (error) => console.error("Transaction subscription error:", error)
  );

  return unsubscribe; 
}
