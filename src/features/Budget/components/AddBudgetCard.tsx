import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../../app/firebase";
import { useAuth } from "../../auth/services/AuthContext";

type CategoryData = {
  id: string;
  category: string;
};

type CategoryBudget = {
  categoryId: string;
  categoryName: string;
  amount: number | "";
};

type MonthlyBudget = {
  month: string;
  categories: CategoryBudget[];
};

const AddMonthlyBudget = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudget>({
    month: new Date().toISOString().slice(0, 7),
    categories: [],
  });

 
  useEffect(() => {
    if (!user) return;

    const fetchCategories = async () => {
      const snap = await getDocs(
        collection(db, "users", user.uid, "categories")
      );
      const catList: CategoryData[] = snap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as CategoryData)
      );

      setCategories(catList);
      setMonthlyBudget({
        month: new Date().toISOString().slice(0, 7),
        categories: catList.map((c) => ({
          categoryId: c.id,
          categoryName: c.category,
          amount: "",
        })),
      });
    };

    fetchCategories();
  }, [user]);

  const handleAmountChange = (categoryId: string, value: string) => {
    setMonthlyBudget((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.categoryId === categoryId
          ? { ...cat, amount: value === "" ? "" : Number(value) }
          : cat
      ),
    }));
  };

  const totalBudget = monthlyBudget.categories.reduce(
    (sum, cat) => sum + (cat.amount === "" ? 0 : cat.amount),
    0
  );

  const handleSaveBudget = async () => {
    if (!user) return;

    const budgetToSave: MonthlyBudget = {
      ...monthlyBudget,
      categories: monthlyBudget.categories.map((cat) => ({
        ...cat,
        amount: cat.amount === "" ? 0 : cat.amount,
      })),
    };

    const docRef = doc(db, "users", user.uid, "budgets", monthlyBudget.month);
    await setDoc(docRef, budgetToSave);
    alert("Monthly budget saved!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center">
          Monthly Budget ({monthlyBudget.month})
        </h2>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {monthlyBudget.categories.map((cat) => (
            <div
              key={cat.categoryId}
              className="flex justify-between items-center p-3 border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50 transition"
            >
              <span className="font-medium">{cat.categoryName}</span>
              <input
                type="number"
                min={0}
                value={cat.amount}
                onChange={(e) =>
                  handleAmountChange(cat.categoryId, e.target.value)
                }
                className="border px-3 py-1 rounded w-28 focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 text-right font-semibold">
          Total: {totalBudget}
        </div>

        <button
          onClick={handleSaveBudget}
          className="mt-4 w-full bg-[#ea580c] hover:bg-[#d94e09] text-white py-3 rounded-xl font-semibold transition"
        >
          Save Budget
        </button>
      </div>
    </div>
  );
};

export default AddMonthlyBudget;
