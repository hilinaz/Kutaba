import { useEffect, useState } from "react";
import AddMonthlyBudget from "../components/AddBudgetCard";
import { useAuth } from "../../auth/services/AuthContext";
import { getMonthsBudgeted } from "../service/GetBudget";


const BudgetPage = () => {
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [monthsBudgeted,setMonthsBudgeted]=useState([])
  const {user}=useAuth()

//  useEffect(()=>{
//   if (!user)return
//   const months= await getMonthsBudgeted(user)
//   console.log(months)


//  })

  return (
    <div className="bg-[#fefefe] p-3 w-full mr-5">
      <div className="flex justify-between m-3">
        <h1 className="font-bold text-2xl">Budget</h1>
        <button
          onClick={() => setShowBudgetForm(true)}
          className="rounded-full border px-5 py-2 flex gap-2 items-center bg-[#ea580c] text-white"
        >
          Add Budget
        </button>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Total Categories: —</p>
        </div>
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Total Budget: —</p>
        </div>
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Top Category: —</p>
        </div>
      </div>

      {showBudgetForm && (
        <AddMonthlyBudget onClose={() => setShowBudgetForm(false)} />
      )}
    </div>
  );
};

export default BudgetPage;
