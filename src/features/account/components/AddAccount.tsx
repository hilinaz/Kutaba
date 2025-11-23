import { useEffect, useState } from "react";
import { useAuth } from "../../auth/services/AuthContext";
import { useForm } from "react-hook-form";
import { saveAccount } from "../services/saveAccount";

type AccountData = {
  accountName: string;
  description: string;
  amount: number;
};

type AddAccountProp = {
  onClose: () => void;
};

const AddAccountCard = ({ onClose }: AddAccountProp) => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<AccountData>();
  const { register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: AccountData) => {
    if (!user) return;

    setIsSaving(true);
    try {
      await saveAccount(user, data.accountName, data.amount, data.description);
      console.log("Account saved!");
      onClose(); // Close card after save
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-5">
          <h1 className="font-bold text-xl text-gray-800">Add Account</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Name
            </label>
            <input
              type="text"
              placeholder="e.g., Dashen, Wallet..."
              {...register("accountName", {
                required: "Enter the account name",
              })}
              className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors"
            />
            {errors.accountName && (
              <p className="text-red-500 text-sm">
                {errors.accountName.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="E.g., For saving purpose"
              {...register("description", {
                required: "Enter the description",
              })}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center rounded-full px-6 py-3 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition duration-200 shadow-md shadow-orange-200"
              disabled={isSaving}
            >
              {isSaving ? (
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
              ) : null}
              {isSaving ? "Saving..." : "Save Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountCard;
