import { useState } from "react";
import { useForm } from "react-hook-form";

type AddBudgetProps = {
  BudgetItem?: [];
  onClose: () => void;
};
type CategoryBudget = {
  categoryId: string;
  categoryName: string;
  amount: number;
  icon?: string;
};

type MonthlyBudget = {
  month: string; 
  totalBudget?: number; 
  categories: CategoryBudget[];
};

const AddBudgetCard = ({ onClose, BudgetItem }: AddBudgetProps) => {
     const [isSaving, setIsSaving] = useState(false);
     const [categoryList,setCategories]=useState<CategoryData[]>([])
     const form =useForm<any>();

     const {register,handleSubmit,formState}=form
    //  const {errors, isSubmitSuccessful}=formState;
     const onSubmit =()=>{
        setIsSaving(true)
     }
     const onEdit=()=>{
        setIsSaving(true)
     }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-5">
          <h1 className="font-bold text-xl text-gray-800">
            {BudgetItem ? "Update Budget" : "Add Budget"}
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Category Input */}
          <div className="pt-2">
            {

            }
            
           

           

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(BudgetItem ? onEdit : onSubmit)}
            className="relative rounded-full px-6 py-3 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition duration-200 shadow-md shadow-orange-200 flex items-center justify-center"
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : BudgetItem ? (
              "Update Budget"
            ) : (
              "Save Budget"
            )}
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
);
};



export default AddBudgetCard;

