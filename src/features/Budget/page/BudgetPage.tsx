import { useState } from "react";


const BudgetPage = () => {
   const  month = new Date();
   const [budgetList,setBudgetList]=useState([])
  return (
    <div className="bg-[#fefefe] p-3 w-full mr-5">
      <div className="flex justify-between m-3">
        <h1 className="font-bold text-2xl">Budget</h1>
      </div>

      <div className="flex gap-5">
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Total Categories</p>
        </div>
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Top Category: </p>
        </div>
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Top Category: </p>
        </div>
      </div>
      <div className="flex gap-5 m-2 mt-5">
        <div className="px-4 py-2">
          <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200">
            <option value="">{month.getFullYear()}</option>
            {}
          </select>
        </div>
        <div>
          <button className="rounded-full border px-5 py-2 flex gap-2 items-center bg-[#e7643b] text-white">
            {budgetList.length === 0 ? "Add Budget" : "Edit Budget"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetPage
