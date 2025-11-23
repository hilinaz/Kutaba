import { useEffect, useState } from "react";
import { getCategories } from "../../categories/service/getCategories";
import { useAuth } from "../../auth/services/AuthContext";
import { useForm } from "react-hook-form";

import { GetAccounts } from "../../account/services/getAccounts";
import { ensureDefaultCategory } from "../services/defaults";
import { saveTransaction } from "../services/SaveTransaction";

type CategoryType = {
  id: string;
  category?: string;
  description?: string;
  icon?: string;
};

type AccountData = {
  id: string;
  accountName?: string;
  amount?: number;
  description?: string;
};

type TransactionData = {
  amount: number;
  categoryId: string;
  description: string;
  accountId: string;
};

type AddTransactionProp = {
  onClose: () => void;
};

const AddTransactionCard = ({ onClose }: AddTransactionProp) => {
  const [transactionType, setTransactionType] = useState("Expense");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [loading, setLoading] = useState(false); 
  const { user } = useAuth();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<TransactionData>();

  // Fetch categories & accounts
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
        getCategories(user,setCategories);
      const accItems = await GetAccounts(user);
      setAccounts(accItems);
    };

    fetchData();
  }, [user]);

  
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  // Submit handler
  const onSubmit = async (data: TransactionData) => {
    if (!user) return;
    setLoading(true); 
    try {
      let categoryId = data.categoryId;

    
      if (transactionType !== "Expense") {
        if (!categoryId || transactionType === "Saving") {
          const icon =
            transactionType === "Income" ? "FaDollarSign" : "FaPiggyBank";
          categoryId = await ensureDefaultCategory(user, transactionType, icon);
        }
      }

      await saveTransaction(
        user,
        transactionType,
        data.amount,
        categoryId,
        data.description ||
          (transactionType === "Income"
            ? "Income transaction"
            : "Saving transaction"),
        data.accountId
      );

      console.log("Transaction saved successfully!");
      onClose();
    } catch (err) {
      console.error("Error saving transaction:", err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-5">
          <h1 className="font-bold text-xl text-gray-800">Add Transaction</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
        
          <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
            {["Expense", "Income", "Saving"].map((type) => (
              <button
                key={type}
                onClick={() => setTransactionType(type)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  transactionType === type
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="0.00"
              {...register("amount", { required: "Enter the amount" })}
              className="w-full text-xl p-3 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          {transactionType !== "Saving" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register("categoryId", {
                  required:
                    transactionType === "Expense" ? "Select a category" : false,
                })}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white transition-colors"
              >
                <option value="">Select Category</option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category ?? cat.id}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories yet</option>
                )}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder={
                transactionType === "Income"
                  ? "Income transaction"
                  : transactionType === "Saving"
                  ? "Saving transaction"
                  : "E.g., Dinner with friends"
              }
              {...register("description", { required: "Enter a description" })}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account
            </label>
            <select
              {...register("accountId", { required: "Select an account" })}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white transition-colors"
            >
              <option value="">Select Account</option>
              {accounts.length > 0 ? (
                accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountName ?? acc.id}
                  </option>
                ))
              ) : (
                <option disabled>No accounts yet</option>
              )}
            </select>
            {errors.accountId && (
              <p className="text-red-500 text-sm">{errors.accountId.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading} // 🔹 disable while saving
              className={`flex items-center justify-center rounded-full px-6 py-3 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition duration-200 shadow-md shadow-orange-200 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Saving..." : "Save Transaction"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionCard;
