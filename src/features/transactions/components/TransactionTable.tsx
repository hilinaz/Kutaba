import { useEffect, useState } from "react";
import { useAuth } from "../../auth/services/AuthContext";
import { GetAllTransactionService } from "../services/GetTransaction";

type TransactionFilterProps = {
  filter?: string;
};
 export type TransactionData = {
   id: string;
   categoryName?: string;
   categoryId: string;
   transactionType: string;
   amount: string;
   accountName?: string;
   accountId: string;
   description: string;
   createdAt: Date;
 };

const TransactionTable = ({ filter }: TransactionFilterProps) => {


  const [transactionList, setTransactionList] = useState<TransactionData[]>([]);
  const [filteredTransaction, setFilteredTransaction] = useState<
    TransactionData[]
  >([]);
  const { user } = useAuth();


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

  // 🔹 Handle filtering based on `filter`
  useEffect(() => {
    if (!user) return;

    if (!filter || filter === "All") {
      setFilteredTransaction(transactionList);
      return;
    }

   

    if (filter === "This Month") {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      setFilteredTransaction(
        transactionList.filter((t) => {
          const date = new Date(t.createdAt);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        })
      );
      return;
    }

 
    setFilteredTransaction(
      transactionList.filter((t) => t.transactionType === filter)
    );
  }, [user, filter, transactionList]);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg bg-white p-3">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs font-semibold text-gray-600 uppercase bg-gray-100 p-2">
          <tr>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Type
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Account
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransaction.map((transaction) => (
            <tr
              key={transaction.id}
              className="bg-white hover:bg-gray-50 transition"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {transaction.categoryName}
              </th>
              <td className="px-6 py-4">{transaction.transactionType}</td>
              <td className="px-6 py-4">{transaction.amount}</td>
              <td className="px-6 py-4">{transaction.accountName}</td>
              <td className="px-6 py-4 text-right">
                {transaction.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-orange-600 hover:text-green-800 font-medium">
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
