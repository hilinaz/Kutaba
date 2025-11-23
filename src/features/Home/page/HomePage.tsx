import { useEffect, useState } from "react";
import { useAuth } from "../../auth/services/AuthContext";
import { GetAccounts } from "../../account/services/getAccounts";
import type { TransactionData } from "../../transactions/components/TransactionTable";
import { GetAllTransactionService } from "../../transactions/services/GetTransaction";

import DonutChart from "../components/DonutChart";

type AccountData = {
  id: string;
  amount: number;
  accountname: string;
  description: string;
  createdAt: Date;
};

const HomePage = () => {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactionList, setTransactionList] = useState<TransactionData[]>([]);
  const [monthlyTransactions, setMonthlyTransactions] = useState<
    TransactionData[]
  >([]);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [monthlySaving, setMonthlySaving] = useState(0);
  const { user } = useAuth();

  // Fetch account data
  useEffect(() => {
    if (!user) return;
    GetAccounts(setAccounts);
    const total = accounts.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setTotalAmount(total);
  }, [user, accounts]);

  // Filter monthly transactions
  useEffect(() => {
    if (!user) return;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    GetAllTransactionService(user, setTransactionList);

    const monthly = transactionList.filter((transaction) => {
      const date = new Date(transaction.createdAt);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    setMonthlyTransactions(monthly);

    const totalSpending = monthly
      .filter((transaction) => transaction.transactionType === "Expense")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalSaving = monthly
      .filter((transaction) => transaction.transactionType === "Saving")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    setMonthlySpending(totalSpending);
    setMonthlySaving(totalSaving);
  }, [user, transactionList]);

  return (
    <div className="w-screen min-h-screen bg-gray-50 px-8 py-6">
      {/* --- Top 3 Cards --- */}
      <div className="flex gap-6 w-full mb-8">
        {/* Current Balance */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center">
          <h1 className="font-semibold text-gray-700 text-lg mb-1">
            Current Balance
          </h1>
          <p className="text-3xl font-bold text-orange-500">
            ${totalAmount.toLocaleString()}
          </p>
        </div>

        {/* Monthly Spending */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center">
          <h1 className="font-semibold text-gray-700 text-lg mb-1">
            Monthly Spending
          </h1>
          <p className="text-3xl font-bold text-orange-500">
            ${monthlySpending.toLocaleString()}
          </p>
        </div>

        {/* Savings Goal */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center">
          <h1 className="font-semibold text-gray-700 text-lg mb-1">
            Savings Goal
          </h1>
          <p className="text-3xl font-bold text-green-500">
            ${monthlySaving.toLocaleString()}
          </p>
        </div>
      </div>


      <div className="flex gap-6">
   
        <div className="bg-white rounded-2xl shadow-md p-6 flex-1">
          <h1 className="font-bold text-xl text-gray-800 mb-6">
            Recent Transactions
          </h1>
          <div className="space-y-4">
            {monthlyTransactions.length > 0 ? (
              monthlyTransactions.map((trans) => {
                const date = new Date(trans.createdAt);
                return (
                  <div
                    key={trans.id}
                    className="flex justify-between items-center border-b pb-2 hover:bg-gray-50 transition rounded-md px-2"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {trans.categoryName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {date.toLocaleDateString()}
                      </p>
                    </div>
                    <p
                      className={`font-semibold ${
                        trans.transactionType === "Expense"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {trans.transactionType === "Expense" ? "-" : "+"}$
                      {Number(trans.amount).toLocaleString()}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-center">
                No transactions this month
              </p>
            )}
          </div>
        </div>

        {/* Spending Categories */}
        <div className="bg-white rounded-2xl shadow-md  w-1/2 flex flex-col items-center pt-18">
          <h1 className="font-bold text-xl text-gray-800 mb-6">
            Spending Categories
          </h1>
          <div className="w-64 h-64">
            <DonutChart/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
