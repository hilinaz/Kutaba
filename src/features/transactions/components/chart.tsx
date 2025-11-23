import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useAuth } from "../../auth/services/AuthContext";
import { GetAllTransactionService } from "../services/GetTransaction";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const { user } = useAuth();
  const [expenseByCategory, setExpenseByCategory] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (!user) return;

    let unsubscribe: () => void;

    const fetchTransactions = async () => {
      unsubscribe = await GetAllTransactionService(user, (transactions) => {
        const grouped: Record<string, number> = {};

        transactions
          ?.filter((t: any) => t.transactionType === "Expense")
          .forEach((t: any) => {
            const category = t.categoryName || "Others";
            grouped[category] = (grouped[category] || 0) + Number(t.amount);
          });

        setExpenseByCategory(grouped);
      });
    };

    fetchTransactions();

    return () => unsubscribe && unsubscribe();
  }, [user]);

  const Data = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: "Expense by Category",
        data: Object.values(expenseByCategory),
        backgroundColor: Object.keys(expenseByCategory).map(
          (_, i) => `hsl(${i * 50}, 70%, 60%)`
        ),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.label}: ${context.raw.toLocaleString()} ETB`,
        },
      },
    },
  };

  return (
    <div className="shadow-lg rounded-xl bg-white flex flex-col items-center p-3 w-full h-48">
      <p className="text-lg font-semibold mb-2">Expense by Category</p>

      <div className="w-full h-48 overflow-hidden flex items-center justify-center">
        {Object.keys(expenseByCategory).length > 0 ? (
          <div className="w-[90%] h-[90%]">
            <Pie data={Data} options={options} />
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No expense data to display
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpensePieChart;
