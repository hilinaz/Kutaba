import { FaPlus } from "react-icons/fa";
import RoundedButton from "../components/RoundedButton";
import TransactionTable, {
  type TransactionData,
} from "../components/TransactionTable";
import AddTransactionCard from "../components/AddTransactionCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/services/AuthContext";
import { GetAllTransactionService } from "../services/GetTransaction";
import ExpensePieChart from "../components/chart";


const TransactionPage = () => {
  const [showCard, setShowCard] = useState(false);
  const [filter, setFilter] = useState("All");
  const [transactionList, setTransactionList] = useState<TransactionData[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const { user } = useAuth();

  const onClose = () => setShowCard(false);
  const handleFilterClick = (selected: string) => setFilter(selected);

  // Fetch all transactions
  useEffect(() => {
    if (!user) return;

    let unsubscribe: () => void;

    const fetchTransactions = async () => {
      unsubscribe = await GetAllTransactionService(user, setTransactionList);
    };

    fetchTransactions();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (!transactionList || transactionList.length === 0) return;

    const totalIncome = transactionList
      .filter((t) => t.transactionType === "Income")
      .reduce((acc, cur) => acc + Number(cur.amount), 0);

    const totalExpense = transactionList
      .filter((t) => t.transactionType === "Expense")
      .reduce((acc, cur) => acc + Number(cur.amount), 0);

    setIncome(totalIncome);
    setExpense(totalExpense);
  }, [transactionList]);

  return (
    <div className="bg-[#fefefe] p-3 w-full min-h-screen">
      <div className="m-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Transactions</h1>
          <div className="flex gap-3">
            <button
              className="rounded-full border px-5 py-2 flex gap-2 items-center bg-[#e7643b] text-white"
              onClick={() => setShowCard(true)}
            >
              <FaPlus color="white" />
              Add Transaction
            </button>
            {showCard && <AddTransactionCard onClose={onClose} />}
            <RoundedButton text="All" onClick={handleFilterClick} />
            <RoundedButton text="Expense" onClick={handleFilterClick} />
            <RoundedButton text="Income" onClick={handleFilterClick} />
            <RoundedButton text="This Month" onClick={handleFilterClick} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 flex gap-4 ">
          {/* Income & Expense Card */}
          <div className="shadow-xl rounded-xl w-1/3 sm:w-1/3 p-4 h-48 flex flex-col justify-center items-center bg-white">
            <p className="text-lg font-semibold mb-2">This Month</p>
            <p className="text-green-600 font-medium">
              Income: +{income.toLocaleString()} ETB
            </p>
            <p className="text-red-600 font-medium">
              Expense: -{expense.toLocaleString()} ETB
            </p>
            <div className="mt-2 w-full border-t border-gray-200"></div>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Keep track of your spending vs income
            </p>
          </div>

          {/* Total Balance Card */}
          <div className="shadow-lg rounded-xl w-1/3 sm:w-1/3 p-4 h-48 flex flex-col justify-center items-center bg-white">
            <p className="text-lg font-semibold mb-2">Total Balance</p>
            <p className="text-2xl font-bold">
              {income - expense >= 0
                ? `+${(income - expense).toLocaleString()} ETB`
                : `-${Math.abs(income - expense).toLocaleString()} ETB`}
            </p>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Remaining money for this month
            </p>
          </div>

         
          <div className="w-1/3">
            <ExpensePieChart />
          </div>
        </div>

        {/* Transaction Table */}
        <div className="mt-6">
          <h1 className="font-semibold text-lg">Transaction List ({filter})</h1>
          <TransactionTable filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
