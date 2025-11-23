import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { useAuth } from "../../auth/services/AuthContext";
import { subscribeAccounts } from "../services/getAccounts";
import AccountCard from "../components/AccountCard"; // Display each account
import AddAccountCard from "../components/AddAccount"; // Form to add account
import { deleteAccount } from "../services/deleteAccount";

type AccountData = {
  id: string;
  accountName: string;
  amount: number;
  description: string;
};

const AccountPage = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [accountList, setAccountList] = useState<AccountData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeAccounts(user, setAccountList);
    return () => unsubscribe();
  }, [user]);

  const handleCloseAddCard = () => {
    setShowAddCard(false);
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteAccount(user, id);
      console.log(`Account ${id} deleted successfully`);
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  return (
    <div className="bg-[#fefefe] p-3 w-full mr-5">
      {/* Header */}
      <div className="flex justify-between m-3">
        <h1 className="font-bold text-2xl">Accounts</h1>
        <button
          className="rounded-full border px-5 py-2 flex gap-2 items-center bg-[#e7643b] text-white"
          onClick={() => setShowAddCard(true)}
        >
          <FaPlus color="white" />
          Add Account
        </button>
      </div>

      {/* Summary Cards */}
      <div className="flex gap-5">
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300">
          <p>Total Accounts: {accountList.length}</p>
        </div>
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300">
          <p>Top Account: </p>
        </div>
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300">
          <p>Chart Placeholder</p>
        </div>
      </div>

      {/* Account List */}
      <div className="mt-8 mx-5">
        <h1 className="font-semibold text-lg">Your Accounts</h1>
        <div className="mx-5 my-3 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {accountList.map((acc) => (
            <AccountCard
              key={acc.id}
              id={acc.id}
              accountName={acc.accountName}
              amount={acc.amount}
              description={acc.description}
              onDelete={() => handleDelete(acc.id)}
            />
          ))}
        </div>
      </div>

   
      {showAddCard && <AddAccountCard onClose={handleCloseAddCard} />}
    </div>
  );
};

export default AccountPage;
