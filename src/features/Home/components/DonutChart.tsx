import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAuth } from "../../auth/services/AuthContext";
import { GetAllTransactionService } from "../../transactions/services/GetTransaction";


ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
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

  const data = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: Object.keys(expenseByCategory).map(
          (_, i) => `hsl(${i * 50}, 70%, 60%)`
        ),
        borderWidth: 2,
        borderColor: "#fff",
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#374151",
          boxWidth: 20,
          padding: 15,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.label}: ${context.raw.toLocaleString()} ETB`,
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {Object.keys(expenseByCategory).length > 0 ? (
        <div className="w-80 h-80">
          <Doughnut data={data} options={options} />
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">
          No expense data available
        </p>
      )}
    </div>
  );
};

export default DonutChart;
